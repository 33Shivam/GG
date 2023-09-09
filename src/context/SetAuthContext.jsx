import { hostServer } from "./Constant";
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import MessageContext from "./MessageContext";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";

//From Morails
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import axios from "axios";

//create context for this SetDataContext
const SetAuthContext = createContext();

export const SetAuthContextProvider = (props) => {
  const { setMessage } = useContext(MessageContext);

  //set cookies coming from backend side of user object
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);
  const [session, setSession] = useState({});
  const { address, profileId } = session;

  let addr = "";

  if (address && typeof address === "string") {
    // 'address' is a valid string, so perform slicing
    const firstCharOfAddress = address.slice(0, 5);
    const secondCharOfAddress = address.slice(39);
    addr = firstCharOfAddress + "..." + secondCharOfAddress;
  }

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleAuth = async (setLoader) => {
    setLoader(true);
    //disconnects the web3 provider if it's already active
    if (isConnected) {
      await disconnectAsync();
    }
    // enabling the web3 provider metamask
    const { account } = await connectAsync({
      connector: new InjectedConnector(),
    });

    const userData = { address: account, chain: 1 };
    // making a post request to our 'request-message' endpoint
    const { data } = await axios.post(
      `${hostServer}/request-message`,
      userData,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const message = data.message;
    // signing the received message via metamask
    const signature = await signMessageAsync({ message });

    await axios.post(
      `${hostServer}/verify`,
      {
        message,
        signature,
      },
      { withCredentials: true } // set cookie from Express server
    );

    await axios(`${hostServer}/authenticate`, {
      withCredentials: true,
    })
      .then(({ data }) => {
        const { ...authData } = data; // remove unimportant iat value

        //setCookie coming from backend side user Data
        setCookie("session", authData, { path: "/" });
        setLoader(false);
        setMessage({
          type: "success",
          message: "You have authenticated!",
        });
      })
      .catch((err) => {
        setMessage({
          type: "error",
          message: "You can't authenticated! Try again.",
        });
        console.log(err);
      });
  };

  const signOut = async () => {
    //remove cookie of authData
    removeCookie("session", { path: "/" });
    await axios(`${hostServer}/logout`, {
      withCredentials: true,
    });
  };

  useEffect(() => {
    if (cookies.session) {
      setSession(cookies.session);
    }
  }, [cookies.session]);

  return (
    <SetAuthContext.Provider
      value={{
        handleAuth,
        signOut,
        addr,
        profileId,
        address,
      }}
    >
      {props.children}
    </SetAuthContext.Provider>
  );
};

// Define the propTypes for MessageContextProvider
SetAuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is provided and is a node
};

export default SetAuthContext;

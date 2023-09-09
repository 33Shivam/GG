import Web3Modal from "web3modal";
import { Contract, ethers } from "ethers";
import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import {
  contractAddress,
  contractAbi,
  manTokenContractAddress,
  manTokenContractAbi,
} from "./Constant";
import MessageContext from "./MessageContext";
import SetAuthContext from "./SetAuthContext";

const connectWithContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, contractAbi, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

const connectWithManTokenContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const manTokenContract = new Contract(
      manTokenContractAddress,
      manTokenContractAbi,
      signer
    );
    return manTokenContract;
  } catch (error) {
    console.log(error);
  }
};

const SetContractContext = createContext();

export const SetContractContextProvider = (props) => {
  const { setMessage } = useContext(MessageContext);
  const { profileId, handleAuth, address } = useContext(SetAuthContext);

  //interact with contract to getting the seed
  const getSeed = async (setLoader) => {
    try {
      if (!profileId) {
        await handleAuth(setLoader);
      } else {
        setLoader(true);
        const contract = await connectWithContract();
        const getseed = await contract.getSeed();
        await getseed.wait();
        //here we go to store requirements data into our database
        setLoader(false);
        setMessage({
          type: "success",
          message: "You already get the seed",
        });
      }
    } catch (error) {
      setLoader(false);
      setMessage({
        type: "error",
        message: "You can't get seed properly!",
      });
    }
  };

  //interact with contract to giving the water
  const giveWater = async (
    setWaterLoader,
    selectedTokenId,
    setSelectedTokenId
  ) => {
    try {
      if (!profileId) {
        await handleAuth(setWaterLoader);
      } else if (!selectedTokenId) {
        setMessage({
          type: "error",
          message: "You do not have tokenId",
        });
        return;
      } else {
        setWaterLoader(true);
        const contract = await connectWithContract();
        const getwater = await contract.giveWater(selectedTokenId);
        await getwater.wait();
        //here we go to store requirements data into our database
        setSelectedTokenId("");
        setWaterLoader(false);
        setMessage({
          type: "success",
          message: "You already giving the water.",
        });
      }
    } catch (error) {
      setWaterLoader(false);
      setMessage({
        type: "error",
        message: "You can't give water properly!",
      });
    }
  };

  const applyManure = async (setManureLoader) => {
    try {
      if (!profileId) {
        await handleAuth(setManureLoader);
        return;
      }

      const manToken = await connectWithManTokenContract();
      // console.log(manToken);
      if (!manToken) {
        setMessage({
          type: "error",
          message: "MAN token contract not initialized.",
        });
        return;
      }

      setManureLoader(true);
      const balance = await manToken.balanceOf(address);
      console.log("Balance:", balance.toString());

      if (balance.lt(ethers.utils.parseEther("1"))) {
        setMessage({
          type: "error",
          message: "Insufficient MAN tokens.",
        });
        return;
      }

      const approveTx = await manToken.approve(
        contractAddress,
        ethers.utils.parseEther("1")
      );
      await approveTx.wait();

      const vfContract = await connectWithContract();
      const tx = await vfContract.applyManure();
      await tx.wait();

      setManureLoader(false);
      setMessage({
        type: "success",
        message: "Manure added!",
      });
    } catch (error) {
      console.error("Error:", error);
      setManureLoader(false);
      setMessage({
        type: "error",
        message: "Failed to add manure. Please try again.",
      });
    }
  };

  return (
    <SetContractContext.Provider value={{ getSeed, giveWater, applyManure }}>
      {props.children}
    </SetContractContext.Provider>
  );
};

// Define the propTypes for MessageContextProvider
SetContractContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is provided and is a node
};

export default SetContractContext;

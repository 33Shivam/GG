import styled from "styled-components";
import "./global.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import MessageContext from "../context/MessageContext";
import Loader from "./Loader";
import SetAuthContext from "../context/SetAuthContext";

const NavHeader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #dcfee3;
`;

const NavLogo = styled.div`
  width: 160px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* background-color: #cfc0c0; */
  background-image: url("/logo.png");
`;

const NavElementWrapper = styled.div`
  width: 800px;
  height: 60px;
  margin-left: 135px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 43px;
  background: rgba(206, 233, 99, 0.8);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ExtraElementWarapper = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 80px;
  /* background-color: #cfc0c0; */
`;

const NavElement = styled.div`
  cursor: pointer;
  width: 80px;
  height: 40px;
  margin: 40px 40px 40px 40px;
  display: flex;
  align-items: center;
  border-radius: 14px;

  justify-content: center;
  font-family: "Inter", sans-serif;
  transition: background-color 0.3s, color 0.3s;

  /* background-color: #d73021; */

  &:hover {
    color: #fff;
    border-radius: 14px;
    background: #3d4917;
  }
`;
const ButtonConnect = styled.div`
  width: 100px;
  height: 30px;
`;
const UserLogo = styled.div`
  width: 75px;
  height: 50px;
  cursor: pointer;
`;

const NavBar = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  //set context to MessageContext
  const { setMessage } = useContext(MessageContext);

  //fetch context from SetDataContext
  const { handleAuth, signOut, profileId } = useContext(SetAuthContext);

  async function handleDashboard() {
    if (profileId) {
      navigate("/Dashboard");
    } else {
      await handleAuth(setLoader);
      navigate("/Dashboard");
    }
  }

  function handleHome() {
    navigate("/");
  }

  async function handleSignOut() {
    setLoader(true);
    if (profileId) {
      navigate("/");
      await signOut();
      setLoader(false);
      setMessage({
        type: "success",
        message: "You are Signed out!",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  return (
    <NavHeader>
      <NavLogo></NavLogo>
      <NavElementWrapper>
        <NavElement onClick={handleHome}>Home</NavElement>
        <NavElement>About</NavElement>
        <NavElement>FAQs</NavElement>
        <NavElement>Contact</NavElement>
        <NavElement>Blog</NavElement>
      </NavElementWrapper>
      <ExtraElementWarapper>
        <ButtonConnect>
          {profileId ? (
            <button onClick={handleSignOut} className="button-86" role="button">
              {loader && <Loader />}
              <span style={{ marginLeft: "5px" }}>Sign out</span>
            </button>
          ) : (
            <button
              onClick={() => handleAuth(setLoader)}
              className="button-86"
              role="button"
            >
              {loader && <Loader />}
              <span style={{ marginLeft: "5px" }}>Connect Wallet</span>
            </button>
          )}
        </ButtonConnect>
        <UserLogo onClick={handleDashboard}>
          <img src="/Avatar.svg" alt="Logo" />
        </UserLogo>
      </ExtraElementWarapper>
    </NavHeader>
  );
};

export default NavBar;

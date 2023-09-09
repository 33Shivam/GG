import React from "react";
import styled from "styled-components";
import "./global.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
const ButtonConnect = styled.button`
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

  function handleClick(event) {
    navigate("/Dashboard");
  }

  return (
    <NavHeader>
      <NavLogo></NavLogo>
      <NavElementWrapper>
        <NavElement>Home</NavElement>
        <NavElement>About</NavElement>
        <NavElement>FAQs</NavElement>
        <NavElement>Contact</NavElement>
        <NavElement>Blog</NavElement>
      </NavElementWrapper>
      <ExtraElementWarapper>
        <ButtonConnect>
          <button class="button-86" role="button">
            Connect Wallet
          </button>
        </ButtonConnect>
        <UserLogo onClick={handleClick}>
          <img src="/Avatar.svg" alt="Logo" />
        </UserLogo>
      </ExtraElementWarapper>
    </NavHeader>
  );
};

export default NavBar;

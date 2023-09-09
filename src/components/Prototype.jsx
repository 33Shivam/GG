import styled from "styled-components";
import NavBar from "./NavBar";

const Section = styled.div`
  width: 100%;
  height: 6561px;
  background-image: url("/LandingPage2.svg");
  background-repeat: no-repeat;
  background-size: cover;
`;

function Prototype() {
  return (
    <>
      <NavBar />
      <Section></Section>
    </>
  );
}

export default Prototype;

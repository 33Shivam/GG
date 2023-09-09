import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import About from "./About";

const Section = styled.div`
  width: 100%;
  height: 760px;
  display: flex;
  background: linear-gradient(#dcffe3, #4e633c);
  justify-content: center;
  align-items: center;
`;

const WriteWrapper = styled.div`
  width: 750px;
  height: 760px;
  /* background-color: #5e5e49; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const WriteTitle = styled.div`
  padding-top: 80px;
  display: flex;
  flex: 2;
  width: inherit;
  height: auto;
  justify-content: center;
  align-items: center;
  //typography
  color: #224e34;
  text-align: center;
  text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
  font-family: "inter", sans-serif;
  font-size: 128px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 9px;
  //typography end
`;

const WriteBody = styled.div`
  display: flex;
  flex: 1;
  width: inherit;
  height: auto;
  justify-content: center;
  align-items: center;
  //typography
  color: #3d4917;
  text-align: center;
  font-family: "inter", sans-serif;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 166.523%;
  //typography end
`;

const WriteFooter = styled.div`
  display: flex;
  flex: 1;
  width: inherit;
  height: auto;
  justify-content: center;
  align-items: center;
`;

const ImageOverlay = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  background-image: url("/Component3.svg");
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: contain;

  img {
    border: 0px;
    border-color: transparent;
  }
`;

const BackgroundImage1 = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  background-image: url("/Component5.svg");
  background-position: left bottom;
  background-repeat: no-repeat;
  background-size: 40% 50%;
  img {
    border: 0px;
    border-color: transparent;
  }
`;
const BackgroundImage2 = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  background-image: url("/Component1.svg");
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: contain;
  img {
    border: 0px;
    border-color: transparent;
  }
`;
const BackgroundImage3 = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  background-image: url("/Component2.svg");
  background-position: left top;
  background-repeat: no-repeat;
  background-size: 25% 25%;
  img {
    border: 0px;
    border-color: transparent;
  }
`;
const PlayNowButton = styled.button`
  cursor: pointer;
  width: 200px;
  height: 50px;
  font-size: 24px;
  font-family: "inter", sans-serif;
  border-radius: 20px;
  opacity: 0.9;
  background: #75d63a;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: none;
  color: white;
`;

function Hero() {
  return (
    <>
      <NavBar />
      <Section>
        <ImageOverlay />
        <BackgroundImage1 />
        <BackgroundImage2 />
        <BackgroundImage3 />
        <WriteWrapper>
          <WriteTitle>Virtual Forest</WriteTitle>
          {/* <WriteBody>NFTs and Conservation</WriteBody> */}
          <WriteFooter>
            <PlayNowButton>Play Now</PlayNowButton>
          </WriteFooter>
        </WriteWrapper>
      </Section>
      <About />
    </>
  );
}

export default Hero;

import styled from "styled-components";
import Collectibles from "./Collectibles";
import Landing from "../landing.jsx";
import { useContext, useState } from "react";
import SetContractContext from "../context/SetContractContext";
import Loader from "./Loader";

const Section = styled.div`
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  background: linear-gradient(#95ba85, #6d9061);
`;

// const Container = styled.div`
// height: 100vh;
// width: 100%;
// align-items: center;
// justify-content: center;
// display: flex;
// flex-direction: row;
// `;

const GeneralSection = styled.div`
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const GenralSectionWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row-reverse;
`;

const GeneralSectionDiv = styled.div`
  flex: 3;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  max-width: 80%;
`;
const GenralSectionIcon = styled.div`
  height: 100%;
  flex: 2;
  align-items: center;
  justify-content: center;
  display: flex;

  img {
    max-width: 60%;
    max-height: 90%;
  }
`;

const GenralSectionMsg = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 100;
  font-family: "inter", sans-serif;
  color: #ffff;
`;

const GeneralSectionDivDiv1 = styled.div`
  flex: 1;
  font-size: 32px;
  font-weight: 700;
  font-family: "inter", sans-serif;
  color: #ffff;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 4px;
`;

const GeneralSectionDivDivWrapper = styled.div``;

const GeneralSectionDivDiv2 = styled.div`
  font-weight: 400;
  font-size: 16px;
  font-family: "inter", sans-serif;
  color: #ffff;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-height: 32px;
  letter-spacing: 2px;
  font-weight: 100;
`;

const GeneralSectionDivDiv3 = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const DivDivsubButton = styled.div`
  cursor: pointer;
  display: flex;
  min-width: 40px;
  max-height: 32px;
  align-items: center;
  justify-content: center;
  color: white;
  border: 2px solid white;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  flex: 1;
  &:hover {
    color: white;
    background-color: #cee963;
  }
`;

const DivDivAddButton = styled.div`
  cursor: pointer;
  display: flex;
  min-width: 40px;
  max-height: 32px;
  align-items: center;
  justify-content: center;
  color: white;
  border: 2px solid white;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  flex: 1;
  font-weight: 800;
  &:hover {
    color: white;
    background-color: #cee963;
  }
`;

const DivDivValue = styled.div`
  display: flex;
  min-width: 42px;
  max-height: 32px;
  align-items: center;
  justify-content: center;
  color: white;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  flex: 2;
  font-weight: 400;
  font-family: "inter", sans-serif;
`;

const GeneralSectionDivDiv3Button = styled.button`
  cursor: pointer;
  width: 140px;
  height: 40px;
  font-size: 14px;
  font-family: "inter", sans-serif;
  border-radius: 20px;
  opacity: 0.9;
  background: #cee963;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: none;
  color: #3d4917;
  font-weight: 700;
  letter-spacing: 2px;
`;

const StyledInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  background-color: #ffffff;
  color: #333;
  width: 120px;
`;

const GeneralSectionDivDiv4 = styled.div`
  flex: 1;
  margin-top: 20px;
`;

const MapSection = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const LeftBanner = styled.div`
  height: 90%;
  max-width: 104px;
  flex: 1;
  background-color: #20361a53;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: transparent;
  border: 2px solid #ffffff;
  border-radius: 102px;
  //Typography
  text-align: center;
  writing-mode: vertical-rl;
  font-family: "inter", sans-serif;
  font-size: 64px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 25px;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ffffff;
`;

const RightBanner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  /* color: white; */
  flex: 3;
`;

const ModeChanger = styled.div`
  flex: 1;
  display: flex;
  max-height: 72px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ModeChangerDiv = styled.div`
  flex: 1;
  cursor: pointer;
  max-width: 120px;
  padding: 10px 50px 10px 50px;
  color: #fff;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "inter", sans-serif;
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 200;
  &:hover {
    font-weight: 700;
    border-radius: 29px;
    background: #3d4917;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

const ThreeMapModel = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Contribute() {
  const [loader, setLoader] = useState(false);
  const [waterLoader, setWaterLoader] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState("");
  const [manureLoader, setManureLoader] = useState(false);
  //take contract set function from SetContractContext
  const { getSeed, giveWater, applyManure } = useContext(SetContractContext);

  return (
    <>
      <Section id="contribute">
        <GeneralSection>
          <GenralSectionWrapper>
            <GeneralSectionDiv>
              <GeneralSectionDivDiv1>Seed Bag</GeneralSectionDivDiv1>
              <GeneralSectionDivDiv2>Refills Everyday</GeneralSectionDivDiv2>
              <GeneralSectionDivDiv3>
                <DivDivsubButton>-</DivDivsubButton>
                <DivDivValue>1</DivDivValue>
                <DivDivAddButton>+</DivDivAddButton>
              </GeneralSectionDivDiv3>
              <GeneralSectionDivDiv4>
                <GeneralSectionDivDiv3Button onClick={() => getSeed(setLoader)}>
                  {loader && <Loader />}{" "}
                  <span style={{ marginLeft: "5px" }}>Plant Seed</span>
                </GeneralSectionDivDiv3Button>
              </GeneralSectionDivDiv4>
            </GeneralSectionDiv>
            <GenralSectionIcon>
              <img src="/SeedButton.png" />
            </GenralSectionIcon>
          </GenralSectionWrapper>
          <GenralSectionWrapper>
            <GeneralSectionDiv>
              <GeneralSectionDivDiv1>Water</GeneralSectionDivDiv1>
              <GeneralSectionDivDiv2>Refills days</GeneralSectionDivDiv2>
              {/* <GeneralSectionDivDiv3>
                <DivDivsubButton>-</DivDivsubButton>
                <DivDivValue>1</DivDivValue>
                <DivDivAddButton>+</DivDivAddButton>
              </GeneralSectionDivDiv3> */}
              <StyledInput
                type="number"
                placeholder="Enter Token Id"
                value={selectedTokenId}
                onChange={(e) => setSelectedTokenId(e.target.value)}
              />
              <GeneralSectionDivDiv4>
                <GeneralSectionDivDiv3Button
                  onClick={() =>
                    giveWater(
                      setWaterLoader,
                      selectedTokenId,
                      setSelectedTokenId
                    )
                  }
                >
                  {waterLoader && <Loader />}{" "}
                  <span style={{ marginLeft: "5px" }}>Water Plant</span>
                </GeneralSectionDivDiv3Button>
              </GeneralSectionDivDiv4>
            </GeneralSectionDiv>
            <GenralSectionIcon>
              <img src="/WaterButton.png" />
            </GenralSectionIcon>
          </GenralSectionWrapper>
          <GenralSectionWrapper>
            <GeneralSectionDiv>
              <GeneralSectionDivDiv1>Maunre Bag</GeneralSectionDivDiv1>
              <GeneralSectionDivDiv2>Refills</GeneralSectionDivDiv2>
              <GeneralSectionDivDiv3>
                <DivDivsubButton>-</DivDivsubButton>
                <DivDivValue>1</DivDivValue>
                <DivDivAddButton>+</DivDivAddButton>
              </GeneralSectionDivDiv3>
              <GeneralSectionDivDiv4>
                <GeneralSectionDivDiv3Button
                  onClick={() => applyManure(setManureLoader)}
                >
                  {manureLoader && <Loader />}{" "}
                  <span style={{ marginLeft: "5px" }}>Speed up</span>
                </GeneralSectionDivDiv3Button>
              </GeneralSectionDivDiv4>
            </GeneralSectionDiv>
            <GenralSectionIcon>
              <img src="/Compost.svg" />
            </GenralSectionIcon>
          </GenralSectionWrapper>

          {/* <GenralSectionMsg>All Proceedings go to NGOs</GenralSectionMsg> */}
        </GeneralSection>
        <MapSection>
          <RightBanner>
            <ModeChanger>
              <ModeChangerDiv>User Map</ModeChangerDiv>
              <ModeChangerDiv>World Map</ModeChangerDiv>
            </ModeChanger>
            <ThreeMapModel>
              <Landing />
            </ThreeMapModel>
          </RightBanner>
          <LeftBanner>Contribute</LeftBanner>
        </MapSection>
      </Section>
      <Collectibles />
    </>
  );
}

export default Contribute;

import Web3Modal from "web3modal";
import { Contract, ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { contractAddress, contractAbi } from "./Constant";

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

const GetContractContext = createContext();

export const GetContractContextProvider = (props) => {
  const [owner, setOwner] = useState("");

  let ownerAddress = "";

  if (owner && typeof owner === "string") {
    // 'address' is a valid string, so perform slicing
    const firstCharOfAddress = owner.slice(0, 5);
    const secondCharOfAddress = owner.slice(39);
    ownerAddress = firstCharOfAddress + "..." + secondCharOfAddress;
  }

  //interact with contract to getting the owner address
  useEffect(() => {
    const getOwner = async () => {
      try {
        const contract = await connectWithContract();
        const getowner = await contract.owner();
        setOwner(getowner);
      } catch (error) {
        console.log(error);
      }
    };

    getOwner();
  }, []);

  return (
    <GetContractContext.Provider value={{ ownerAddress }}>
      {props.children}
    </GetContractContext.Provider>
  );
};

// Define the propTypes for MessageContextProvider
GetContractContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is provided and is a node
};

export default GetContractContext;

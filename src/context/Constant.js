import Contract from "../blockchain/contract/VF.json"; //have to change
import MANTokenContract from "../blockchain/contract/MANToken.json";

export const contractAddress = "0xA23214b28c71D2c53009829556360756b9535db0"; //have to change
export const contractAbi = Contract.abi;

export const manTokenContractAddress =
  "0x8c223B0A6fE4D8837568Eeee0C7865501fc317e0";
export const manTokenContractAbi = MANTokenContract.abi;

export const hostServer = import.meta.env.VITE_REACT_APP_SERVER_URL;

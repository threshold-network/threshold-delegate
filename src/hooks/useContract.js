import { ethers } from "ethers";

export function useContract({ contractAddress, contractAbi, provider }) {
  try {
    return new ethers.Contract(contractAddress, contractAbi, provider);
  } catch (error) {
    console.error(error);
  };
};
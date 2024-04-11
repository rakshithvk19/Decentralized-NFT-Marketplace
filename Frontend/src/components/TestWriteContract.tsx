import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { useWriteContract } from "wagmi";
import { getAccount } from "@wagmi/core";

import { config } from "../../config";
import TokenABI from "../Token.abi.json";
const TOKEN_CONTRACT_ADDRESS = "0xdaB8655C3f9aB61373B1dA2D5D8ba93456D62419";

function TestWriteContract() {
  const [tokenContract, setTokenContract] = useState<ethers.Contract | null>(
    null
  );

  useEffect(() => {
    const initializeContract = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          TOKEN_CONTRACT_ADDRESS,
          TokenABI,
          signer
        );
        setTokenContract(contract);
      } else {
        console.error("MetaMask not installed; using read-only defaults");
      }
    };

    initializeContract();
  }, []);

  const mintNFT = async () => {
    try {
      const ownedTokenInfos = await tokenContract.createToken(
        "test",
        ethers.parseUnits((2).toString(), "ether")
      );
      console.log(ownedTokenInfos);
    } catch (error) {
      if (error.revertedWith) {
        console.error("Transaction reverted with reason:", error.revertedWith);
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  console.log(ethers.parseUnits("2", "ether"));

  return (
    <div>
      <button onClick={mintNFT}>MINT NFT</button>
    </div>
  );
}

export default TestWriteContract;

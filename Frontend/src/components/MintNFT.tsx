import { ChangeEvent, useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  TextField,
  Box,
  Paper,
  Typography,
  Button,
  styled,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { IMetadata } from "../interfaces/IMetadata";

import { config } from "../../config";

import TokenABI from "../Token.abi.json";
import { Pending } from "@mui/icons-material";
const TOKEN_CONTRACT_ADDRESS = "0xdaB8655C3f9aB61373B1dA2D5D8ba93456D62419";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// // Create metadata based on the image's IPFS hash
// const metadata: IMetadata = {
//   name: "Image Name",
//   description: "Image Description",
//   image: `ipfs://${imageCid}`,
// };

const MintNFT: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [NFTName, setNFTName] = useState<string>("test");
  const [NFTDescription, setNFTDescription] = useState<string>("test");
  const [NFTValue, setNFTValue] = useState<number>(1);
  const [cid, setCid] = useState<string | null>(null);
  const [metadataCid, setMetadataCid] = useState<string | null>(null);
  const [tokenContract, setTokenContract] = useState<ethers.Contract | null>(
    null
  );

  //Use Effect to initialize the token contract.
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

  //useEffect to update metadata CID.
  useEffect(() => {
    if (!cid) {
      pinImageMetadataToIPFS();
    }
  }, [cid]);

  //useEffect to mint the NFT after metadataCID is fetched
  useEffect(() => {
    if (!metadataCid || !NFTValue) {
      mintNFT(`ipfs://${metadataCid}`, NFTValue);
    }
  }, [metadataCid]);

  const mintNFT = async (_tokenURI: string, _value: number) => {
    if (!tokenContract) {
      return;
    }

    try {
      const ownedTokenInfos = await tokenContract.createToken(
        _tokenURI,
        ethers.parseUnits(_value.toString(), "ether")
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

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFileChange(event.target.files[0]);
    }
  };

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleNFTValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Parse the input value to a number, handling cases where the input might not be a valid number
    const value = parseFloat(event.target.value);
    setNFTValue(isNaN(value) ? 0 : value);
  };

  const handleNFTDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Parse the input value to a number, handling cases where the input might not be a valid number
    setNFTDescription(event.target.value);
  };

  const handleNFTNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNFTName(event.target.value);
  };

  //Pinning the image to IPFS using Pinata.
  const pinImageToIPFS = async (_selectedFile: File) => {
    try {
      const formData = new FormData();

      formData.append("file", _selectedFile);

      // Upload the image to IPFS
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      const imageCid = resData.IpfsHash;
      setCid(imageCid);
      console.log("Image IPFS hash:", imageCid);
    } catch (error) {
      console.log("Error while uploading image to Pinata: ", error);
    }
  };

  const pinImageMetadataToIPFS = async () => {
    if (cid && NFTName && NFTDescription && NFTValue) {
      // Create metadata based on the image's IPFS hash
      const metadata: IMetadata = {
        name: NFTName,
        description: NFTDescription,
        image: `ipfs://${cid}`,
        // attributes: [],
      };

      try {
        // Upload the metadata JSON to IPFS
        const metadataFormData = new FormData();
        metadataFormData.append(
          "file",
          new Blob([JSON.stringify(metadata)], { type: "application/json" })
        );

        const metadataRes = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
            },
            body: metadataFormData,
          }
        );
        const metadataResData = await metadataRes.json();
        const metadataCid = metadataResData.IpfsHash;
        setMetadataCid(metadataCid); //Metadata of the NFT
      } catch (error) {
        console.log("Error while uploading metadata to IPFS: ", error);
      }
    }
  };

  const handleSubmission = async (event: React.ChangeEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      return;
    }

    pinImageToIPFS(selectedFile);
  };

  return (
    <Paper>
      <Box
        display={"flex"}
        flexDirection={"column"}
        rowGap={1}
        padding={2}
        component={"form"}
        onSubmit={handleSubmission}
      >
        <Typography variant="h4">Mint NFT</Typography>

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFile}
          />
        </Button>
        {imageUrl && (
          <Box display={"flex"} justifyContent={"center"}>
            <img src={imageUrl} style={{ height: "300px", width: "300px" }} />
          </Box>
        )}
        <TextField
          label="NFT Name"
          variant="outlined"
          value={NFTName}
          onChange={handleNFTNameChange}
          required
        />
        <TextField
          label="NFT Description"
          variant="outlined"
          multiline
          value={NFTDescription}
          onChange={handleNFTDescChange}
          minRows={2}
          required
        />
        <TextField
          label="NFT Value"
          placeholder="0.01ETH"
          value={NFTValue}
          onChange={handleNFTValueChange}
          required
        />
        <Button variant="contained" type="submit">
          MINT NFT
        </Button>
      </Box>
    </Paper>
  );
};

export { MintNFT };

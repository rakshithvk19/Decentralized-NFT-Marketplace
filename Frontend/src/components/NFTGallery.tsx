import { ethers } from "ethers";
import { useEffect, useState } from "react";
import styles from "./NFTGallery.module.css";

const NFTMarketplaceABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "NFTCollectionContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "buyNFT",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "NFTCollectionContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "listNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "NFTCollectionContract",
        type: "address",
      },
    ],
    name: "getOwnedNFTs",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "NFTCollectionContract",
        type: "address",
      },
    ],
    name: "getOwnedNFTURIs",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "listings",
    outputs: [
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const NFTMarketplaceAddress = "0x060cd9D114984a5169D083acf8a1e40f59c102c1";
const NFTGallery = () => {
  const [nftMarketplaceContract, setNFTMarketplaceContract] =
    useState<ethers.Contract | null>(null);
  const [nftCollectionAddress, setNFTCollectionAddress] = useState<string>("");
  const [ownedNFTs, setOwnedNFTs] = useState<number[]>([]);
  const [ownedNFTImages, setOwnedNFTImages] = useState<string[]>([]); // State to store the NFT images

  useEffect(() => {
    const initializeContract = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          NFTMarketplaceAddress,
          NFTMarketplaceABI,
          signer
        );
        setNFTMarketplaceContract(contract);
      } else {
        console.error("MetaMask not installed; using read-only defaults");
      }
    };

    initializeContract();
  }, []);

  const fetchOwnedNFTs = async () => {
    if (nftMarketplaceContract && nftCollectionAddress) {
      const ownedTokenIds = await nftMarketplaceContract.getOwnedNFTs(
        nftCollectionAddress
      );
      const tokenIds = ownedTokenIds.map(
        (tokenId: { toString: () => string }) => parseInt(tokenId.toString())
      );
      setOwnedNFTs(tokenIds);
      console.log("Owned NFTs:", ownedTokenIds);
      const uris = await nftMarketplaceContract.getOwnedNFTURIs(
        nftCollectionAddress
      );
      const images = await Promise.all(
        uris.map(async (uri: string) => {
          const metadataUrl = uri.replace("ipfs://", "https://ipfs.io/ipfs/"); // Convert IPFS URL to HTTP URL
          const metadata = await fetch(metadataUrl).then((res) => res.json());
          return metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/"); // Convert IPFS URL to HTTP URL for the image
        })
      );
      console.log("Owned NFTs:", images);

      setOwnedNFTImages(images);
    }
  };

  useEffect(() => {
    if (nftCollectionAddress) {
      fetchOwnedNFTs();
    }
  }, [nftMarketplaceContract, nftCollectionAddress]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter NFT Collection Address"
        value={nftCollectionAddress}
        onChange={(e) => setNFTCollectionAddress(e.target.value)}
      />
      <button onClick={fetchOwnedNFTs}>Fetch Owned NFTs</button>
      <div className={styles.nftGrid}>
        {ownedNFTs.map((tokenId, index) => (
          <div className={styles.nftItem} key={tokenId}>
            <h3>Token ID: {tokenId}</h3>
            <img src={ownedNFTImages[index]} alt={`NFT ${tokenId}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTGallery;

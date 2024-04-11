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
        components: [
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
          {
            internalType: "string",
            name: "tokenURI",
            type: "string",
          },
        ],
        internalType: "struct NFTMarketplace.TokenInfo[]",
        name: "",
        type: "tuple[]",
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

const NFTMarketplaceAddress = "0xd0c8E6ca060DCfE6A09456dCD8583676213ed81B";

const NFTGallery = () => {
  const [nftMarketplaceContract, setNFTMarketplaceContract] =
    useState<ethers.Contract | null>(null);
  const [nftCollectionAddress, setNFTCollectionAddress] = useState<string>("");
  const [ownedNFTs, setOwnedNFTs] = useState<
    { tokenId: number; price: number; tokenURI: string }[]
  >([]);
  const [price, setPrice] = useState(""); // Added state for price

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
      const ownedTokenInfos = await nftMarketplaceContract.getOwnedNFTs(
        nftCollectionAddress
      );

      const tokenDetails = await Promise.all(
        ownedTokenInfos.map(
          async (info: { tokenURI: string; tokenId: string; price: any }) => {
            const metadataUrl = info.tokenURI.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            );
            const metadata = await fetch(metadataUrl).then((res) => res.json());
            const imageUrl = metadata.image.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            );
            return {
              tokenId: info.tokenId.toString(), // Convert BigNumber to number
              price: info.price,
              tokenURI: imageUrl, // Use the image URL from the metadata
            };
          }
        )
      );
      setOwnedNFTs(tokenDetails);
    }
  };

  useEffect(() => {
    if (nftCollectionAddress) {
      fetchOwnedNFTs();
    }
  }, [nftMarketplaceContract, nftCollectionAddress]);

  const handleBuy = async (tokenId: number, price: string) => {
    if (!nftMarketplaceContract || !price) return;

    const transaction = await nftMarketplaceContract.buyNFT(
      nftCollectionAddress,
      tokenId,
      { value: ethers.parseEther(price) }
    );
    await transaction.wait();
    fetchOwnedNFTs(); // Refresh the owned NFTs list
  };

  return (
    <div className={styles.nftGallery}>
      <h1>NFT Gallery</h1>
      <input
        type="text"
        placeholder="Enter NFT Collection Address"
        value={nftCollectionAddress}
        onChange={(e) => setNFTCollectionAddress(e.target.value)}
      />
      <button onClick={fetchOwnedNFTs}>Fetch Owned NFTs</button>
      <div className={styles.nftGrid}>
        {ownedNFTs.map((nft) => (
          <div className={styles.nftItem} key={nft.tokenId}>
            <h3>Token ID: {nft.tokenId}</h3>
            <img src={nft.tokenURI} alt={`NFT ${nft.tokenId}`} />
            <p>Price: {ethers.formatEther(nft.price)} ETH</p>
            <input
              type="number"
              placeholder="Enter your price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <button onClick={() => handleBuy(nft.tokenId, price)}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTGallery;

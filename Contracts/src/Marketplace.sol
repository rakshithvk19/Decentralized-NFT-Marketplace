// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

contract NFTMarketplace {
    struct Listing {
        address seller;
        uint256 price;
    }

    struct TokenInfo {
        uint256 tokenId;
        uint256 price;
        string tokenURI;
    }

    mapping(address => mapping(uint256 => Listing)) public listings; // Mapping from token contract to token ID to Listing
    mapping(address => uint256[]) private ownedTokens; // Mapping from NFT collection contract to array of owned token IDs

    function listNFT(
        address NFTCollectionContract,
        uint256 tokenId,
        uint256 price
    ) public {
        IERC721(NFTCollectionContract).transferFrom(
            msg.sender,
            address(this),
            tokenId
        ); // Transfer the NFT to the marketplace contract
        listings[NFTCollectionContract][tokenId] = Listing(msg.sender, price);
        ownedTokens[NFTCollectionContract].push(tokenId);
    }

    function buyNFT(
        address NFTCollectionContract,
        uint256 tokenId
    ) public payable {
        Listing memory listing = listings[NFTCollectionContract][tokenId];
        require(msg.value >= listing.price, "Insufficient payment");

        delete listings[NFTCollectionContract][tokenId]; // Remove the listing
        IERC721(NFTCollectionContract).transferFrom(
            address(this),
            msg.sender,
            tokenId
        ); // Transfer the NFT to the buyer
        payable(listing.seller).transfer(msg.value); // Send the payment to the seller

        // Remove the token from the ownedTokens array
        for (
            uint256 i = 0;
            i < ownedTokens[NFTCollectionContract].length;
            i++
        ) {
            if (ownedTokens[NFTCollectionContract][i] == tokenId) {
                ownedTokens[NFTCollectionContract][i] = ownedTokens[
                    NFTCollectionContract
                ][ownedTokens[NFTCollectionContract].length - 1];
                ownedTokens[NFTCollectionContract].pop();
                break;
            }
        }
    }

    function getOwnedNFTs(
        address NFTCollectionContract
    ) public view returns (TokenInfo[] memory) {
        uint256[] memory tokenIds = ownedTokens[NFTCollectionContract];
        TokenInfo[] memory tokenInfos = new TokenInfo[](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            uint256 price = listings[NFTCollectionContract][tokenId].price;
            string memory tokenURI = IERC721Metadata(NFTCollectionContract)
                .tokenURI(tokenId);
            tokenInfos[i] = TokenInfo(tokenId, price, tokenURI);
        }

        return tokenInfos;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace {
    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(address => mapping(uint256 => Listing)) public listings; // Mapping from token contract to token ID to Listing

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
    }
}

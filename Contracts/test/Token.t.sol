// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Token} from "../src/Token.sol";

contract TokenTest is Test {
    address MARKETPLACE_ADMIN = makeAddr("Marketplace_Admin");
    address PAUSER = makeAddr("Pauser");
    address MINTER = makeAddr("Minter");
    Token token;

    function setUp() public {
        vm.prank(MARKETPLACE_ADMIN);
        token = new Token(MARKETPLACE_ADMIN, PAUSER, MINTER);
    }

    // function test_setUp() public view {
    //     assertEq(token._owner(), MARKETPLACE_ADMIN);
    // }

    function test_minting() public {
        vm.prank(MINTER);
        uint256 tokenId = 1;
        string memory uri = "https://example.com/token/1";
        token.safeMint(MARKETPLACE_ADMIN, tokenId, uri);
        assertEq(token.ownerOf(tokenId), MARKETPLACE_ADMIN);
        assertEq(token.tokenURI(tokenId), uri);
    }

    function test_pause_unpause() public {
        vm.prank(PAUSER);
        token.pause();
        assertTrue(token.paused());
        token.unpause();
        assertFalse(token.paused());
    }

    // function test_supportsInterface() public view {
    //     bytes4 interfaceId = 0x5b5e139f; // Example interface ID
    //     assertTrue(token.supportsInterface(interfaceId));
    // }
}

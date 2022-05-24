// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract CitationIPFS is ERC20 {
    mapping(address => bool) private ipfsAssociated;
    mapping(address => bool) private citationAssociated;

    constructor() ERC20('CitationIPFS Token', 'CITE') {}

    function associateIPFSToUser() public {
        require(ipfsAssociated[msg.sender] == false, "User is already incentivized once for IPFS upload.");
        require(totalSupply() < 10000, "There's no more tokens left to mint, total supply has reached the limit.");
        ipfsAssociated[msg.sender] = true;
        _mint(msg.sender, 10);
    }

    function associateCitationToUser() public {
        require(citationAssociated[msg.sender] == false, "User is already incentivized once for citation.");
        require(totalSupply() < 10000, "There's no more tokens left to mint, total supply has reached the limit.");
        citationAssociated[msg.sender] = true;
        _mint(msg.sender, 2);
    }

    function isIpfsAssociated(address _address) public view returns (bool) {
        return ipfsAssociated[_address];
    }

    function isCitationAssociated(address _address) public view returns (bool) {
        return citationAssociated[_address];
    }
}
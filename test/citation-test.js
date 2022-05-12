const chai = require('chai');
const { expect } = chai;
const { ethers } = require('hardhat');
const { solidity } = require('ethereum-waffle');

chai.use(solidity);

describe('CitationIPFS', function () {
  let CitationIPFS;
  let citationIPFS;
  let owner, owner2;
  let addr1, addr2;

  beforeEach(async () => {
    [owner, owner2] = await ethers.getSigners();
    [addr1, addr2] = await ethers.provider.listAccounts();
    CitationIPFS = await ethers.getContractFactory('CitationIPFS');
    citationIPFS = await CitationIPFS.deploy();
    await citationIPFS.deployed();
  });
});

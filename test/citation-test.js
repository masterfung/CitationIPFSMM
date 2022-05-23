const { use, expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { ethers } = require('hardhat');
const { solidity } = require('ethereum-waffle');

use(solidity);
use(chaiAsPromised).should();

describe('CitationIPFS', () => {
  let citationIPFS, acc1, acc2, acc3;

  beforeEach(async () => {
    [acc1, acc2, acc3] = await ethers.getSigners();
  });

  describe('on deployment', async () => {
    it('Token name and symbol', async () => {
      const CitationIPFS = await ethers.getContractFactory('CitationIPFS');
      citationIPFS = await CitationIPFS.deploy();

      await citationIPFS.deployed();

      expect(await citationIPFS.name()).to.equal('CitationIPFS Token');
      expect(await citationIPFS.symbol()).to.equal('CITE');
    });
  });

  describe('functionalities', async () => {
    it('associateIPFSToUser()', async () => {
      // success
      await citationIPFS.connect(acc3).associateIPFSToUser();

      expect(await citationIPFS.balanceOf(acc3.address)).to.equal(10);
      expect(await citationIPFS.totalSupply()).to.equal(10);

      // error
      await citationIPFS
        .connect(acc3)
        .associateIPFSToUser()
        .should.be.rejectedWith('User is already incentivized once for IPFS upload.');
    });

    it('associateCitationToUser()', async () => {
      // success
      await citationIPFS.connect(acc2).associateCitationToUser();

      expect(await citationIPFS.balanceOf(acc2.address)).to.equal(2);
      expect(await citationIPFS.totalSupply()).to.equal(12);

      // error
      await citationIPFS
        .connect(acc2)
        .associateCitationToUser()
        .should.be.rejectedWith('User is already incentivized once for citation.');
    });
  });
});

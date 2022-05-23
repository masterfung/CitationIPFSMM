const hre = require('hardhat');

async function main() {
  const CitationIPFS = await hre.ethers.getContractFactory('CitationIPFS');
  const citationIPFS = await CitationIPFS.deploy();

  await citationIPFS.deployed();

  console.log('CitationIPFS deployed to:', citationIPFS.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

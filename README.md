# CitationIPFSMM

### To run local development instance of application:

`npm install`\
`npm start`

### To deploy smart contract:
- create .env in root directory
- create config vars for rinkeby network deploy (see hardhat.config.js)
- run `npx hardhat compile`
- `npx hardhat run scripts/citation-script --network rinkeby`

### To run associated smart contract tests:
`npx hardhat test`




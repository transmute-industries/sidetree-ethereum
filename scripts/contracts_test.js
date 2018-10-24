#!/usr/bin/env node

const Web3 = require("web3");

// Connect to local Ethereum node
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const anchorContractConfig = require("../src/contracts/anchorContractConfig.json");

(async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(anchorContractConfig);

  const anchorInstance = new web3.eth.Contract(
    anchorContractConfig.abi,
    anchorContractConfig.address
  );

  let txData = await anchorInstance.methods
    .writeAnchorFileHash("0x123")
    .send({ from: accounts[0] });

  console.log(txData);
})();

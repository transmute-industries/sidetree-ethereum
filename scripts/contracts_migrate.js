#!/usr/bin/env node

const Web3 = require("web3");
const fs = require("fs");
const path = require("path");

// Connect to local Ethereum node
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const abi = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../src/contracts/DIDEthereumAnchor.abi")
  )
);

const bytecode = fs
  .readFileSync(
    path.resolve(__dirname, "../src/contracts/DIDEthereumAnchor.bin")
  )
  .toString();

console.log(abi, bytecode);

(async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(accounts);

  const ownerAddress = accounts[0];
  const contractAbi = abi;
  const contractCode = "0x" + bytecode;

  const DIDEthereumAnchorContract = new web3.eth.Contract(contractAbi);

  const anchorInstance = await DIDEthereumAnchorContract.deploy({
    data: contractCode
  }).send({
    from: ownerAddress,
    gas: 1500000,
    gasPrice: "30000000000000"
  });

  console.log(`Address: ${anchorInstance.options.address}`);

  fs.writeFileSync(
    path.resolve(__dirname, "../src/contracts/anchorContractConfig.json"),
    JSON.stringify(
      {
        address: anchorInstance.options.address,
        abi,
        bytecode
      },
      null,
      2
    )
  );

  // let txData = await anchorInstance.methods
  //   .writeAnchorFileHash("0x123")
  //   .send({ from: accounts[0] });

  // console.log(txData);
})();

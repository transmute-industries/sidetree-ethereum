#!/usr/bin/env node

const Web3 = require("web3");
const fs = require("fs");
const path = require("path");

// Connect to local Ethereum node
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const interface = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../src/contracts/DIDRooter.abi"))
);

const bytecode = fs
  .readFileSync(path.resolve(__dirname, "../src/contracts/DIDRooter.bin"))
  .toString();

console.log(interface, bytecode);

(async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(accounts);

  const ownerAddress = accounts[0];
  const contractAbi = interface;
  const contractCode = "0x" + bytecode;

  const DIDRooterContract = new web3.eth.Contract(contractAbi);

  const didRooterContractIntance = await DIDRooterContract.deploy({
    data: contractCode
  }).send({
    from: ownerAddress,
    gas: 1500000,
    gasPrice: "30000000000000"
  });

  console.log(`Address: ${didRooterContractIntance.options.address}`);

  const contractOwner = await didRooterContractIntance.methods.owner().call();

  let txData = await didRooterContractIntance.methods
    .emitBytes32("0x123")
    .send({ from: accounts[0] });

  console.log(txData);

  //   console.log(contractOwner, ownerAddress )
  //   const owner = await didRooterContractIntance.owner();
  //   console.log(owner)
})();

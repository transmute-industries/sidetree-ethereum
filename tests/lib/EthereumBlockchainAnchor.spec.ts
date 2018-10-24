import EthereumBlockchainAnchor from "../../src/lib/EthereumBlockchainAnchor";

const {
  address,
  abi
} = require("../../src/contracts/anchorContractConfig.json");

const providerUrl = "ws://localhost:8545";

describe("EthereumBlockchainAnchor", () => {
  let anchor: EthereumBlockchainAnchor;
  let accounts: Array<string>;

  beforeAll(async () => {
    anchor = new EthereumBlockchainAnchor(providerUrl, abi, address);
    expect(anchor.providerUrl).toEqual(providerUrl);
    accounts = await anchor.web3.eth.getAccounts();
  });

  describe("constructor", () => {
    it("should support ganache-cli", async () => {
      expect(accounts.length).toEqual(10);
    });
  });

  describe("write", () => {
    it("should support ganache-cli", done => {
      anchor.contractInstance.events
        .EmittedAnchorFileHash(
          {
            fromBlock: 0
          },
          (error: any, event: any) => {
            if (error) {
              console.error(error);
            }
            console.log(event);
          }
        )
        .on("data", (event: any) => {
          console.log(event); // same results as the optional callback above
          done();
        })
        // .on("changed", (event: any) => {
        //   // remove event from local database
        //   console.log(event);
        // })
        .on("error", console.error);

      anchor.write("0x123");
    });
  });
});

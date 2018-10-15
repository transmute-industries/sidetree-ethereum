import SidetreeWeb3 from "../../src/lib/SidetreeWeb3";

describe("SidetreeWeb3", () => {
  describe("constructor", () => {
    it("should support ganache-cli", async () => {
      const providerUrl = "http://localhost:8545";
      const sidetreeWeb3 = new SidetreeWeb3(providerUrl);
      expect(sidetreeWeb3.providerUrl).toEqual(providerUrl);
      const accounts = await sidetreeWeb3.web3.eth.getAccounts();
      expect(accounts.length).toEqual(10);
    });
  });
});

// hacky import required.
// consider TypeChain...
// https://github.com/ethereum/web3.js/issues/1658#issuecomment-395662469
import Web3 = require("web3");

/**
 * Class wrapping web3 for simplifying the ethereum type interface.
 */
export default class SidetreeWeb3 {
  /**
   * web3 provider for connecting to Ethereum Blockchain
   */
  public web3: any;

  constructor(public providerUrl: string) {
    this.web3 = new Web3(providerUrl);
  }
}

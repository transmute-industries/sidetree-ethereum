// hacky import required.
// consider TypeChain...
// https://github.com/ethereum/web3.js/issues/1658#issuecomment-395662469
import Web3 = require("web3");

/**
 * Class for anchoring to the Ethereum Blockchain via a smart contract.
 */
export default class EthereumBlockchainAnchor {
  /**
   * web3 provider for connecting to Ethereum Blockchain
   */
  public web3: any;

  /**
   * web3 contract which supports writeAnchorFileHash of a bytes32 anchorFileAddress
   */
  public contractInstance: any;

  constructor(
    public providerUrl: string,
    public contractABI: any,
    public contractAddress: string
  ) {
    this.web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
    this.contractInstance = new this.web3.eth.Contract(
      contractABI,
      contractAddress
    );
  }

  /**
   * write a bytes32 anchorFileAddress to a contract
   */
  public async write(anchorFileAddress: string): Promise<any> {
    const accounts = await this.web3.eth.getAccounts();
    return this.contractInstance.methods
      .writeAnchorFileHash(anchorFileAddress)
      .send({ from: accounts[0] });
  }
}

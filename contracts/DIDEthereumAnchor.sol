
pragma solidity ^0.4.19;

contract DIDEthereumAnchor {
    event EmittedAnchorFileHash(bytes32 anchorFileHash);
    function writeAnchorFileHash(bytes32 anchorFileHash) public returns (bytes32){
        emit EmittedAnchorFileHash(anchorFileHash);
        return anchorFileHash;
    }
}


pragma solidity ^0.4.19;

contract DIDRooter {

    address public owner;

    constructor () public {
        owner = msg.sender;
        emit EmittedTag("created");
    }

    event EmittedTag(bytes32 tag);

    function emitBytes32(bytes32 tag) public returns (bytes32){
        emit EmittedTag(tag);
        return tag;
    }
}

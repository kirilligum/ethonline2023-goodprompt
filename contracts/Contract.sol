// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GoodpromptRegistry {
    string private ipfsHash;

    function storeHash(string calldata _ipfsHash) public {
        ipfsHash = _ipfsHash;
    }

    function retrieveHash() public view returns (string memory) {
        return ipfsHash;
    }
}

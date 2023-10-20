// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GoodpromptRegistry {
    struct HashEntry {
        string ipfsHash;
        address owner;
    }

    HashEntry[] public hashEntries;

    function storeHash(string calldata _ipfsHash) public {
        HashEntry memory newEntry = HashEntry({
            ipfsHash: _ipfsHash,
            owner: msg.sender
        });
        hashEntries.push(newEntry);
    }

    function retrieveHash(
        uint256 index
    ) public view returns (string memory, address) {
        require(index < hashEntries.length, "Index out of bounds");
        return (hashEntries[index].ipfsHash, hashEntries[index].owner);
    }

    function getHashCount() public view returns (uint256) {
        return hashEntries.length;
    }
}

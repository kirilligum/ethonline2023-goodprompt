// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GoodpromptRegistry {
    struct DatasetEntry {
        string ipfsHash;
        address sponsor;
    }

    struct DatasetReview {
        string ipfsHash;
        uint256 datasetIndex;
        address reviewer;
    }

    DatasetEntry[] public datasetEntries;
    DatasetReview[] public datasetReviews;

    function submitDataset(string calldata _ipfsHash) public {
        DatasetEntry memory newEntry = DatasetEntry({
            ipfsHash: _ipfsHash,
            sponsor: msg.sender
        });
        datasetEntries.push(newEntry);
    }

    function retrieveDatasetAndSponsor(
        uint256 index
    ) public view returns (string memory, address) {
        require(index < datasetEntries.length, "Index out of bounds");
        return (datasetEntries[index].ipfsHash, datasetEntries[index].sponsor);
    }

    function getDatasetCount() public view returns (uint256) {
        return datasetEntries.length;
    }

    function submitDatasetReview(
        uint256 index,
        string calldata _ipfsHash
    ) public {
        require(
            index < datasetEntries.length,
            "dataset entry Index out of bounds"
        );

        DatasetReview memory newEntry = DatasetReview({
            ipfsHash: _ipfsHash,
            datasetIndex: index,
            reviewer: msg.sender
        });
        // Updating the hash at the specified index
        datasetReviews.push(newEntry);
    }
}

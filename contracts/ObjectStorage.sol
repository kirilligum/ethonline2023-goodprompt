// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JsonStorage {
    string private json;
    
    function storeJson(string calldata _json) public {
        json = _json;
    }
    
    function retrieveJson() public view returns (string memory) {
        return json;
    }
}
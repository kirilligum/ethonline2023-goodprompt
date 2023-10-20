const GoodpromptRegistry = artifacts.require("GoodpromptRegistry");

contract("GoodpromptRegistry", accounts => {
	let goodpromptRegistry;

	before(async () => {
		goodpromptRegistry = await GoodpromptRegistry.new();
	});

	it("should store and retrieve an IPFS hash", async () => {
		const ipfsHash = "QmXujxhxE3czJbj1t8AAi7gkWZyT8KvGw7az7bLgFDU53r";

		// Store an IPFS hash
		await goodpromptRegistry.storeHash(ipfsHash, { from: accounts[0] });

		// Retrieve the stored IPFS hash
		const retrievedHash = await goodpromptRegistry.retrieveHashAndOwner(0);
		let hash = retrievedHash[0]
		let owner = retrievedHash[1]

		assert.strictEqual(hash, ipfsHash, "hash doesn't match");
		assert.strictEqual(owner, accounts[0], "owner doesn't match");
	});
});

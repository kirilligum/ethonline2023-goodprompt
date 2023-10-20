const Web3 = require('web3');
require('dotenv/config');
const axios = require('axios');
const alchemyApiKey = process.env.ALCHEMY_API_KEY;
const networkUrl = 'https://eth-mainnet.alchemyapi.io/v2/' + alchemyApiKey; // Replace with the appropriate Alchemy network URL
const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl));
const privateKey = process.env.PRIVATE_KEY;
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require('./GoodpromptRegistry.json').abi
const contract = new web3.eth.Contract(contractABI, contractAddress);

let test_data = {
	source: 'main',
	data: [
		{
			instruction: "what is 1 + 1 ?",
			response: "2",
		},
		{
			instruction: "what is 1 + 2 ?",
			response: "3",
		},
		{
			instruction: "what is 1 + 4 ?",
			response: "3",
		},
		{
			instruction: "what is 2 + 4 ?",
			response: "5",
		},
	]
}

async function uploadToPinata() {
	const pinataApiKey = 'a451efa4864d6a2fa1a1';
	const pinataSecretApiKey = '7f1b5225fd017eaf979e8aa3b6bf5c14fd1bf44ff8d28055bde3c65e4e274b53';
	const jsonContent = test_data

	const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', jsonContent, {
		headers: {
			'Content-Type': 'application/json',
			'pinata_api_key': pinataApiKey,
			'pinata_secret_api_key': pinataSecretApiKey,
		},
	});


	const ipfsHash = response.data.IpfsHash;

	contract.methods.storeHash(ipfsHash)
		.send({ from: process.env.WALLET_ADDRESS, gas: 3000000 })
		.then((receipt) => {
			console.log('Transaction Receipt:', receipt);
		});
}

uploadToPinata();

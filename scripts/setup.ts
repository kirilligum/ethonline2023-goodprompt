const { Web3 } = require('web3');
require('dotenv/config');
const axios = require('axios');
const alchemyApiKey = process.env.ALCHEMY_API_KEY;
const networkUrl = 'https://polygon-mumbai.g.alchemy.com/v2/' + alchemyApiKey; // Replace with the appropriate Alchemy network URL
const web3 = new Web3(networkUrl);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require('./GoodpromptRegistry.json').abi
const contract = new web3.eth.Contract(contractABI, contractAddress);


const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhYWMwMmNkNS04ZGFiLTRiNWQtOWE0NS1kNmY5YmM3ZGJmY2UiLCJlbWFpbCI6InBvb2Z5aXFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImUyMzFlMTdkM2UyNGZkNDU0MTJiIiwic2NvcGVkS2V5U2VjcmV0IjoiYTU2MWIzODRjNzUwYmVhNGYzYTBjZTg3YWZiZTYwN2JkMTI5ZTNlZWNlMzVjYTg1YWU0NTU2ZWVmOWI3ZjllZiIsImlhdCI6MTY5Nzg0NjQ0MH0.TpSmfG7OZrL1Z3bEP33W4tVa-U6Lcg2KoSbcwMXe_ZQ' });
const stream = fs.createReadStream('./scripts/data.json');


async function uploadToPinata() {

	const res = await pinata.pinFileToIPFS(stream, {
		pinataMetadata: {
			name: 'data.json',
		}
	})

	// console.log(res)
	let methodCall = contract.methods.submitDataset(res.IpfsHash); // Replace with your method and parameters
	const encodedABI = methodCall.encodeABI();

	const balance = await web3.eth.getBalance(process.env.WALLET_ADDRESS);
	console.log('Balance:', balance);

	const tx = {
		to: contractAddress,
		gasPrice: 1000000,
		data: encodedABI,
		from: process.env.WALLET_ADDRESS,
	};

	let getDatasetCount = await contract.methods.getDatasetCount().call();
	console.log('Dataset count:', getDatasetCount);


	const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);
	const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
	console.log('Transaction receipt:', receipt);
}

uploadToPinata();

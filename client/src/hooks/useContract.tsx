import { useEffect, useState } from 'react'
import useSafe from './useSafe'
import { ethers } from 'ethers'
import Promise from 'bluebird'

import GoodpromptRegistry from '../../../scripts/GoodpromptRegistry.json'
let contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
let ipfsGateway = 'https://moccasin-improved-flea-785.mypinata.cloud'



export default function useContract() {
	const { isLoading, safeAddress, provider } = useSafe()
	const [isFetchingData, setIsFetchingData] = useState(true)
	const [contract, setContract] = useState(null)

	function tuneDataObject() {

	}

	useEffect(() => {
		if (!contract) return;
		console.log("TEST", contract)
		async function fetchDatasets() {
			let obj_count = await contract.getHashCount()
			let objects = []
			objects.length = obj_count.toNumber()
			console.log('length', objects)


			let datasets = await Promise.map(objects, async (item, index) => {
				console.log(index)
				let res = await contract.retrieveHashAndOwner(index);
				let hash = res[0];
				let owner = res[1];
				const response = await fetch(ipfsGateway + `/ipfs/${hash}`);
				console.log(response)
				const dataset = await response.json();
				return {
					sponsor: owner,
					dataset: dataset
				}
			})

			console.log('DATASETS', datasets);
		}

		fetchDatasets();

	}, [contract])

	useEffect(() => {
		if (!provider) return
		console.log("PROVIDER", provider)
		let contract = new ethers.Contract(contractAddress, GoodpromptRegistry.abi, provider);
		setContract(contract);
	}, [provider])

	return {
		setIsFetchingData,
		isFetchingData,
		tuneDataObject
	}
}
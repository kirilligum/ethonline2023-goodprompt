import { useEffect, useState } from 'react'
import useSafe from './useSafe'
import { ethers } from 'ethers'
import Promise from 'bluebird'

import GoodpromptRegistry from '../../../scripts/GoodpromptRegistry.json'
let contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
let ipfsGateway = 'https://moccasin-improved-flea-785.mypinata.cloud'



export default function useInterface() {
	const { isLoading, safeAddress, provider } = useSafe()
	const [isFetchingData, setIsFetchingData] = useState(true)
	const [contract, setContract] = useState(null)
	const [datasets, setDatasets] = useState([])

	function tuneDataObject(object) {
		//upload to ipfs

		//safe to localstorage

		//update state

	}

	useEffect(() => {
		if (!contract) return;
		async function fetchDatasets() {
			setIsFetchingData(true)
			let obj_count = await contract.getDatasetCount()
			let objects = []
			objects.length = obj_count.toNumber()
			let datasets = await Promise.map(objects, async (item, index) => {
				let res = await contract.retrieveDatasetAndSponsor(index);
				let hash = res[0];
				let sponsor = res[1];
				const response = await fetch(ipfsGateway + `/ipfs/${hash}`);

				let body = await response.text()
				let dataset = null

				try {
					dataset = JSON.parse(`${body.trim()}`)
				} catch (e) {
					console.error('invalid dataset')
				}

				return {
					sponsor: sponsor,
					dataset: dataset
				}
			})

			console.log('DATASETS', datasets);
			setDatasets(datasets)
			setIsFetchingData(false)
		}

		fetchDatasets();

	}, [contract])

	useEffect(() => {
		if (!provider) return
		let contract = new ethers.Contract(contractAddress, GoodpromptRegistry.abi, provider);
		setContract(contract);
	}, [provider])

	return {
		setIsFetchingData,
		isFetchingData,
		tuneDataObject
	}
}
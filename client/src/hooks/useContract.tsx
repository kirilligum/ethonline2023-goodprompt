import { useState } from 'react'
import useSafe from './useSafe'

export default function useContract() {
	const { isLoading, safeAddress } = useSafe()
	let { isFetchingData, setIsFetchingData } = useState(true)

	function fetchDataObjects() {

	}

	function tuneDataObject() {

	}

	return {
		fetchDataObjects,
		isFetchingData,
		tuneDataObject
	}
}
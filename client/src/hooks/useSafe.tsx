import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import AccountAbstraction from '@safe-global/account-abstraction-kit-poc'
import { Web3AuthModalPack } from '@safe-global/auth-kit'
import { GelatoRelayPack } from '@safe-global/relay-kit'
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import getChain from '../util/getChain'

const modalConfig = {
	[WALLET_ADAPTERS.TORUS_EVM]: {
		label: 'torus',
		showOnModal: false
	},
	[WALLET_ADAPTERS.METAMASK]: {
		label: 'metamask',
		showOnDesktop: true,
		showOnMobile: false
	}
}

let chain = getChain('0x13881')

const web3AuthModalPack = new Web3AuthModalPack({
	txServiceUrl: chain.transactionServiceUrl
})

const relayPack = new GelatoRelayPack()

const openloginAdapter = new OpenloginAdapter({
	loginSettings: {
		mfaLevel: 'mandatory'
	},
	adapterSettings: {
		uxMode: 'popup',
		whiteLabel: {
			name: 'Safe'
		}
	}
})

await web3AuthModalPack.init({
	options: {
		clientId: import.meta.env.VITE_WEB3AUTH_CLIENT_ID,
		web3AuthNetwork: 'testnet',
		chainConfig: {
			chainNamespace: CHAIN_NAMESPACES.EIP155,
			chainId: chain.id,
			rpcTarget: chain.rpcUrl
		},
		uiConfig: {
			theme: 'dark',
			loginMethodsOrder: ['github', 'google']
		}
	},
	adapters: [openloginAdapter],
	modalConfig
})

function initWeb3ModalPack() {

}

export default function useSafe() {
	let [isLoading, setIsLoading] = useState(true)
	let [safeAddress, setSafeAddress] = useState('')
	let [provider, setProvider] = useState(null)

	async function init() {

		const { safes, eoa } = await web3AuthModalPack.signIn()
		let web3Provider = await web3AuthModalPack.getProvider() as ethers.providers.ExternalProvider

		const provider = new ethers.providers.Web3Provider(web3Provider)
		const signer = provider.getSigner()
		const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer })
		const safeAccountAbstraction = new AccountAbstraction(signer)
		await safeAccountAbstraction.init({ relayPack })

		console.log('signed in', safes, eoa)

		if (!safes?.length) {
			console.log('creating safe with gelato relay')
		}

		let safe = safes?.length > 0 ? safes[0] : await safeAccountAbstraction.getSafeAddress()


		setSafeAddress(safe)
		setProvider(provider)
		setIsLoading(false)
	}

	useEffect(() => {
		init()
	}, [])


	// console.log('useSafe', safeAddress, provider, isLoading)

	return {
		isLoading,
		safeAddress,
		provider,
		setIsLoading,
	}
}
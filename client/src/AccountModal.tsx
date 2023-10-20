import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ethers, utils } from 'ethers'
import cn from 'classnames'
import { motion, useMotionValue, useSpring } from "framer-motion"
import Overlay from './slim/Overlay'
import AccountAbstraction from '@safe-global/account-abstraction-kit-poc'
import { Web3AuthModalPack } from '@safe-global/auth-kit'
import { GelatoRelayPack } from '@safe-global/relay-kit'
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base'
import { Web3AuthOptions } from '@web3auth/modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import getChain from './util/getChain'
import MotionBox from './slim/MotionBox'
import { LogIn } from 'react-feather'
import StatusDot from './slim/StatusDot'

const BUTTON_CLASS = "text-stone-200 transition-all placeholder-stone-600 bg-stone-800 font-bold py-3 px-5 rounded-2xl outline-transparent hover:outline-stone-600 focus:bg-stone-600 hover:bg-stone-700 focus:outline outline outline-4 flex items-center justify-center m-2 gap-3"

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

let slimSupabaseClassNames = {
  anchor: 'hover:underline text-stone-300 hover:text-stone-200 m-2 font-bold',
  button: BUTTON_CLASS,
  container: 'flex flex-col items-center justify-center h-auto text-stone-300 font-sans my-2',
  divider: '',
  label: 'text-stone-400 text-sm flex justify-left ml-4 ',
  input: BUTTON_CLASS,
  loader: '',
  message: 'text-green-500',
}

const MODAL_PAD = 20


function trimAddress(address) {
  return address.slice(0, 6) + '...' + address.slice(-4)
}



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







export default function AccountModal({ isActive, classNames = {}, setAuth }) {

  let [isLoading, setIsLoading] = useState(true)
  let [safeAddress, setSafeAddress] = useState('')

  useEffect(() => {
    async function init() {

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

      console.log("INIT")

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

      const safeSdk = await Safe.create({
        ethAdapter: ethAdapter,
        safeAddress: safe,
        isL1SafeMasterCopy: true
      })
      setIsLoading(false)
    }

    init()

  }, [])

  return <MotionBox classNames={{
    placeholder: 'w-[5em] h-20',
    position: isLoading ? 'fixed w-[4em] h-16 bottom-8 right-8' : 'fixed w-[10em] h-16 bottom-8 right-8',
    box: 'text-stone-100 bg-stone-900 rounded-3xl outline-4 outline-black/20 cursor-pointer hover:bg-stone-800 hover:outline overflow-hidden'
  }}>
    <div className='w-full h-full flex items-center justify-center'>
      {isLoading && <StatusDot status={'loading'} className='w-6 h-6' />}
      {'safe: ' + trimAddress(safeAddress)}
      {/* <LogIn className='w-6 h-6' /> */}
    </div>

  </MotionBox>
}

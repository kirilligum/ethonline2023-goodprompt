import './index.css'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import cn from 'classnames'
import { motion, useMotionValue, useSpring } from "framer-motion"
import Overlay from './slim/Overlay'
import { Web3AuthModalPack } from '@safe-global/auth-kit'
import { GelatoRelayPack } from '@safe-global/relay-kit'
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base'
import { Web3AuthOptions } from '@web3auth/modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import getChain from './util/getChain'

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





export default function AccountModal({ isActive, classNames = {} }) {

  let wrapper_ref = useRef(null)
  let [isLoading, setIsLoading] = useState(false)
  let [isExpandedView, setIsExpandedView] = useState(false)
  const [session, setSession] = useState(null)
  let ref = useRef(null)
  // const lg = useMediaQuery("(min-width: 66em)")
  // console.log(lg)

  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }
  console.log(session)

  useEffect(() => {
    async function init() {

      let chain = getChain('0x5')

      const options: Web3AuthOptions = {
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
      }

      const web3AuthModalPack = new Web3AuthModalPack({
        txServiceUrl: chain.transactionServiceUrl
      })

      await web3AuthModalPack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig
      })

      const { safes, eoa } = await web3AuthModalPack.signIn()

      console.log(safes, eoa)
    }

    init()


  }, [])




  let style = {
    width: useMotionValue(0),
    height: useMotionValue(0),
    translateX: useMotionValue(0),
    translateY: useMotionValue(0)
  }



  const springConfig = { damping: 45, stiffness: 800 }
  let isPill = !!session
  let isButton = false




  useEffect(() => {
    let rect = wrapper_ref.current.getBoundingClientRect()
    console.log(rect.width)
    if (isPill) {
      style.translateX.set(window.innerWidth - rect.width - MODAL_PAD)
      style.translateY.set(window.innerHeight - rect.height - MODAL_PAD)
      style.height.set(60)
      if (isPill) {
        style.width.set(rect.width)
      } else {
        style.width.set(60)
      }
    } else {
      style.translateX.set(window.innerWidth / 2 - rect.width / 2)
      style.translateY.set(window.innerHeight / 2 - rect.height / 2)
      style.height.set(rect.height)
      style.width.set(rect.width)
    }
  }, [wrapper_ref.current, isPill, isButton])


  let pass_style = {
    width: useSpring(style.width, springConfig),
    height: useSpring(style.height, springConfig),
    translateX: useSpring(style.translateX, springConfig),
    translateY: useSpring(style.translateY, springConfig),
  }

  return <Overlay>
    <motion.div style={pass_style} className='bg-stone-900 outline-stone-400 fixed left-0 top-0 overflow-hidden rounded-3xl pointer-events-auto'>
      <div ref={wrapper_ref} className={cn({ "min-h-[300px] w-screen md:w-[30em] absolute left-0 top-0": !isPill, "h-fit w-fit absolute left-0 top-0": isPill })}>
        {/* <Slide> */}
        {/* {!session && <Auth supabaseClient={supabase} appearance={{ extend: false, className: { ...slimSupabaseClassNames, ...classNames } }} />} */}
        {/* </Slide> */}
        {!!session && <button onClick={signOut} className={BUTTON_CLASS}>logout</button>}
      </div>



      {/* <Overlay isVisible={isLoading} className=' !bg-stone-900'>
        <StatusDot status={isLoading && 'loading' || 'none'} />
      </Overlay> */}
    </motion.div>
  </Overlay>
}

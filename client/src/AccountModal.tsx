import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import Panel from './slim/Panel'
import Modal from './slim/Modal'
import ResponsivePanelWrapper from './slim/ResponsivePanelWrapper'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

let slimSupabaseClassNames = {
  anchor: 'hover:underline text-stone-300 hover:text-stone-200 m-2 font-bold',
  button: 'transition-all bg-stone-800 font-bold py-3 px-5 rounded-2xl outline-transparent hover:outline-stone-600 active:bg-stone-600 hover:bg-stone-700 focus:outline outline outline-4 flex items-center justify-center m-2 gap-3',
  container: 'flex flex-col items-center justify-center h-auto text-stone-300 font-sans my-2',
  divider: '',
  label: 'text-stone-400 text-sm flex justify-left ml-4 ',
  input: 'mb-4 bg-stone-800 py-3 px-5 rounded-2xl outline-stone-600 hover:bg-stone-700 focus:outline hover:outline outline-4 text-stone-200 flex items-center justify-center m-1 placeholder-stone-500',
  loader: '',
  message: ''
}

export default function LoginModal({ isActive, classNames = {} }) {

  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return <Modal isActive={true} classNames={{
    overlay: 'bg-stone-200',
  }}>
    <ResponsivePanelWrapper className="w-[30em] max-w-full min-h-[300px]">
      <Panel className=' bg-stone-900 outline-stone-300 w-full h-full'>
        <Auth supabaseClient={supabase} appearance={{ extend: false, className: { ...slimSupabaseClassNames, ...classNames } }} />
      </Panel>
    </ResponsivePanelWrapper>
  </Modal>
}

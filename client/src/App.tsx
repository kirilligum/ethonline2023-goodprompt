import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Modal from './slim/Modal'
import LoginPanel from './LoginPanel'
import ResponsivePanelWrapper from './slim/ResponsivePanelWrapper'


const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export default function App() {
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


  return <div>
    <Modal isActive={!session}>
      <ResponsivePanelWrapper className="!md:w-[460px] min-h-[300px]">
        <LoginPanel session={session}></LoginPanel>
      </ResponsivePanelWrapper>
    </Modal>
  </div>

}



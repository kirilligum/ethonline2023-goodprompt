import './index.css'
import AccountModal from './modals/AccountModal'
import TuneModal from './modals/TuneModal'
import logo from './assets/logo.svg'


export default function App() {
  return <div className='w-full'>
    <img className='flex w-24 h-24 fixed left-1/2 top-[10em] -translate-x-1/2' src={logo} alt="Your SVG" />
    <AccountModal />
    <TuneModal />
  </div>
}



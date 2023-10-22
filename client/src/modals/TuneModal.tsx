import MotionBox from '../slim/MotionBox'
import StatusDot from '../slim/StatusDot'

import useSafe from '../hooks/useSafe'
import useContract from '../hooks/useInterface'

import { Check, LogIn, Plus, X } from 'react-feather'

function trimAddress(address) {
	return address.slice(0, 6) + '...' + address.slice(-4)
}

export default function TuneModal() {
	const { isLoading, safeAddress } = useSafe()
	const { isFetchingData, datasets } = useContract()

	let content = <div className='w-full h-full flex'>

	</div>


	return <>
		<MotionBox classNames={{
			placeholder: 'w-[5em] h-20',
			position: isLoading ? 'fixed w-[4em] h-[4em] left-1/2 top-[20em] -translate-y-1/2 -translate-x-1/2' : 'fixed w-[30em] h-[20em] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2',
			box: 'text-stone-100 bg-stone-900 rounded-3xl outline-4 outline-black/20 overflow-hidden'
		}}>
			<div className='w-full h-full flex items-center justify-center'>
				{isFetchingData ? <StatusDot status={'loading'} className='w-6 h-6' /> : null}
				{!isFetchingData && content}
			</div>
		</MotionBox>

		<MotionBox classNames={{
			placeholder: 'w-[5em] h-[5em]',
			position: isLoading ? 'fixed top-[40em]  left-1/2' : 'fixed top-[40em]  left-1/2 translate-x-[11em] w-14 h-14',

			box: 'text-green-100 bg-green-500 rounded-3xl outline-4 outline-black/20 overflow-hidden'
		}}>
			<div className='w-full h-full flex items-center content-center justify-center'>
				<Check className='w-9' />
			</div>
		</MotionBox>

		<MotionBox classNames={{
			placeholder: 'w-[5em] h-[5em]',
			position: isLoading ? 'fixed top-[40em]  left-1/2' : 'fixed top-[40em] left-1/2 -translate-x-[14em] w-14 h-14',
			box: 'text-red-100 bg-red-500 rounded-3xl outline-4 outline-black/20 overflow-hidden'
		}}>
			<div className='w-full h-full flex items-center content-center justify-center'>
				<X className='w-9' />
			</div>
		</MotionBox>


	</>
}
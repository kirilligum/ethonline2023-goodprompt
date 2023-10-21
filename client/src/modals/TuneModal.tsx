import MotionBox from '../slim/MotionBox'
import StatusDot from '../slim/StatusDot'

import useSafe from '../hooks/useSafe'
import useContract from '../hooks/useContract'

function trimAddress(address) {
	return address.slice(0, 6) + '...' + address.slice(-4)
}

export default function TuneModal() {
	const { isLoading, safeAddress } = useSafe()
	const { tuneDataObject, claim, isFetchingData, data } = useContract()

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
import MotionBox from '../slim/MotionBox'
import StatusDot from '../slim/StatusDot'

import useSafe from '../hooks/useSafe'
import useInterface from '../hooks/useInterface'

import { Check, LogIn, Plus, X } from 'react-feather'

function trimAddress(address) {
	return address.slice(0, 6) + '...' + address.slice(-4)
}

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';



export default function TuneModal() {

	const { isLoading, safeAddress } = useSafe()
	const { isFetchingData, datasets } = useInterface()
	const [index, setIndex] = useState(0)
	const [groupIndex, groupSetIndex] = useState(0)

	let data_point = undefined
	if (datasets) {
		console.log(datasets)
		data_point = datasets[groupIndex]?.dataset.data[index]
	}




	let current_content = <>{data_point &&
		<div className='w-full h-full flex items-center justify-center'>
			{isFetchingData ? <StatusDot status={'loading'} className='w-6 h-6' /> : null}
			{!isFetchingData && <div className='flex flex-col'>
				<div className='flex flex-col text-xl'>
					<div className='text-sm'>instruction</div>
					{data_point.instruction}
				</div>

				<div className='flex flex-col text-xl mt-5'>
					<div className='text-sm'>response</div>
					{data_point.response}
				</div>
			</div>}
		</div>
	}
	</>


	let prev_box_pox = isLoading ? 'fixed w-[20em] h-[4em] left-1/2 top-[20em] -translate-y-1/2 -translate-x-1/2' : 'fixed w-14 h-14 left-[10em] top-[28em] -translate-y-1/2 -translate-x-1/2'
	let current_box_pos = isLoading ? 'fixed w-[20em] h-[4em] left-1/2 top-[20em] -translate-y-1/2 -translate-x-1/2' : 'fixed w-[30em] h-[20em] left-1/2 top-[28em] -translate-y-1/2 -translate-x-1/2'
	let next_box_pos = isLoading ? 'fixed w-[20em] h-[4em] left-1/2 top-[20em] -translate-y-1/2 -translate-x-1/2' : 'fixed w-14 h-14 right-[10em] top-[28em] -translate-y-1/2 -translate-x-1/2'


	let p_prompt_box = <MotionBox classNames={{
		placeholder: 'w-[10em] h-20',
		position: prev_box_pox,
		box: 'text-stone-100 bg-black rounded-3xl outline-4 outline-black/20 overflow-hidden'
	}}>
	</MotionBox>

	let prompt_box = <MotionBox classNames={{
		placeholder: 'w-[10em] h-20',
		position: current_box_pos,
		box: 'text-stone-100 bg-black rounded-3xl outline-4 outline-black/20 overflow-hidden'
	}}>
		<div className='w-full h-full flex items-center justify-center'>
			{isFetchingData ? <StatusDot status={'loading'} className='w-6 h-6' /> : null}
			{!isFetchingData && current_content}
		</div>
	</MotionBox>

	let n_prompt_box = <MotionBox classNames={{
		placeholder: 'w-[10em] h-20',
		position: next_box_pos,
		box: 'text-stone-100 bg-black rounded-3xl outline-4 outline-black/20 overflow-hidden'
	}}>	</MotionBox>



	return <>
		{p_prompt_box}
		{prompt_box}
		{n_prompt_box}

		<MotionBox classNames={{
			placeholder: 'w-[5em] h-[5em]',
			position: isLoading ? 'fixed top-[40em]  left-1/2' : 'fixed top-[40em]  left-1/2 translate-x-[11em] w-14 h-14',
			box: 'text-green-100 bg-green-500 rounded-3xl outline-4 outline-black/20 overflow-hidden cursor-pointer'
		}}>
			<div className='w-full h-full flex items-center content-center justify-center'>
				<Check className='w-9 stroke' />
			</div>
		</MotionBox>

		<MotionBox classNames={{
			placeholder: 'w-[5em] h-[5em]',
			position: isLoading ? 'fixed top-[40em]  left-1/2' : 'fixed top-[40em] left-1/2 -translate-x-[14em] w-14 h-14',
			box: 'text-red-100 bg-red-500 rounded-3xl outline-4 outline-black/20 overflow-hidden cursor-pointer'
		}}>
			<div className='w-full h-full flex items-center content-center justify-center'>
				<X className='w-9' />
			</div>
		</MotionBox>
	</>
}
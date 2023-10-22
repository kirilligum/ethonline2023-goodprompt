import MotionBox from '../slim/MotionBox'
import StatusDot from '../slim/StatusDot'

import useSafe from '../hooks/useSafe'
import useContract from '../hooks/useInterface'

import { Check, LogIn, Plus, X } from 'react-feather'

function trimAddress(address) {
	return address.slice(0, 6) + '...' + address.slice(-4)
}

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

function CircleLayout({ children, radius, index }) {
	const numChildren = React.Children.count(children);
	const angleStep = (2 * Math.PI) / numChildren;

	return (
		<div className="flex items-center justify-center h-screen">
			<motion.div
				className="relative w-max h-max"
				initial={{ rotate: 0 }}
				animate={{ rotate: `${-(index * angleStep * 180) / Math.PI}deg` }}
				style={{ originX: 0.5, originY: 0.5 }}
			>
				{React.Children.map(children, (child, idx) => {
					const angle = idx * angleStep;
					const x = Math.sin(angle) * radius;
					const y = -Math.cos(angle) * radius;

					return (
						<motion.div
							className="absolute"
							// initial={{ opacity: 0 }}
							animate={{
								x,
								y,
								// opacity: idx === index ? 1 : 0,
								rotate: `${(angle * 180) / Math.PI}deg`,
							}}
							transition={{ duration: 1 }}
							style={{ originX: 0.5, originY: 0.5 }}
						>
							{child}
						</motion.div>
					);
				})}
			</motion.div>
		</div>
	);
}

// function Prompt(){
// 	return <div className='w-full h-full flex items-center justify-center'>
// }

// function PromptList({ dataset }) {
// 	return <div>
// 		{dataset.map((item, index) => {
// 			return <div key={index} className='w-full h-20 flex items-center justify-between'>

// 			</div>
// 		})
// 	</div>
// }




export default function TuneModal() {

	const { isLoading, safeAddress } = useSafe()
	const { isFetchingData, datasets } = useContract()
	const [index, setIndex] = useState(0)
	const [groupIndex, groupSetIndex] = useState(0)


	let current_content = <div className='w-full h-full flex'>
		<div>instruction:</div>
		<div></div>
	</div>


	let prevDonePromptClass = 'fixed'

	function isPrevDone() {
		return true
	}


	let current_content = <>
		<div className='w-full h-full flex items-center justify-center'>
			{isFetchingData ? <StatusDot status={'loading'} className='w-6 h-6' /> : null}
			{!isFetchingData && current_content}
		</div>
	</>



	let p_prompt_box = <MotionBox classNames={{
		placeholder: 'w-[10em] h-20',
		position: isPrevDone() ? 'fixed w-[20em] h-[4em] left-1/2 top-[20em] -translate-y-1/2 -translate-x-1/2' : 'fixed w-[30em] h-[20em] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2',
		box: 'text-stone-100 bg-black rounded-3xl outline-4 outline-black/20 overflow-hidden'
	}}>
		{current_content}
	</MotionBox>


	let prev_box_pox = 'fixed w-24 h-24 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'
	let current_box_pos = 'fixed w-[20em] h-[4em] left-1/2 top-[20em] -translate-y-1/2 -translate-x-1/2'
	let next_box_pos = 'fixed w-24 h-24 left-1/2 top-1/2 -translate-y-1/2 translate-x-[10em]'


	let prompt_box = <MotionBox classNames={{
		placeholder: 'w-[10em] h-20',
		position: current_box_pos,
		box: 'text-stone-100 bg-black rounded-3xl outline-4 outline-black/20 overflow-hidden'
	}}>
		<div className='w-full h-full flex items-center justify-center'>
			{isFetchingData ? <StatusDot status={'loading'} className='w-6 h-6' /> : null}
			{!isFetchingData && content}
		</div>
	</MotionBox>



	return <>
		{/* <button className='fixed left-4 top-4 z-10' onClick={() => setIndex((index + 1) % 4)}>Next</button>
		<div className='fixed left-0 top-0 w-full h-full items-center content-center justify-center'>
			<CircleLayout radius={200} index={index}>
				<div className="bg-red-500 w-16 h-16 flex items-center justify-center">1</div>
				<div className="bg-blue-500 w-16 h-16 flex items-center justify-center">2</div>
				<div className="bg-green-500 w-16 h-16 flex items-center justify-center">3</div>
				<div className="bg-yellow-500 w-16 h-16 flex items-center justify-center">4</div>
			</CircleLayout>

		</div> */}

		{p_prompt_boxes}
		{skip_box}



		{p_prompt_box}
		{prompt_box}
		{n_prompt_box}

		{safe_box}



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
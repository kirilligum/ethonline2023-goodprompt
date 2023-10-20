import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
let springConfig = { stiffness: 600, damping: 30 }
import { createPortal } from 'react-dom'

export default function MotionBox({
	classNames = { box: '', placeholder: '', position: '' },
	children,
	relative = false,
}) {
	let placeholderRef = useRef(null)
	let positionRef = useRef(null)

	let x = useMotionValue(0)
	let y = useMotionValue(0)
	let width = useMotionValue(0)
	let height = useMotionValue(0)
	let [init, setInit] = useState(false)

	useEffect(() => {
		if (positionRef.current) {
			let rect = positionRef.current.getBoundingClientRect()
			if (!init) {
				spx.jump(rect.x)
				spy.jump(rect.y)
				spwidth.jump(rect.width)
				spheight.jump(rect.height)
			}
			x.set(rect.x)
			y.set(rect.y)
			width.set(rect.width)
			height.set(rect.height)
			setInit(true)
		}
	}, [positionRef, classNames.position])

	let spx = useSpring(x, springConfig)
	let spy = useSpring(y, springConfig)
	let spwidth = useSpring(width, springConfig)
	let spheight = useSpring(height, springConfig)

	let motionStyle = {
		x: spx,
		y: spy,
		width: spwidth,
		height: spheight,
	}

	return <div ref={placeholderRef} className={classNames.placeholder}>
		<div className={classNames.position} ref={positionRef}>
			{createPortal(<motion.div className={cn('fixed left-0 top-0', classNames.box)} style={motionStyle} >
				<motion.div style={{ width, height }}>
					{children}
				</motion.div>
			</motion.div>, document.body)}
		</div>
	</div >
}
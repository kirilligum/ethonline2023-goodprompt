import classNames from 'classnames'
import cn from 'classnames'

export default function StatusDot({ status, className }) {

	return <div className={className}>
		<div className='-ii-fidget'>
			<div className={'-ii-fidget-b -ii-fidget-b1 ' + cn({ '-ii-fidget-none': status == 'none' })}></div>
			<div className={'-ii-fidget-b -ii-fidget-b2 ' + cn({ '-ii-fidget-none': status == 'none' })}></div>
		</div>
		<div id="loader"></div>
	</div>
}
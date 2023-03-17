import React from 'react'
import HiddenCard from './HiddenCard'

type HiddenHandProps = {
	count: number
}

const HiddenHand: React.FC<HiddenHandProps> = ({ count }) => {
	return (
		<div className="card-hand hidden">
			{[...Array(count)].map((_, index) => (
				<div key={index} className="card-hand-item">
					<HiddenCard />
				</div>
			))}
		</div>
	)
}

export default HiddenHand

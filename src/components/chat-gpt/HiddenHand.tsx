import React from 'react'
import HiddenCard from './HiddenCard'

interface HiddenHandProps {
	numCards: number
	position: 'top' | 'right' | 'bottom' | 'left'
}

const HiddenHand: React.FC<HiddenHandProps> = ({
	numCards: count,
	position,
}) => {
	const hiddenCards = new Array(count).fill(null)

	return (
		<li className={`hidden-hand ${position}`}>
			{hiddenCards.map((_, i) => (
				<li className="hidden-hand-item card-hand-item">
					<HiddenCard key={i} />
				</li>
			))}
		</li>
	)
}

export default HiddenHand

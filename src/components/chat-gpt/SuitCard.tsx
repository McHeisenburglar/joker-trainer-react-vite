import React from 'react'
import SuitMaps from '../../lib/game-logic/card/SuitMaps'

interface ISuitCardProps {
	suit: Suit
}

const SuitCard: React.FC<ISuitCardProps> = ({ suit }) => {
	const suitChar = SuitMaps.SUIT_UNICODE[suit]
	const isRed = suit === 'hearts' || suit === 'diamonds'

	return (
		<div className={`card suit-card ${isRed ? 'red' : 'black'}`}>
			<div className="card-content">
				<p className="suit">{suitChar}</p>
			</div>
		</div>
	)
}

export default SuitCard

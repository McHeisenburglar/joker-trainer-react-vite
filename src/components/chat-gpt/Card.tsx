import React from 'react'
import SuitMaps from '../../lib/game-logic/card/SuitMaps'

type Props = {
	rank: Rank
	suit: Suit
}

const Card: React.FC<Props> = ({ rank, suit }) => {
	const isRed = suit === 'hearts' || suit === 'diamonds'
	const rankChar = rank === '10' ? 'T' : rank.charAt(0).toUpperCase()
	const suitChar = SuitMaps.SUIT_UNICODE[suit]

	return (
		<div className={`card ${isRed ? 'red' : 'black'}`}>
			<p className="rank">{rankChar}</p>
			<p className="suit">{suitChar}</p>
		</div>
	)
}

export default Card

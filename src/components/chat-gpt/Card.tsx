import React from 'react'
import SuitMaps from '../../lib/game-logic/card/SuitMaps'

type Props = {
	rank: Rank
	suit: Suit
	playable?: boolean
	onClickCallback?: (rank: string, suit: string) => void
}

const Card: React.FC<Props> = ({ rank, suit, playable, onClickCallback }) => {
	const isRed = suit === 'hearts' || suit === 'diamonds'
	const rankChar = rank === '10' ? '10' : rank.charAt(0).toUpperCase()
	const suitChar = SuitMaps.SUIT_UNICODE[suit]

	const handleClick = () => {
		console.log('hello')
		if (onClickCallback) {
			onClickCallback(rank, suit)
		}
	}

	return (
		<div
			className={`card ${playable ? 'playable' : 'disabled'} ${
				isRed ? 'red' : 'black'
			}`}
			onClick={handleClick}
		>
			<div className="card-content top-left">
				<p className="rank">{rankChar}</p>
				<p className="suit">{suitChar}</p>
			</div>
			<div className="card-content bottom-right">
				<p className="rank">{rankChar}</p>
				<p className="suit">{suitChar}</p>
			</div>
		</div>
	)
}

export default Card

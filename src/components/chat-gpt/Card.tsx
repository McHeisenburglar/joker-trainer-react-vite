import React from 'react'
import SuitMaps from '../../lib/game-logic/card/SuitMaps'

type Props = {
	rank: Rank
	suit: Suit
	onClickCallback?: (rank: string, suit: string) => void
}

const Card: React.FC<Props> = ({ rank, suit, onClickCallback }) => {
	const isRed = suit === 'hearts' || suit === 'diamonds'
	const rankChar = rank === '10' ? '10' : rank.charAt(0).toUpperCase()
	const suitChar = SuitMaps.SUIT_EMOJIS[suit]

	const handleClick = () => {
		console.log('hello')
		if (onClickCallback) {
			onClickCallback(rank, suit)
		}
	}

	return (
		<div
			className={`card clickable ${isRed ? 'red' : 'black'}`}
			onClick={handleClick}
		>
			<div className="card-content top-left">
				<p className="rank">{rankChar}</p>
				<p className="suit">{suitChar}</p>
			</div>
			<div className="card-content bottom-right">
				<span className="rank">{rankChar}</span>
				<span className="suit">{suitChar}</span>
			</div>
		</div>
	)
}

export default Card

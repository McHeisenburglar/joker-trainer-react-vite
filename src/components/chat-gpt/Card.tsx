import React from 'react'
import SuitMaps from '../../lib/game-logic/card/SuitMaps'
import { JokerIcon } from '../Card'

type Props = {
	card: Card
	playable?: boolean
	onClickCallback?: (rank: string, suit: string) => void
}

const Card: React.FC<Props> = ({ card, playable, onClickCallback }) => {
	if (card.type === 'regular') {
		const { suit, rank } = card as IRegularCard
		const handleClick = () => {
			console.log('hello')
			if (onClickCallback) {
				onClickCallback(rank, suit)
			}
		}

		const isRed = suit === 'hearts' || suit === 'diamonds'
		const rankChar = rank === '10' ? '10' : rank.charAt(0).toUpperCase()
		const suitChar = SuitMaps.SUIT_UNICODE[suit]

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
	} else {
		const { id } = card as IJokerCard
		const color = id === 'joker1' ? 'red' : 'black'
		return (
			<div className={`card ${playable ? 'playable' : 'disabled'} ${color}`}>
				<div className="card-content">
					<div className={`card-text card-joker color-${color}`}>
						<JokerIcon />
					</div>
				</div>
			</div>
		)
	}
}

export default Card

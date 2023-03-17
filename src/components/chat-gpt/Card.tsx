import React from 'react'
import SuitMaps from '../../lib/game-logic/card/SuitMaps'
import { JokerIcon } from '../Card'

type Props = {
	card: Card
	playable?: boolean
	disabled?: boolean
	onClickCallback?: (rank: string, suit: string) => void
}

const Card: React.FC<Props> = ({
	card,
	playable,
	disabled,
	onClickCallback,
}) => {
	if (card.type === 'regular') {
		const { suit, rank } = card as IRegularCard
		const handleClick = () => {
			if (onClickCallback) {
				onClickCallback(rank, suit)
			}
		}

		const isRed = suit === 'hearts' || suit === 'diamonds'
		const rankChar = rank === '10' ? '10' : rank.charAt(0).toUpperCase()
		const suitChar = SuitMaps.SUIT_UNICODE[suit]

		return (
			<div
				className={`card ${playable ? 'playable' : ''} ${
					isRed ? 'red' : 'black'
				} ${disabled ? 'disabled' : ''}`}
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
			<div
				className={`card card-joker ${playable ? 'playable' : ''} ${
					disabled ? 'disabled' : ''
				}${color}`}
			>
				<div className="card-content top-left">
					<JokerIcon />
				</div>
				<div className="card-content bottom-right">
					<JokerIcon />
				</div>
			</div>
		)
	}
}

export default Card

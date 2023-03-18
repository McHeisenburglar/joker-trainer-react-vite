import React, { useMemo } from 'react'
import { useState } from 'react'
import SuitCard from './SuitCard'
import Card from './Card'
import { Deck } from '../../lib/game-logic/card/CardDeck'

interface CardRowProps {
	suit: Suit
	suitOnly?: boolean
}

const CardRow: React.FC<CardRowProps> = ({ suit, suitOnly }) => {
	const [selectedCount, setSelectedCount] = useState(0)

	const handleClick = (index: number) => {
		setSelectedCount(index + 1)
	}

	const cards = useMemo(() => {
		const deck = new Deck()
		const regularCards = deck.cards.filter(
			(card) => card.type === 'regular'
		) as IRegularCard[]
		const suitCards = regularCards
			.filter((card) => card.suit === suit)
			.map((card) => {
				return {
					...card,
					selected: false,
				}
			})
		return suitCards
	}, [])

	return (
		<div className="card-row">
			{suitOnly && (
				<div
					className={`card ${selectedCount === 0 ? 'selected' : ''}`}
					onClick={() => setSelectedCount(0)}
				>
					<SuitCard suit={suit} />
				</div>
			)}
			<ul className="card-row-list horizontal-list">
				{cards.map((card, index) => (
					<li
						key={index}
						className={`card-row-item ${
							index < selectedCount ? 'selected' : ''
						}`}
						onClick={() => setSelectedCount(index + 1)}
					>
						<Card card={card} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default CardRow

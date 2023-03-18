import React, { useMemo } from 'react'
import { useState } from 'react'
import SuitCard from './SuitCard'
import Card from './Card'
import { Deck } from '../../lib/game-logic/card/CardDeck'

interface CardRowProps {
	suit: Suit
	suitOnly?: boolean
}

type SelectableCard = IRegularCard & {
	selected: boolean
}

const CardRow: React.FC<CardRowProps> = ({ suit, suitOnly }) => {
	const [selectedCount, setSelectedCount] = useState(0)

	const getCardsInSuit: () => SelectableCard[] = () => {
		const deck = new Deck()
		const regularCards = deck.cards.filter(
			(card) => card.type === 'regular'
		) as IRegularCard[]
		const suitCards = regularCards
			.filter((card) => card.suit === suit)
			.reverse()
			.map((card) => {
				return {
					...card,
					selected: true,
				}
			})
		return suitCards
	}

	const [selectedCards, setSelectedCards] = useState(getCardsInSuit())

	const toggleCard = (card: SelectableCard) => {
		const newCard = { ...card, selected: !card.selected }
		setSelectedCards((prev) => {
			const newCards = [...prev]
			const index = newCards.findIndex((c) => c.rank === card.rank)
			newCards[index] = newCard
			return newCards
		})
	}

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
				{selectedCards.map((card, index) => (
					<li
						key={index}
						className={`card-row-item selectable ${
							card.selected ? 'selected' : ''
						}`}
						onClick={() => toggleCard(card)}
					>
						<Card card={card} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default CardRow

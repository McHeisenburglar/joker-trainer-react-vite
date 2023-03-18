import React, { useState } from 'react'
import SelectableCardRow from './CardRow'
import { Deck } from '../../lib/game-logic/card/CardDeck'

interface CardGridProps {
	selectedCards: CardMap<Suit, SelectableCard[]>
}

const CardGrid: React.FC<CardGridProps> = () => {
	const [selectedCards, setSelectedCards] = useState(Deck.selectableCards())

	const toggleCard = (card: SelectableCard) => {
		const newCard = { ...card, selected: !card.selected }
		setSelectedCards((prev) => {
			const newCards = [...prev]
			const index = newCards.findIndex((c) => c.rank === card.rank)
			newCards[index] = newCard
			return newCards
		})
	}

	const handleClick = (card: SelectableCard) => {
		toggleCard(card)
	}

	return (
		<div className="card-row-grid">
			<SelectableCardRow
				cards={selectedCards.filter((card) => card.suit === 'hearts')}
				onClick={handleClick}
			/>
		</div>
	)
}

export default CardGrid

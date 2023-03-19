import React, { useState } from 'react'
import SelectableCardRow from './SelectableCardRow'
import { Deck } from '../../lib/game-logic/card/CardDeck'
import { SUITS } from '../../lib/global/constants'

interface CardGridProps {
	selectedCards: CardMap<Suit, SelectableCard[]>
}

const isSameCard = (card1: Card, card2: Card) => {
	if (card1.type !== card2.type) return false
	if (card1.type === 'joker' && card2.type === 'joker') return true
	if (card1.type === 'regular' && card2.type === 'regular') {
		return card1.rank === card2.rank && card1.suit === card2.suit
	}
}

const CardGrid: React.FC = () => {
	const [selectedCards, setSelectedCards] = useState(Deck.selectableCards())

	const toggleCard = (card: SelectableCard) => {
		const newCard = { ...card, selected: !card.selected }
		setSelectedCards((prev) => {
			const newCards = [...prev]
			const index = newCards.findIndex((c) => isSameCard(c, card))
			newCards[index] = newCard
			return newCards
		})
	}

	const handleClick = (card: SelectableCard) => {
		toggleCard(card)
	}

	const selectAll = () => {
		const newCards = selectedCards.map((card) => {
			return {
				...card,
				selected: true,
			}
		})
		setSelectedCards(newCards)
	}

	const deselectAll = () => {
		const newCards = selectedCards.map((card) => {
			return {
				...card,
				selected: false,
			}
		})
		setSelectedCards(newCards)
	}

	const cardsOfSuit = (suit: Suit) => {
		return selectedCards.filter((card) => card.suit === suit)
	}

	return (
		<div className="card-row-grid">
			{SUITS.map((suit) => {
				return (
					<SelectableCardRow cards={cardsOfSuit(suit)} onClick={handleClick} />
				)
			})}
			<button onClick={selectAll}>Select all</button>
			<button onClick={deselectAll}>Clear all</button>
		</div>
	)
}

export default CardGrid

import React from 'react'
import Card from './Card'

type CardHandProps = {
	cards: IRegularCard[]
}

function sortCards(cards: IRegularCard[]): IRegularCard[] {
	// Define the order of the ranks
	const rankOrder: Rank[] = [
		'ace',
		'king',
		'queen',
		'jack',
		'10',
		'9',
		'8',
		'7',
		'6',
	]

	// Sort the cards by their rank and suit
	cards.sort((a, b) => {
		if (a.suit < b.suit) return -1
		if (a.suit > b.suit) return 1
		return rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank)
	})

	// Group the cards by suit
	const suits = {} as CardMap<Suit, IRegularCard[]>
	cards.forEach((card) => {
		if (!suits[card.suit]) {
			suits[card.suit] = []
		}
		suits[card.suit].push(card)
	})

	// Sort the groups by the highest card in each group
	const groups = Object.values(suits)
	groups.sort((a, b) => {
		return rankOrder.indexOf(a[0].rank) - rankOrder.indexOf(b[0].rank)
	})

	// Flatten the groups and return the sorted array
	return groups.flat()
}

const CardHand: React.FC<CardHandProps> = ({ cards }) => {
	const sortedCards = sortCards(cards)

	return (
		<ul className="card-hand shown">
			{sortedCards.map((card, index) => (
				<li key={index} className="card-hand-item">
					<Card {...card} />
				</li>
			))}
		</ul>
	)
}

export default CardHand

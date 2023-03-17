import React from 'react'
import Card from './Card'

type CardHandProps = {
	cards: IRegularCard[]
	playedCard?: IRegularCard
	trumpSuit: Suit | null
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
function getPlayableCards(
	hand: IRegularCard[],
	playedCard: IRegularCard,
	trumpSuit: Suit | null
) {
	const sameSuitCards = hand.filter((card) => card.suit === playedCard.suit)
	const trumpCards = hand.filter((card) => card.suit === trumpSuit)

	if (sameSuitCards.length > 0) {
		return hand.map((card) => {
			const playable = card.suit === playedCard.suit
			return { ...card, playable }
		})
	} else if (trumpSuit && trumpCards.length > 0) {
		return hand.map((card) => {
			const playable = card.suit === trumpSuit
			return { ...card, playable }
		})
	} else {
		return hand.map((card) => ({ ...card, playable: true }))
	}
}

function allPlayableCards(cards: IRegularCard[]): IRegularCard[] {
	return cards.map((card) => ({ ...card, playable: true }))
}

const CardHand: React.FC<CardHandProps> = ({
	cards,
	playedCard,
	trumpSuit,
}) => {
	const sortedCards = sortCards(cards)
	const playableCards = playedCard
		? getPlayableCards(sortedCards, playedCard, trumpSuit)
		: allPlayableCards(sortedCards)

	return (
		<ul className="card-hand shown">
			{playableCards.map((card, index) => (
				<li key={index} className="card-hand-item">
					<Card {...card} />
				</li>
			))}
		</ul>
	)
}

export default CardHand

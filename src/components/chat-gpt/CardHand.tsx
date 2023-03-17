import React from 'react'
import Card from './Card'

type CardHandProps = {
	cards: Card[]
	playedCard?: IRegularCard
	trumpSuit: Suit | null
}

function sortCards(cards: Card[]): Card[] {
	const regularCards = cards.filter(
		(card) => card.type === 'regular'
	) as IRegularCard[]
	const jokerCards = cards.filter(
		(card) => card.type === 'joker'
	) as IJokerCard[]

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
	regularCards.sort((a, b) => {
		if (a.suit < b.suit) return -1
		if (a.suit > b.suit) return 1
		return rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank)
	})

	// Group the cards by suit
	const suits = {} as CardMap<Suit, IRegularCard[]>
	regularCards.forEach((card) => {
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
	return [...jokerCards, ...groups.flat()]
}
function getPlayableCards(
	hand: Card[],
	playedCard: IRegularCard,
	trumpSuit: Suit | null
) {
	const regularCards = hand.filter(
		(card) => card.type === 'regular'
	) as IRegularCard[]

	const sameSuitCards = regularCards.filter(
		(card) => card.suit === playedCard.suit
	)
	const trumpCards = regularCards.filter((card) => card.suit === trumpSuit)

	if (sameSuitCards.length > 0) {
		return hand.map((card) => {
			const playable = card.type === 'joker' || card.suit === playedCard.suit
			return { ...card, playable }
		})
	} else if (trumpSuit && trumpCards.length > 0) {
		return hand.map((card) => {
			const playable = card.type === 'joker' || card.suit === trumpSuit
			return { ...card, playable }
		})
	} else {
		return hand.map((card) => ({ ...card, playable: true }))
	}
}

function allPlayableCards(cards: Card[]): Card[] {
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
					<Card card={card} />
				</li>
			))}
		</ul>
	)
}

export default CardHand

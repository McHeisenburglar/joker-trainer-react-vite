import React, { useState } from 'react'
import { Deck as CardDeck } from '../../lib/game-logic/card/CardDeck'
import { getRandomCards } from '../../lib/helpers/random'
import Card from './Card'
import CardHand from './CardHand'
import CardTable from './CardTable'

class CardsInHand {
	private _cards: Card[]
	constructor() {
		this._cards = []
	}

	public addCard(card: Card) {
		this._cards.push(card)
	}
	public clear() {
		this._cards = []
	}

	public get cards() {
		return this._cards
	}
}

const FourPlayerCardGame = () => {
	const [deck, setDeck] = useState(new CardDeck())
	const [hands, setHands] = useState([
		new CardsInHand(),
		new CardsInHand(),
		new CardsInHand(),
		new CardsInHand(),
	])
	const [trumpSuit, setTrumpSuit] = useState(null)

	const playedCard = getRandomCards(1)[0]

	const dealCards = () => {
		deck.reset()
		deck.shuffle()
		hands.forEach((hand) => {
			hand.clear()
			for (let i = 0; i < 9; i++) {
				const card = deck.pop()
				hand.addCard(card)
			}
		})
		setHands([...hands])
	}

	return (
		<div>
			<Card card={playedCard} />
			<button onClick={dealCards}>Deal Cards</button>
			{hands.map((hand, index) => (
				<CardHand
					key={index}
					cards={hand.cards}
					trumpSuit={trumpSuit}
					playedCard={playedCard}
				/>
			))}
			<CardTable></CardTable>
		</div>
	)
}

export default FourPlayerCardGame

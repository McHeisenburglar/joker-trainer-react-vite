import React, { useState } from 'react'
import { Deck as CardDeck } from '../../lib/game-logic/card/CardDeck'
import CardHand from './CardHand'

class CardsInHand {
	private _cards: IRegularCard[]
	constructor() {
		this._cards = []
	}

	public addCard(card: IRegularCard) {
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
			<button onClick={dealCards}>Deal Cards</button>
			{hands.map((hand, index) => (
				<CardHand key={index} cards={hand.cards} trumpSuit={trumpSuit} />
			))}
		</div>
	)
}

export default FourPlayerCardGame

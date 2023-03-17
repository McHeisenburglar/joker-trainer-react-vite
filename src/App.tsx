import './scss/reset.scss'
// import './scss/main.scss'
import './scss/chat-gpt.scss'

import { JokerCard, RegularCard } from './components/Card'
import { useState } from 'react'

import { Deck } from './lib/game-logic/card/CardDeck'

import Card from './components/chat-gpt/Card'
import HiddenCard from './components/chat-gpt/HiddenCard'
import CardHand from './components/chat-gpt/CardHand'

import { Deck as CardDeck } from './lib/game-logic/card/CardDeck'

interface CardDeckProps {
	cards: Card[]
}

function getRandomCards(numCards: number): IRegularCard[] {
	let deck = new CardDeck()
	deck.shuffle()

	const cards: IRegularCard[] = []
	let i = 0

	while (i < numCards) {
		try {
			const card = deck.pop()
			if (card.type === 'regular') {
				cards.push(card)
				i++
			}
		} catch (error) {
			deck = new CardDeck()
		}
	}

	return cards
}

function App() {
	const hand = getRandomCards(10)

	return (
		<div className="main">
			<CardHand cards={hand} />
			<Card rank="6" suit="spades" />
			<HiddenCard />
		</div>
	)
}

export default App

import './scss/reset.scss'
import './scss/chat-gpt.scss'

import { useState, useMemo } from 'react'

import CardHand from './components/chat-gpt/CardHand'
import Card from './components/chat-gpt/Card'

import HiddenHand from './components/chat-gpt/HiddenHand'
import CardTable from './components/chat-gpt/CardTable'
import DevWindow from './components/chat-gpt/DevTable'

import { getRandomCards, getRandomCardTable } from './lib/helpers/random'

const GameView = () => {
	const hand = useMemo(() => getRandomCards(10), [])
	const table = useMemo(() => getRandomCardTable(), [])
	const playedCard = useMemo(() => getRandomCards(1)[0], [])

	const [components, setComponents] = useState({
		cardHand: true,
		cardTable: true,
		hiddenHand: false,
	})

	const toggleComponent = (component: string | number) => {
		setComponents((prev) => ({ ...prev, [component]: !prev[component] }))
	}
	return (
		<div className="game-view">
			<Card card={playedCard}></Card>
			{components.cardTable && <CardTable cards={table} />}
			{components.hiddenHand && <HiddenHand position="top" numCards={5} />}
			{components.hiddenHand && <HiddenHand position="left" numCards={5} />}
			{components.hiddenHand && <HiddenHand position="right" numCards={5} />}
			{/* {components.cardHand && (
				<CardHand cards={hand} trumpSuit={'spades'} playedCard={playedCard} />
			)} */}
			<DevWindow components={components} toggleComponent={toggleComponent} />
		</div>
	)
}

// export default GameView

import FourPlayerCardGame from './components/chat-gpt/FourHands'
import SuitCard from './components/chat-gpt/SuitCard'
import CardRow from './components/chat-gpt/CardRow'
import SuitRow from './components/chat-gpt/SuitRow'
import CardGrid from './components/chat-gpt/CardGrid'
import { Deck } from './lib/game-logic/card/CardDeck'

function App() {
	return (
		<div>
			<CardRowGame />
		</div>
	)
	// return <FourPlayerCardGame />
}

function CardRowGame() {
	type SelectableCard = IRegularCard & {
		selected: boolean
	}
	const getCardsInSuit: (suit: Suit) => SelectableCard[] = (suit: Suit) => {
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

	const [selectedCards, setSelectedCards] = useState({
		hearts: getCardsInSuit('hearts'),
		diamonds: getCardsInSuit('diamonds'),
		clubs: getCardsInSuit('clubs'),
		spades: getCardsInSuit('spades'),
	})

	const handleClearAll = () => {
		console.log('hello')
		const suits = ['hearts', 'diamonds', 'clubs', 'spades'] as Suit[]
		const newSelectedCards = {} as CardMap<Suit, SelectableCard[]>
		suits.forEach((suit) => {
			newSelectedCards[suit] = selectedCards[suit].map((card) => {
				console.log(card)
				return {
					...card,
					selected: false,
				}
			})
		})
		console.log('then here')
		setSelectedCards(newSelectedCards)
	}

	return (
		<div className="center-content full-screen">
			<div className="card-grid-game">
				<CardGrid selectedCards={selectedCards} />
				<div className="button-bar">
					<button onClick={handleClearAll}>Clear all</button>
					<button>Select all</button>
					<button>Start Game</button>
				</div>
			</div>
		</div>
	)
}

export default App

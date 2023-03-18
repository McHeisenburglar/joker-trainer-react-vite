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

function App() {
	return (
		<div>
			<CardRow suit="hearts" />
			<CardRow suit="spades" />
			<CardRow suit="clubs" />
			<CardRow suit="diamonds" />
			{/* <SuitCard suit="hearts"></SuitCard>
			<SuitCard suit="spades"></SuitCard>
			<SuitCard suit="clubs"></SuitCard>
			<SuitCard suit="diamonds"></SuitCard> */}
		</div>
	)
	// return <FourPlayerCardGame />
}

export default App

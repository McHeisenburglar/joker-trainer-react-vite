import './scss/reset.scss'
import './scss/chat-gpt.scss'

import { useState, useMemo } from 'react'

import CardHand from './components/chat-gpt/CardHand'
import Card from './components/chat-gpt/Card'

import HiddenHand from './components/chat-gpt/HiddenHand'
import CardTable from './components/chat-gpt/CardTable'
import DevTable from './components/chat-gpt/DevTable'

import { getRandomCards, getRandomCardTable } from './lib/helpers/random'

// export default GameView

import FourPlayerCardGame from './components/chat-gpt/FourHands'
import SuitCard from './components/chat-gpt/SuitCard'
import SelectableCardRow from './components/chat-gpt/SelectableCardRow'
import SuitRow from './components/chat-gpt/SuitRow'
import CardGrid from './components/chat-gpt/CardGrid'
import { Deck } from './lib/game-logic/card/CardDeck'
import CardRowGame from './components/chat-gpt/CardRowGame'
import DemoGame from './components/chat-gpt/DemoGame'
import CardFan from './components/chat-gpt/CardFan'

function App() {
	return (
		<div>
			<CardFan />
			{/* <DemoGame /> */}
			{/* <CardRowGame /> */}
		</div>
	)
	// return <FourPlayerCardGame />
}

export default App

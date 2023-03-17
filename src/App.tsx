import './scss/reset.scss'
import './scss/chat-gpt.scss'

import { useState, useMemo } from 'react'

import CardHand from './components/chat-gpt/CardHand'

import HiddenHand from './components/chat-gpt/HiddenHand'
import CardTable from './components/chat-gpt/CardTable'
import DevWindow from './components/chat-gpt/DevTable'

import { getRandomCards, getRandomCardTable } from './lib/helpers/random'

const GameView = () => {
	const hand = useMemo(() => getRandomCards(10), [])
	const table = useMemo(() => getRandomCardTable(), [])

	const [components, setComponents] = useState({
		cardHand: false,
		cardTable: true,
		hiddenHand: false,
	})

	const toggleComponent = (component: string | number) => {
		setComponents((prev) => ({ ...prev, [component]: !prev[component] }))
	}
	return (
		<div className="game-view">
			{components.cardHand && <CardHand cards={hand} />}
			{components.cardTable && <CardTable cards={table} />}
			{components.hiddenHand && <HiddenHand position="top" numCards={5} />}
			{components.hiddenHand && <HiddenHand position="left" numCards={5} />}
			{components.hiddenHand && <HiddenHand position="right" numCards={5} />}
			<DevWindow components={components} toggleComponent={toggleComponent} />
		</div>
	)
}

// export default GameView

function App() {
	return <GameView />
}

export default App

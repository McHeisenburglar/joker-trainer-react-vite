import './scss/reset.scss'
// import './scss/main.scss'
import './scss/chat-gpt.scss'

import { JokerCard, RegularCard } from './components/Card'
import { useState, useMemo } from 'react'

import { Deck } from './lib/game-logic/card/CardDeck'

import Card from './components/chat-gpt/Card'
import HiddenCard from './components/chat-gpt/HiddenCard'
import CardHand from './components/chat-gpt/CardHand'

import { Deck as CardDeck } from './lib/game-logic/card/CardDeck'
import HiddenHand from './components/chat-gpt/HiddenHand'
import CardTable from './components/chat-gpt/CardTable'

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
type CardTable = {
	top: IRegularCard | null
	right: IRegularCard | null
	bottom: IRegularCard | null
	left: IRegularCard | null
}

function getRandomCardTable(): CardTable {
	const cards = getRandomCards(4)
	return {
		top: cards[0],
		right: cards[1],
		bottom: cards[2],
		left: cards[3],
	}
}

const GameView = () => {
	const hand = useMemo(() => getRandomCards(10), [])
	const table = useMemo(() => getRandomCardTable(), [])

	const [showCardHand, setShowCardHand] = useState(true)
	const [showCardTable, setShowCardTable] = useState(true)
	const [showHiddenHand, setShowHiddenHand] = useState(true)

	return (
		<div className="game-view">
			<div className="dev-window">
				<div>
					<input
						type="checkbox"
						checked={showCardHand}
						onChange={() => setShowCardHand(!showCardHand)}
					/>
					<label>CardHand</label>
				</div>
				<div>
					<input
						type="checkbox"
						checked={showCardTable}
						onChange={() => setShowCardTable(!showCardTable)}
					/>
					<label>CardTable</label>
				</div>
				<div>
					<input
						type="checkbox"
						checked={showHiddenHand}
						onChange={() => setShowHiddenHand(!showHiddenHand)}
					/>
					<label>HiddenHand</label>
				</div>
			</div>

			{showCardHand && <CardHand cards={hand} />}
			{showCardTable && <CardTable cards={table} />}
			{showHiddenHand && <HiddenHand position="top" numCards={5} />}
			{showHiddenHand && <HiddenHand position="left" numCards={5} />}
			{showHiddenHand && <HiddenHand position="right" numCards={5} />}
		</div>
	)
}

// export default GameView

function App() {
	const hand = getRandomCards(10)
	const table = getRandomCardTable()

	// return (
	// 	<div className="main">
	// 		<CardHand cards={hand} />
	// 		<Card rank="6" suit="spades" />
	// 		<HiddenCard />
	// 		<HiddenHand count={8} />
	// 		<CardTable cards={table} />
	// 	</div>
	// )
	return <GameView />
}

export default App

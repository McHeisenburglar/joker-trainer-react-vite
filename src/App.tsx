import './scss/main.scss'

import { JokerCard, RegularCard } from './components/Card'
import { useState } from 'react'

import { Deck } from './lib/game-logic/card/CardDeck'

interface CardDeckProps {
	cards: Card[]
}

function CardDeck(props: CardDeckProps) {
	const { cards } = props
	return (
		<div className="card-display">
			{cards.map((card) => {
				if (card.type === 'joker')
					return <JokerCard type="joker" id={card.id} />
				if (card.type === 'regular')
					return <RegularCard rank={card.rank} suit={card.suit} />
			})}
		</div>
	)
}

function FlipCard() {
	const [isFlipped, setIsFlipped] = useState(false)
	const onClick = () => {
		setIsFlipped(!isFlipped)
	}
	return (
		<div className="flip-card-test" onClick={onClick}>
			<div className={`cardd-scene`}>
				<div className={`cardd ${isFlipped ? 'cardd-flipped' : ''}`}>
					<div className="cardd-face cardd-face-front"></div>
					<div className="cardd-face cardd-face-back"></div>
				</div>
			</div>
		</div>
	)
}

function App() {
	const deck = new Deck()
	return (
		<div className="main">
			<CardDeck cards={deck.cards} />
		</div>
	)
}

export default App

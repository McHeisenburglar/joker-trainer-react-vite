import './scss/main.scss'

import { JokerCard, RegularCard } from './components/Card'

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

function App() {
	const deck = new Deck()
	// deck.shuffle()

	return (
		<div className="main">
			<CardDeck cards={deck.cards} />
		</div>
	)
}

export default App

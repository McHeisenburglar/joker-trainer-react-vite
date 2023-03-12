import './scss/main.scss'

import { Card } from './components/Card'

function JokerCardComponent(props: IJokerCard) {
	const { id } = props
	const color = id === 'joker1' ? 'red' : 'black'

	return (
		<div className="card card-3d card-tilt-js">
			<div className="face">
				<div className={`card-text color-${color}`}>
					<span className="card-joker">Joker</span>
				</div>
			</div>
			<div className="back"></div>
		</div>
	)
}

interface CardDeckProps {
	cards: Card[]
}

function CardDeck(props: CardDeckProps) {
	return (
		<div className="card-display">
			<Card rank="7" suit="hearts" />
		</div>
	)
}

function App() {
	return (
		<div className="main">
			<div className="card-display">
				<Card rank="7" suit="hearts" />
			</div>
		</div>
	)
}

export default App

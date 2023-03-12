import './scss/main.scss'

import { Card } from './components/Card'

type CardInfo = {
	type: 'regular' | 'joker'
}

export interface IRegularCard {
	type: 'regular'
	suit: Suit
	rank: Rank
}

export interface IJokerCard {
	type: 'joker'
	id: string
}

export type Card = IRegularCard | IJokerCard

interface JokerCardProps {
	id: 0 | 1
}

function JokerCard(props: JokerCardProps) {
	const { id } = props
	const color = id === 0 ? 'red' : 'black'

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

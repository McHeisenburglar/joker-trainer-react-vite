import { UICard as UICardInfo } from '../lib/game-logic/card/CardNames'
import { useState } from 'react'

function JokerIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="60"
			height="60"
			version="1.0"
			viewBox="0 0 512 512"
		>
			<path d="M269 43.2c-30.6 2.2-64.4 22.2-82.7 48.9-17.6 25.6-28.3 62.9-28.3 98.5 0 10.5-.7 13.3-2.6 10.3-1.8-2.9-18-13.7-26.9-17.9-14.7-7-20.8-8.4-35-8.4-12.3 0-16.1.7-27.7 5-12.3 4.6-25.1 14.9-32.9 26.5-11.8 17.4-20.2 44.7-21.6 70.1-.7 12.4.2 15.7 5.1 18.3 4.1 2.2 9.4 1.4 12.3-1.8 1.1-1.2 3.3-4.7 4.9-7.7 4.1-7.7 13.5-17.4 20-20.6 11.3-5.5 25.9-2.2 35.8 8.2 14.3 14.9 25.3 54.3 27.3 97.1l.6 14.3h234.3l1.1-13.3c3.9-43.5 17.1-74 36.4-83.8 20.2-10.1 50.1-7.4 82.8 7.6 9.3 4.3 10.4 4.6 13.6 3.5 4.7-1.5 7.5-5.3 7.5-10.1 0-9.8-12.3-39.2-23.5-56-12.5-18.8-27.3-32.2-45-40.9-16.9-8.3-31.8-10.8-52.4-9-28.6 2.6-51.9 12.8-69.8 30.7l-6.2 6.2-6.3-6.8c-12.3-13.3-17.7-25.7-17.8-40.2 0-10.7 2.4-19.1 8-27.7 13.4-20.9 39.8-33.3 62.2-29.3 15 2.7 16.4 2.6 19.8-.7 2.2-2.3 3-4 3-6.7 0-10.4-20.3-37.2-36.7-48.3-19-12.9-36.7-17.7-59.3-16z" />
			<path d="M374 109.2c-2.5 1.4-5.8 4.4-7.5 6.7-2.7 3.9-3 5-3 12 0 6.8.3 8.2 2.7 11.7 1.5 2.1 4.4 5 6.5 6.4 3.1 2.1 4.8 2.5 11.3 2.5 6.5 0 8.2-.4 11.3-2.5 2.1-1.4 5-4.3 6.5-6.4 2.4-3.5 2.7-4.9 2.7-11.6 0-6.7-.3-8.1-2.7-11.6-4.4-6.2-9-8.8-16.7-9.2-5.5-.3-7.4.1-11.1 2zM12.5 300.7c-16.5 8.7-16.6 30-.1 38.5 5.9 3 15.1 2.2 20.8-1.8 13.8-9.6 11.8-30.5-3.4-36.9-4.8-1.9-13.4-1.9-17.3.2zM482 300.6c-16.7 7.2-16.5 31.8.2 38.9 13.7 5.7 29.7-4.6 29.8-19.3.1-15-16.1-25.6-30-19.6zM117.7 405.7c-.4.3-.7 10.3-.7 22.1 0 17.4.3 22 1.6 24.7 3.2 6.9-3.5 6.5 115.8 6.5 117.9 0 112.9.3 116-5.9 1.3-2.5 1.6-7 1.6-25.6V405H235.2c-64.3 0-117.2.3-117.5.7z" />
		</svg>
	)
}

export function JokerCard(props: IJokerCard) {
	const [showFace, setShowFace] = useState(true)

	const onClick = () => {
		setShowFace(!showFace)
	}

	const { id } = props
	const color = id === 'joker1' ? 'red' : 'black'

	return (
		<div className="card-container">
			<div
				className={`card card-3d card-tilt-js ${!showFace ? 'is-flipped' : ''}`}
				onClick={onClick}
			>
				<div className="face">
					<div className={`card-text card-joker color-${color}`}>
						<JokerIcon />
					</div>
				</div>
				<div className="back"></div>
			</div>
		</div>
	)
}

interface IRegularCardProps {
	rank: Rank
	suit: Suit
}

export const RegularCard = (props: IRegularCardProps) => {
	const [showFace, setShowFace] = useState(true)

	const onClick = () => {
		setShowFace(!showFace)
	}

	const { rank, suit } = props
	const card = new UICardInfo(rank, suit)
	const color = card.color

	return (
		<div className="card-container">
			<div
				className={`card card-3d card-tilt-js ${!showFace ? 'is-flipped' : ''}`}
				onClick={onClick}
			>
				<div className="face">
					<div className={`card-text color-${color}`}>
						<span className="card-rank">{card.rank.short}</span>
						<span className="card-suit">{card.suit.unicode}</span>
					</div>
				</div>
				<div className="back"></div>
			</div>
		</div>
	)
}

// const cards: CardTuple[] = [
// 	[8, 0],
// 	[2, 0],
// 	[4, 1],
// 	[3, 1],
// 	[5, 2],
// 	[2, 2],
// 	[8, 3],
// 	[7, 3],
// ]

// const mountEl = document.querySelector('.card-display')!
// mountEl.innerHTML = ''

// for (let i = 0; i < cards.length; i++) {
// 	let card: CardTuple = cards[i]
// 	const rank = card[0]
// 	const suit = card[1]
// 	console.log(card)

// 	const el = CardComponent(rank, suit)
// 	mountEl.appendChild(el)
// }

// console.log('Goodbye from cardDeal.ts')

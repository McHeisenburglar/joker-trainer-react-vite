import { UICard as UICardInfo } from '../lib/game-logic/card/CardNames'

export function JokerCard(props: IJokerCard) {
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

interface IRegularCardProps {
	rank: Rank
	suit: Suit
}

export const RegularCard = (props: IRegularCardProps) => {
	const { rank, suit } = props

	const card = new UICardInfo(rank, suit)
	const color = card.color

	return (
		<div className="card card-3d card-tilt-js">
			<div className="face">
				<div className={`card-text color-${color}`}>
					<span className="card-rank">{card.rank.short}</span>
					<span className="card-suit">{card.suit.unicode}</span>
				</div>
			</div>
			<div className="back"></div>
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

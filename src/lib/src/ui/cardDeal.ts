console.log('Hello from cardDeal.ts')

import { SuitEnum, RankEnum } from '../archive/card.js'

const RankShortName = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const SuitCode = ['️&clubs;', '️&hearts;', '️&spades;', '️&diamondsuit;']

type CardTuple = [RankEnum, SuitEnum]

const CardComponent = (rank: RankEnum, suit: SuitEnum) => {
	const rankText = RankShortName[rank]
	const suitText = SuitCode[suit]
	const color = suit % 2 === 0 ? 'black' : 'red'

	const el = document.createElement('div')

	el.classList.add('card', 'card-3d', 'card-tilt-js')
	if (Math.random() > 2) el.classList.add('disabled')

	const template = `
        <div class="face">
            <div class="card-text color-${color}">
                <span class="card-rank">${rankText}</span>
                <span class="card-suit">${suitText}</span>
            </div>
        </div>
        <div class="back"></div>
    `
	el.innerHTML = template
	return el
}

const cards: CardTuple[] = [
	[8, 0],
	[2, 0],
	[4, 1],
	[3, 1],
	[5, 2],
	[2, 2],
	[8, 3],
	[7, 3],
]

const mountEl = document.querySelector('.card-display')!
mountEl.innerHTML = ''

for (let i = 0; i < cards.length; i++) {
	let card: CardTuple = cards[i]
	const rank = card[0]
	const suit = card[1]
	console.log(card)

	const el = CardComponent(rank, suit)
	mountEl.appendChild(el)
}

console.log('Goodbye from cardDeal.ts')

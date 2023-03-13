import { RANKS, SUITS } from '../../global/constants'
import { shuffleAlg } from '../../helpers/random'

export class Deck {
	private _cards: Card[]

	constructor() {
		this._cards = this.generate()
	}

	private generate(): Card[] {
		let deck: Card[] = []

		for (let rank of RANKS) {
			for (let suit of SUITS) {
				if (!(rank === '6' && (suit === 'clubs' || suit === 'spades'))) {
					const card: Card = {
						type: 'regular',
						rank,
						suit,
					}
					deck.push(card)
				}
			}
		}

		deck.push({ type: 'joker', id: 'joker1' })
		deck.push({ type: 'joker', id: 'joker2' })

		return deck
	}

	shuffle(): void {
		shuffleAlg(this._cards)
	}

	reset(): void {
		this._cards = this.generate()
		this.shuffle()
	}
	pop(): Card {
		const card = this._cards.pop()
		if (!card) throw new Error("Can't pop card. Deck empty.")
		return card
	}

	get cards(): Card[] {
		return this._cards
	}
}

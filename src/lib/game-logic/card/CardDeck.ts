import { RANKS, SUITS } from '../../global/constants'
import { shuffleAlg } from '../../helpers/random'

export class Deck {
	private cards: Card[]

	constructor() {
		this.cards = this.generate()
	}

	private generate(): Card[] {
		let deck: Card[] = []

		for (let rank of RANKS) {
			for (let suit of SUITS) {
				if (rank === '6' && (suit === 'clubs' || suit === 'spades')) break
				const card: Card = {
					type: 'regular',
					rank,
					suit,
				}
				deck.push(card)
			}
		}

		deck.push({ type: 'joker', id: 'joker1' })
		deck.push({ type: 'joker', id: 'joker2' })

		return deck
	}

	shuffle(): void {
		shuffleAlg(this.cards)
	}

	reset(): void {
		this.cards = this.generate()
		this.shuffle()
	}
	pop(): Card {
		const card = this.cards.pop()
		if (!card) throw new Error("Can't pop card. Deck empty.")
		return card
	}
}

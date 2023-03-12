enum SuitEnum {
	Clubs,
	Hearts,
	Spades,
	Diamonds,
}

enum RankEnum {
	Six,
	Seven,
	Eight,
	Nine,
	Ten,
	Jack,
	Queen,
	King,
	Ace,
}

const SuitNames = ['Clubs', 'Hearts', 'Spades', 'Diamonds']
const SuitEmojis = ['♣️', '♥️', '♠️', '♦️']

const RankNames = ['6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
const RankShortName = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

interface IRegularCard {
	rank: RankEnum
	suit: SuitEnum
}

interface ICard {
	getFullName(): string
	getShortName(): string
}

class Card implements ICard {
	getFullName(): string {
		if (this instanceof JokerCard) return 'Joker'
		if (this instanceof RegularCard) {
			return `${RankNames[this.rank]} of ${SuitNames[this.suit]}`
		}
		return 'error'
	}
	getShortName(): string {
		if (this instanceof JokerCard) return 'Jok'
		if (this instanceof RegularCard) {
			return `${RankShortName[this.rank]}${SuitEmojis[this.suit]}`
		}
		return 'error'
	}

	isJoker(): boolean {
		return this instanceof JokerCard
	}
	isRegular(): boolean {
		return this instanceof RegularCard
	}
}

// joker action
// over
// under
// highest
// goes to

class JokerCard extends Card {
	action: string | null

	constructor() {
		super()
		this.action = null
	}

	setAction(actionName: string): void {
		this.action = actionName
	}
}

class RegularCard extends Card implements IRegularCard {
	rank: RankEnum
	suit: SuitEnum
	constructor(rank: RankEnum, suit: SuitEnum) {
		super()
		this.rank = rank
		this.suit = suit
	}
}

// type Card = RegularCard | JokerCard

interface IDeck {
	cards: Card[]
	shuffle(): void
	dealTopCard(): Card | null
}

class Deck implements IDeck {
	cards: Card[]
	constructor() {
		this.cards = []
		this.generate()
	}
	private generate(): void {
		for (let rank = 0; rank < 9; rank++) {
			for (let suit = 0; suit < 4; suit++) {
				if (
					!(
						rank === RankEnum.Six &&
						(suit === SuitEnum.Clubs || suit === SuitEnum.Spades)
					)
				) {
					const card = new RegularCard(rank, suit)
					this.cards.push(card)
				}
			}
		}
		this.cards.push(new JokerCard())
		this.cards.push(new JokerCard())
	}
	private shuffleAlg(array: any[]) {
		let currentIndex = array.length,
			randomIndex

		// While there remain elements to shuffle.
		while (currentIndex != 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex--

			// And swap it with the current element.
			;[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			]
		}

		return array
	}
	shuffle(): void {
		this.shuffleAlg(this.cards)
	}
	dealTopCard(): Card | null {
		return this.cards.pop() || null
	}
}

function getScoreOfRound(
	expected: number,
	reality: number,
	penalty: number = -200
): number {
	if (expected === reality) {
		return 50 + expected * 50
	} else {
		if (reality > 0) {
			return reality * 10
		} else {
			return penalty
		}
	}
}

export { SuitEnum, RankEnum, Card, RegularCard, JokerCard, Deck }

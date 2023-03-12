console.log('Hello from index.ts')
import { Deck, RankEnum, SuitEnum, Card, RegularCard } from './card.js'

const myDeck = new Deck()
myDeck.shuffle()
// console.log(myDeck.cards.map((c) => c.getShortName()))

class Player {
	hand: Card[]
	name: string
	position: number

	constructor(name: string, position: number) {
		this.name = name
		this.position = position
		this.hand = []
	}
}

const GameController = {}

const SetController = {}

const RoundController = {}

const TurnController = {}

const PlayerController = {}

const RoundState = {
	dealer: 0,
	turn: 0,
	bets: {
		0: 0,
		1: 0,
		2: 0,
		3: 0,
	},
	trump: SuitEnum.Hearts,
}

console.log('HELLOOOOOO', SuitEnum['Hearts'])

const TurnController2 = {
	determineWinner(cards: Card[]): number {
		let winner: number
		if (!(cards[0] instanceof RegularCard)) {
			winner = 0
		} else {
			const suitPlayed = cards[0].suit

			const trumpPlayed: boolean = cards.some((c) => {
				if (c instanceof RegularCard) {
					return c.suit === RoundState.trump
				}
			})

			if (trumpPlayed) {
				const highestPlayed: Card = [...cards]
					.filter((c) => {
						return c instanceof RegularCard && c.suit === RoundState.trump
					})
					.sort((a, b) => {
						if (a instanceof RegularCard && b instanceof RegularCard)
							return b.rank - a.rank
						return 0
					})[0]
				winner = cards.findIndex((card) => {
					if (
						card instanceof RegularCard &&
						highestPlayed instanceof RegularCard
					) {
						return (
							card.rank === highestPlayed.rank &&
							card.suit === highestPlayed.suit
						)
					}
					return false
				})
				return winner
			} else {
				const highestPlayed: Card = [...cards]
					.filter((c) => {
						return c instanceof RegularCard && c.suit === suitPlayed
					})
					.sort((a, b) => {
						if (a instanceof RegularCard && b instanceof RegularCard)
							return b.rank - a.rank
						return 0
					})[0]
				winner = cards.findIndex((card) => {
					if (
						card instanceof RegularCard &&
						highestPlayed instanceof RegularCard
					) {
						return (
							card.rank === highestPlayed.rank &&
							card.suit === highestPlayed.suit
						)
					}
					return false
				})
				return winner
			}
		}

		return winner
	},
}

const cards = [
	new RegularCard(RankEnum.Seven, SuitEnum.Clubs),
	new RegularCard(RankEnum.Jack, SuitEnum.Clubs),
	new RegularCard(RankEnum.Ten, SuitEnum.Clubs),
	new RegularCard(RankEnum.Queen, SuitEnum.Clubs),
]

const winner = TurnController2.determineWinner(cards)
// console.log(winner)

type RankAndSuit = [RankEnum, SuitEnum]

function getRandomRankAndSuit(): RankAndSuit {
	const rank = randomNumber(0, 9)
	const suit = randomNumber(0, 4)
	return [rank, suit]
}

export function randomCard(): RegularCard {
	const [rank, suit] = getRandomRankAndSuit()
	const card = new RegularCard(rank, suit)
	return card
}

function randomNumber(min = 0, max = 1): number {
	return Math.floor(Math.random() * (max - min)) + min
}

// const me: { name: string; hand: RegularCard[] } = {
// 	name: 'Irakli',
// 	hand: [],
// }

class TestPlayer {
	name: string
	hand: RegularCard[]
	turn: ITurnState | null
	constructor(name: string) {
		this.name = name
		this.hand = []
		this.turn = null
	}

	generateCards(amount: number): void {
		this.hand = []
		for (let i = 0; i < amount; i++) {
			this.hand.push(randomCard())
		}
	}
	setTurnState(turnState: ITurnState): void {
		this.turn = turnState
	}
	print(): void {
		console.log(this.name)
		console.log(this.hand.map((c) => c.getShortName()))
	}
	private playableCards(): RegularCard[] {
		const theSuit = new TurnHelper(this.turn!).desiredSuit()

		if (!theSuit) return [...this.hand]

		let playable: RegularCard[] = []

		playable = this.hand.filter((c) => c.suit === theSuit)
		if (playable.length > 0) return playable

		playable = this.hand.filter((c) => c.suit === this.turn!.trump)
		if (playable.length > 0) return playable

		playable = [...this.hand]

		return playable
	}
	printPlayable(): void {
		console.log('Playable cards are', this.playableCards())
	}
	playRandomCard(turnState: ITurnState): RegularCard {
		const playable = this.playableCards()
		const randomIndex = randomNumber(0, this.playableCards.length)

		const p: RegularCard = playable[randomIndex]

		this.hand = this.hand.filter((c) => c.suit !== p.suit || c.rank !== p.rank)

		return p
	}
}

class TurnHelper {
	turnState: ITurnState
	constructor(state: ITurnState) {
		this.turnState = state
	}
	desiredSuit(): SuitEnum | null {
		if (this.turnState.playedCards.length === 0) return null
		return this.turnState.playedCards[0].suit
	}
	whoseTurn(): number {
		return (this.turnState.startPlayer + this.turnState.playedCards.length) % 4
	}
}

interface ITurnState {
	startPlayer: number
	playedCards: RegularCard[]
	trump: SuitEnum
}

interface IPlayerRoundState {
	expected: number
	taken: number
	finalScore: number
}

const GameState = {
	players: [],
}

interface IRoundState {
	numOfCards: number
	trump: SuitEnum
	dealer: number
	lastTaken: RegularCard[]
	lastTaker: number
}

class RoundState2 implements IRoundState {
	numOfCards: number
	trump: SuitEnum
	dealer: number
	lastTaken: RegularCard[]
	lastTaker: number

	constructor(options: IRoundState) {
		this.numOfCards = options.numOfCards
		this.trump = options.trump
		this.dealer = options.dealer
		this.lastTaken = options.lastTaken
		this.lastTaker = options.lastTaker
	}
}

interface IRoundController {
	dealCards: void
}

// const RoundController2: IRoundController {
//     dealCards(): void {
//         this

//     }

// }

class TurnState implements ITurnState {
	startPlayer: number
	playedCards: RegularCard[]
	trump: SuitEnum
	constructor(startingTurn: number, roundTrump: SuitEnum) {
		this.startPlayer = startingTurn
		this.trump = roundTrump
		this.playedCards = []
	}
}

// const TurnState: ITurnState = {
// 	startPlayer: 0,
// 	playedCards: [],
// 	trump: Suit.Clubs,
// }

const irakli = new TestPlayer('Irakli')
const dea = new TestPlayer('Dea')

irakli.generateCards(5)
dea.generateCards(5)

// irakli.print()
// dea.print()

//
// const TurnState = {
// 	playedCards: [],
// }

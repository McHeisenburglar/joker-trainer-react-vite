import { Card, RankEnum, SuitEnum, Deck, JokerCard } from '../archive/card.js'
import { RegularCard as NCard } from '../archive/card.js'

// who takes a hand?

type playerId = 1 | 2 | 3 | 4

// playing a Joker

// playCard
// check if Joker
// is it the first one

class PlayableCard {
	card: NCard | JokerCard
	isLegal: boolean
	constructor(card: NCard | JokerCard) {
		this.card = card
		this.isLegal = false
	}
}

type IPlayerHand = Card[]

// class PlayerHand {
//     cards: PlayableCard[]
//     constructor() {
//         this.cards = []
//     }
// }

const playerHand: Card[] = []

interface JokerAction {
	type: 'High' | 'Low'
	suit: SuitEnum
}

interface IKicker {
	suit: SuitEnum
	highOnly: boolean
}

class PlayedMove {
	card: Card
	playedBy: number
	jokerAction?: JokerAction

	constructor(card: Card, playedBy: number, jokerAction?: JokerAction) {
		this.card = card
		this.playedBy = playedBy
		if (jokerAction) this.jokerAction = jokerAction
	}
}

function sortHighToLow(a: Card, b: Card): number {
	if (a.isJoker()) return -1
	if (b.isJoker()) return 1

	if (a instanceof NCard && b instanceof NCard) {
		return b.rank - a.rank
	}
	return 0
}

const MoveHelper = {
	getPlayableCards(
		playerHand: IPlayerHand,
		kicker: IKicker,
		trumpSuit: SuitEnum
	): Card[] {
		const isJoker = (card: Card): boolean => card.isJoker()
		const isRegular = (card: Card): boolean => card.isRegular()
		const isSameSuit = (card: NCard): boolean => card.suit === kicker.suit
		const isTrumpSuit = (card: NCard): boolean => card.suit === trumpSuit

		if (!kicker) return [...playerHand]

		const PlayableCards: Card[] = []

		const JokerCards = playerHand.filter(isJoker) as JokerCard[]
		PlayableCards.push(...JokerCards)

		const NCards = playerHand.filter(isRegular) as NCard[]

		if (NCards.some(isSameSuit)) {
			if (kicker.highOnly) {
				PlayableCards.push(NCards.filter(isSameSuit).sort(sortHighToLow)[0])
			} else {
				PlayableCards.push(...NCards.filter(isSameSuit))
			}
			return PlayableCards
		}
		if (NCards.some(isTrumpSuit)) {
			PlayableCards.push(...NCards.filter(isTrumpSuit))
			return PlayableCards
		}

		return [...playerHand]
	},
}

const myHand: Card[] = []
myHand.push(new JokerCard())
myHand.push(new NCard(RankEnum.Eight, SuitEnum.Spades))
myHand.push(new NCard(RankEnum.Six, SuitEnum.Spades))
myHand.push(new NCard(RankEnum.Eight, SuitEnum.Diamonds))
myHand.push(new NCard(RankEnum.Queen, SuitEnum.Diamonds))
myHand.push(new NCard(RankEnum.Ace, SuitEnum.Diamonds))
myHand.push(new NCard(RankEnum.Jack, SuitEnum.Diamonds))
myHand.push(new NCard(RankEnum.Ace, SuitEnum.Hearts))

const kicker: IKicker = {
	suit: SuitEnum.Clubs,
	highOnly: false,
}

const trumpSuit = SuitEnum.Clubs

const playable: Card[] = MoveHelper.getPlayableCards(myHand, kicker, trumpSuit)

console.log(playable.map((c) => c.getShortName()))

// const TurnHelper = {

// 	determineWinner(cards: Card[]): number {
// 		let winner: number
// 		if (!(cards[0] instanceof RegularCard)) {
// 			winner = 0
// 		} else {
// 			const suitPlayed = cards[0].suit

// 			const trumpPlayed: boolean = cards.some((c) => {
// 				if (c instanceof RegularCard) {
// 					return c.suit === RoundState.trump
// 				}
// 			})

// 			if (trumpPlayed) {
// 				const highestPlayed: Card = [...cards]
// 					.filter((c) => {
// 						return c instanceof RegularCard && c.suit === RoundState.trump
// 					})
// 					.sort((a, b) => {
// 						if (a instanceof RegularCard && b instanceof RegularCard)
// 							return b.rank - a.rank
// 						return 0
// 					})[0]
// 				winner = cards.findIndex((card) => {
// 					if (
// 						card instanceof RegularCard &&
// 						highestPlayed instanceof RegularCard
// 					) {
// 						return (
// 							card.rank === highestPlayed.rank &&
// 							card.suit === highestPlayed.suit
// 						)
// 					}
// 					return false
// 				})
// 				return winner
// 			} else {
// 				const highestPlayed: Card = [...cards]
// 					.filter((c) => {
// 						return c instanceof RegularCard && c.suit === suitPlayed
// 					})
// 					.sort((a, b) => {
// 						if (a instanceof RegularCard && b instanceof RegularCard)
// 							return b.rank - a.rank
// 						return 0
// 					})[0]
// 				winner = cards.findIndex((card) => {
// 					if (
// 						card instanceof RegularCard &&
// 						highestPlayed instanceof RegularCard
// 					) {
// 						return (
// 							card.rank === highestPlayed.rank &&
// 							card.suit === highestPlayed.suit
// 						)
// 					}
// 					return false
// 				})
// 				return winner
// 			}
// 		}

// 		return winner
// 	},
// }

// import { RegularCard as NCard } from "../card"

// const TurnDecider = () => {

//     const trump = new NCard(Rank.Six, Suit.Hearts)

// const card0 = new NCard(Rank.Eight, Suit.Spades)
// const card1 = new NCard(Rank.Six, Suit.Spades)
// const card2 = new NCard(Rank.Eight, Suit.Hearts)
// const card3 = new NCard(Rank.Queen, Suit.Spades)

//     let winner = card0;

//     winner = CompareCards(winner, card1)
//     winner = CompareCards(winner, card2)
//     winner = CompareCards(winner, card3)

//     return winner

// }

// const CompareCards(a: NCard, b: NCard, c: Suit?): Card {
//     // if a is joker, and b is joker
//     if(a is Joker && b is Joker) {
//         return b
//     }

//     if(a is Joker) {
//         playedOve
//     }

// }

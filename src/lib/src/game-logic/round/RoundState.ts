import { PlayerPosition } from '../player/Player.js'
import { Deck } from '../card/CardDeck.js'

export type TrumpSuit = Suit | null | undefined

interface IPlayerRound {
	bet: number
	taken: number
	score(): number
}

interface IRoundState {
	readonly numOfCards: number
	readonly startingPlayer: PlayerPosition
	trump: TrumpSuit
	currentTurn: PlayerPosition
	playerScores: {
		0: IPlayerRound
		1: IPlayerRound
		2: IPlayerRound
		3: IPlayerRound
	}
}

import { Game } from '../game-logic/game/Game.js'

// import { PlayerList, PlayerInfo, GameConfig } from '../game-logic/game/Game.js'

// import {
// 	PlayerSetColumn,
// 	PlayerRoundCell,
// } from '../game-logic/score/ScoreTable.js'

type RoundState = 'none' | 'pickTrump' | 'betting' | 'playing' | 'complete'

type TurnState = number
type SetID = number
type SetConfig = number[][]
type RoundID = number | string

interface IGameRound {
	state: RoundState
	cardsPerPlayer: number
	startingPlayer: PlayerPosition
	trump?: Suit
	scores?: ScoreTableRow
	currentTurn?: TurnState
	lastTurn?: TurnState
	meta: {
		roundNumber: number
		setNumber: number
	}
}

type ScoreTableRow = {
	[index in PlayerPosition]: PlayerRoundCell
}

interface RoundInfo {
	scores: ScoreTableRow
	meta: {
		roundNumber: number
		setNumber: number
	}
}

const irakli: PlayerSetColumn = {
	rounds: {
		1: {
			bet: 1,
			taken: 1,
			score: 100,
			isSuccess: true,
		},
		2: {
			bet: 1,
			taken: 1,
			score: 10,
			isSuccess: true,
		},
		3: {
			bet: 3,
			taken: 3,
			score: -200,
			isSuccess: true,
		},
		4: {
			bet: 4,
			taken: 4,
			score: 250,
			isSuccess: true,
		},
		5: null,
		6: null,
		7: null,
		8: null,
	},
	bonus: -250,
	meta: {
		name: 'irakli',
		position: 1,
	},
}

interface RoundScoresList {
	[index: RoundID]: PlayerRoundCell | null
}

interface IScoreController {
	sumOfRoundScores(rounds: RoundScoresList): number
	calculatePlayerSetTotal(set: PlayerSetColumn): number
	addRoundInfoToPlayerSet(roundInfo: RoundInfo, set: PlayerSetColumn): void
}

const ScoreController: IScoreController = {
	sumOfRoundScores(rounds: RoundScoresList): number {
		const sum = Object.entries(rounds)
			.filter(([key, value]) => value)
			.map(([key, value]) => value!.score)
			.reduce((acc, cur) => cur + acc, 0)
		return sum
	},
	calculatePlayerSetTotal(set: PlayerSetColumn): number {
		let total: number = 0

		total += this.sumOfRoundScores(set.rounds)
		total += set.bonus

		return total
	},
	addRoundInfoToPlayerSet(roundInfo: RoundInfo, set: PlayerSetColumn): void {
		const roundNumber = roundInfo.meta.roundNumber
		const playerIndex = set.meta!.position!

		set.rounds[roundNumber] = { ...roundInfo.scores[playerIndex] }
	},
}

const newRound: RoundInfo = {
	meta: {
		roundNumber: 5,
		setNumber: 2,
	},
	scores: {
		0: {
			bet: 3,
			taken: 3,
			score: 200,
			isSuccess: true,
		},
		1: {
			bet: 3,
			taken: 3,
			score: 200,
			isSuccess: true,
		},
		2: {
			bet: 3,
			taken: 3,
			score: 200,
			isSuccess: true,
		},
		3: {
			bet: 3,
			taken: 3,
			score: 200,
			isSuccess: true,
		},
	},
}

ScoreController.addRoundInfoToPlayerSet(newRound, irakli)

console.log(irakli)

const total = ScoreController.calculatePlayerSetTotal(irakli)

console.log('TOTAL IS', total)

const SetController = {
	isBonus(set: PlayerSetColumn): boolean {
		return Object.entries(set.rounds)
			.map(([key, value]) => value)
			.filter((result) => result)
			.every((result) => result!.bet === result!.taken)
	},
	isComplete(set: PlayerSetColumn): boolean {
		return Object.entries(set.rounds).every(([key, value]) => value)
	},
}

console.log('Does set have bonus?', SetController.isBonus(irakli))
console.log('Is set complete?', SetController.isComplete(irakli))

type GameState = {
	moment: {
		currentSet: SetID
		currentRound: RoundID
		currentTurn: PlayerPosition
	}
}

const myConfig: GameConfig = {
	penalty: -200,
	sets: [
		[1, 2, 3, 4],
		[9, 9, 9, 9],
		[4, 3, 2, 1],
		[9, 9, 9, 9],
	],
}

const myGame = new Game(myConfig)

myGame.printScore()

console.log()

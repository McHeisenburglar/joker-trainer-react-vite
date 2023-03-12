import { PlayerPosition } from '../player/Player.js'

type ScoreTableCell = {
	target: number
	taken: number
	score(): number
}

type ScoreTableRow = {
	[index in PlayerPosition]: ScoreTableCell
}

type NormalRoundNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
type NinesRoundNumber = 1 | 2 | 3 | 4

type RoundList = number[]

type GameSets = {
	[index: number]: RoundList
}

type ScoreTableBlock<RoundType extends NormalRoundNumber | NinesRoundNumber> = {
	[Round in RoundType]: ScoreTableRow
}

type ScoreTableBlockColumn<R extends NormalRoundNumber | NinesRoundNumber> = {
	[r in R]: ScoreTableCell
}

type NormalSetScoreTable = {
	[index in NormalRoundNumber]: ScoreTableRow
}
type NinesSetScoreTable = {
	[index in NinesRoundNumber]: ScoreTableRow
}

// RoundsInSet
// [1, 2, 3, 4, 5, 6, 7, 8]
// [9, 9, 9, 9]
// [8, 7, 6, 5, 4, 3, 2, 1]
// [9, 9, 9, 9]

// GameSets
const myVar = {
	1: [1, 2, 3, 4, 5, 6, 7, 8],
	2: [9, 9, 9, 9],
	3: [8, 7, 6, 5, 4, 3, 2, 1],
	4: [9, 9, 9, 9],
}

type SetID = number
type RoundID = number
type RoundsInSet = RoundID[]

type SetsInGame = {
	[index: SetID]: RoundsInSet
}

type RoundInfo = {
	type: 'nines'
	cardsPerPlayer: 1
	startingPlayer: 2
	trump: 'clubs'
	table: {
		1: {
			bet: 1
			taken: 2
		}
		2: {
			bet: 1
			taken: 2
		}
		3: {
			bet: 1
			taken: 2
		}
		4: {
			bet: 1
			taken: 2
		}
	}
}

const myGame = {
	setup: {
		players: {
			1: {
				name: 'Irakli',
				position: 1,
				score: 0,
				userId: 0,
			},
			2: {
				name: 'Dea',
				position: 2,
				score: 0,
				userId: 1,
			},
			3: {
				name: 'Mario',
				position: 2,
				score: 0,
				userId: 1,
			},
			4: {
				name: 'Shio',
				position: 2,
				score: 0,
				userId: 1,
			},
		},
	},
	sets: {
		1: {
			rounds: {
				0: {
					cardsPerPlayer: 1,
					startingPlayer: 2,
					trump: 'clubs',
					table: {
						1: {
							bet: 1,
							taken: 2,
						},
						2: {
							bet: 1,
							taken: 2,
						},
						3: {
							bet: 1,
							taken: 2,
						},
						4: {
							bet: 1,
							taken: 2,
						},
					},
				},
				1: {},
				2: {},
				3: {},
				4: {},
				5: {},
				6: {},
				7: {},
				8: {},
			},
			bonuses: [],
		},
	},
}

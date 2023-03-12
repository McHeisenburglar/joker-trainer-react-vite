/* Score table for full game */
type ScoreTable = {
	[set: SetID]: SetBlock | null
}

/* Score of one set (pulka) in a game*/
type SetBlock = {
	[player in PlayerPosition]: PlayerSetColumn | null
}

/* Score of a player in one set (pulka) */
type PlayerSetColumn = {
	rounds: {
		[index: RoundID]: PlayerRoundCell | null
	}
	bonus: number
	meta: {
		name?: string
		position?: PlayerPosition
	}
}

/* Score of a player in one round */
type PlayerRoundCell = {
	bet: number
	taken: number
	score: number
	isSuccess: boolean
}

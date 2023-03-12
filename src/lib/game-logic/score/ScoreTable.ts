export function generateSetBlock(rounds: number[]): SetBlock {
	const block = {} as SetBlock

	PLAYER_POSITIONS.forEach((pos: PlayerPosition) => {
		const set = generatePlayerSetColumn(rounds)
		set.meta.position = pos
		block[pos] = set
	})

	return block
}

export function generatePlayerSetColumn(rounds: number[]): PlayerSetColumn {
	const set: PlayerSetColumn = {} as PlayerSetColumn

	set.rounds = {}
	set.meta = {}
	set.bonus = 0

	rounds.forEach((round, index) => (set.rounds[index + 1] = null))

	return set
}

export function newScoreTable(sets: SetConfig): ScoreTable {
	const scoreTable = {} as ScoreTable

	sets.forEach((roundArr, index) => {
		const set = generateSetBlock(roundArr)
		scoreTable[index + 1] = set
	})

	function generateSetBlock(rounds: number[]): SetBlock {
		const block = {} as SetBlock

		PLAYER_POSITIONS.forEach((pos: PlayerPosition) => {
			const set = generatePlayerSet(rounds)
			set.meta.position = pos
			block[pos] = set
		})

		return block
	}

	function generatePlayerSet(rounds: number[]): PlayerSetColumn {
		const set: PlayerSetColumn = {} as PlayerSetColumn

		set.rounds = {}
		set.meta = {}
		set.bonus = 0

		rounds.forEach((round, index) => (set.rounds[index + 1] = null))

		return set
	}
	return scoreTable
}

type BonusType = null | 'double' | 'remove'

interface IPlayerRound {
	target: number
	reality: number
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

class PlayerRound implements IPlayerRound {
	target: number
	reality: number
	final: number
	constructor() {
		this.target = 0
		this.reality = 0
		this.final = 0
	}
}

interface IPlayerSetScore {
	roundScores: IPlayerRound[]
	get total(): number

	doubleHighest(): void
	removeHighest(): void
}

class PlayerSetScore implements IPlayerSetScore {
	roundScores: PlayerRound[]
	constructor() {
		this.roundScores = []
	}
	get total(): number {
		return this.roundScores.reduce((acc, curr) => acc + curr.final, 0)
	}
	private findHighest(): PlayerRound {
		return this.roundScores[0]
	}
	doubleHighest(): void {
		const roundScore = this.findHighest()
		// roundScore.bonus = 'double'
	}
	removeHighest(): void {
		const roundScore = this.findHighest()
		// roundScore.bonus = 'remove'
	}
}

interface ISetScore {
	playerScores: IPlayerSetScore[]
	complete: boolean
	bonuses: number[]
}

class SetScore implements ISetScore {
	playerScores: PlayerSetScore[]
	complete: boolean
	bonuses: number[]
	constructor() {
		this.playerScores = []
		this.complete = false
		this.bonuses = []
	}
}

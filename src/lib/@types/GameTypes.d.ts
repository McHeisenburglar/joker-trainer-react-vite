type SetID = number
type RoundID = number | string

type RoundConfig = {
	numOfCards: number
	options?: {
		[key: string]: any
	}
}

type SetConfig = number[][]

type GameConfig = {
	penalty: number
	sets: SetConfig
}

// export {}

// const PLAYER_POSITIONS = [0, 1, 2, 3] as const

// declare namespace Constants {
// 	const PLAYER_POSITIONS: [0, 1, 2, 3]
// }

type PlayerPosition = typeof Constants.PLAYER_POSITIONS[number]

type PlayerInfo = {
	name: string
	position?: PlayerPosition
	id?: string
}

type PlayerList = {
	[player in PlayerPosition]: PlayerInfo | null
}

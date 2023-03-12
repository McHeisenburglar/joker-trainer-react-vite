export function newPlayerList() {
	const list = {} as PlayerList

	PLAYER_POSITIONS.forEach((position) => {
		list[position] = null
	})

	return list
}

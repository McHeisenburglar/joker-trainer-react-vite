function cardValueOf(rank: Rank): number {
	switch (rank) {
		case '6':
			return 6
		case '7':
			return 7
		case '8':
			return 8
		case '9':
			return 9
		case '10':
			return 10
		case 'jack':
			return 11
		case 'queen':
			return 12
		case 'king':
			return 13
		case 'ace':
			return 14
	}
}
export function determineWinner(cards: Card[], trumpSuit?: Suit): number {
	let playedSuit =
		cards[0].type === 'regular'
			? (cards[0] as IRegularCard).suit
			: trumpSuit || 'hearts'
	let winnerIndex = 0
	let highestRank = -1

	for (let i = 0; i < cards.length; i++) {
		const card = cards[i]

		// Check if card is a Joker
		if (card.type === 'joker') {
			winnerIndex = i
			highestRank = highestRank + 100
			continue
		}

		const { suit, rank } = card as IRegularCard

		// Check if card is a trump
		const isTrump = suit === trumpSuit

		// Check if card is a higher rank in the played suit
		if (suit === playedSuit && cardValueOf(rank) > highestRank) {
			winnerIndex = i
			highestRank = cardValueOf(rank)
		}

		// Check if card is a higher rank in a trump suit
		if (isTrump && cardValueOf(rank) > highestRank) {
			winnerIndex = i
			highestRank = cardValueOf(rank)
			playedSuit = trumpSuit!
		}
	}

	return winnerIndex
}

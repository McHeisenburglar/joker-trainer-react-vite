export const isSameCard = (card1: Card, card2: Card) => {
	if (card1.type !== card2.type) return false
	if (card1.type === 'joker' && card2.type === 'joker') return true
	if (card1.type === 'regular' && card2.type === 'regular') {
		return card1.rank === card2.rank && card1.suit === card2.suit
	}
}

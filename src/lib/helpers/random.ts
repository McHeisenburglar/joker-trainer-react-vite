import { Deck as CardDeck } from '../game-logic/card/CardDeck'

export function shuffleAlg<T>(array: T[]): T[] {
	let currentIndex = array.length,
		randomIndex

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		// And swap it with the current element.
		;[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		]
	}

	return array
}

export function getRandomCard(): Card {
	const card = new CardDeck().shuffle().pop()
	return card
}

export function getRandomCards(numCards: number): IRegularCard[] {
	let deck = new CardDeck()
	deck.shuffle()

	const cards: IRegularCard[] = []
	let i = 0

	while (i < numCards) {
		try {
			const card = deck.pop()
			if (card.type === 'regular') {
				cards.push(card)
				i++
			}
		} catch (error) {
			deck = new CardDeck()
		}
	}

	return cards
}
type CardTable = {
	top: IRegularCard | null
	right: IRegularCard | null
	bottom: IRegularCard | null
	left: IRegularCard | null
}

export function getRandomCardTable(): CardTable {
	const cards = getRandomCards(4)
	return {
		top: cards[0],
		right: cards[1],
		bottom: cards[2],
		left: cards[3],
	}
}

export function getRandomElement<T>(arr: T[]): T {
	const randomIndex = Math.floor(Math.random() * arr.length)
	return arr[randomIndex]
}

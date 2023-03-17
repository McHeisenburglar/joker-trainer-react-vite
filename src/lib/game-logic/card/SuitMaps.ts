const SUIT_NAMES: CardMap<Suit, string> = {
	clubs: 'Clubs',
	hearts: 'Hearts',
	spades: 'Spades',
	diamonds: 'Diamonds',
}

const SUIT_EMOJIS: CardMap<Suit, string> = {
	clubs: '♣️',
	diamonds: '♦️',
	hearts: '❤️',
	spades: '♠️',
}

const SUIT_HTML: CardMap<Suit, string> = {
	clubs: '️&clubs;',
	hearts: '️&hearts;',
	spades: '️&spades;',
	diamonds: '️&diams;',
}

const SUIT_UNICODE: CardMap<Suit, string> = {
	clubs: '\u2663',
	hearts: '\u2665',
	spades: '\u2660',
	diamonds: '\u2666',
}

export default {
	SUIT_NAMES,
	SUIT_EMOJIS,
	SUIT_HTML,
	SUIT_UNICODE,
}

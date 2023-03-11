const SUIT_NAMES: CardMap<Suit, string> = {
	clubs: 'Clubs',
	hearts: 'Hearts',
	spades: 'Spades',
	diamonds: 'Diamonds',
}

const SUIT_EMOJIS: CardMap<Suit, string> = {
	clubs: '♣️',
	hearts: '♥️',
	spades: '♠️',
	diamonds: '♦️',
}

const SUIT_CODES: CardMap<Suit, string> = {
	clubs: '️&clubs;',
	hearts: '️&hearts;',
	spades: '️&spades;',
	diamonds: '️&diams;',
}

export default {
	SUIT_NAMES,
	SUIT_EMOJIS,
	SUIT_CODES,
}

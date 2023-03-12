// Card data
const RANKS = [
	'6',
	'7',
	'8',
	'9',
	'10',
	'jack',
	'queen',
	'king',
	'ace',
] as const
type Rank = typeof RANKS[number]

const SUITS = ['clubs', 'hearts', 'spades', 'diamonds'] as const
type Suit = typeof SUITS[number]

// const PLAYER_POSITIONS = [0, 1, 2, 3] as const
// type PlayerPosition = typeof PLAYER_POSITIONS[number]

// Card names
type CardMap<Keys extends Suit | Rank, Type> = {
	[key in Keys]: Type
}

// Game state
type SetID = number
type RoundID = number | string

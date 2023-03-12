import SuitMaps from './SuitMaps.js'
import RankMaps from './RankMaps.js'

export interface UISuitName {
	name: string
	emoji: string
	html: string
	unicode: string
}
export interface UIRankName {
	short: string
	normal: string
	long: string
}

export interface UICardName {
	html: string
	emoji: string
	normal: string
	full: string
	unicode: string
}

export class UICard {
	private _rank: Rank
	private _suit: Suit

	constructor(rank: Rank, suit: Suit) {
		this._rank = rank
		this._suit = suit
	}

	get value(): { suit: Suit; rank: Rank } {
		return {
			suit: this._suit,
			rank: this._rank,
		}
	}

	get suit(): UISuitName {
		return {
			name: SuitMaps.SUIT_NAMES[this._suit],
			emoji: SuitMaps.SUIT_EMOJIS[this._suit],
			html: SuitMaps.SUIT_HTML[this._suit],
			unicode: SuitMaps.SUIT_UNICODE[this._suit],
		}
	}

	get rank(): UIRankName {
		return {
			short: RankMaps.RANK_NAMES_SHORT[this._rank],
			normal: RankMaps.RANK_NAMES_NORMAL[this._rank],
			long: RankMaps.RANK_NAMES_LONG[this._rank],
		}
	}

	get name(): UICardName {
		return {
			normal: `${this.rank.normal} of ${this.suit.name}`,
			emoji: `${this.rank.short} ${this.suit.emoji}`,
			html: `${this.rank.short} ${this.suit.html}`,
			unicode: `${this.rank.short} ${this.suit.unicode}`,
			full: `${this.rank.long} of ${this.suit.name}`,
		}
	}

	get color(): string {
		if (this._suit === 'clubs' || this._suit === 'spades') return 'black'
		else return 'red'
	}
}

import { RankEnum, SuitEnum } from '../archive/card'

type MaybeRank = RankEnum | 'Joker'
type MaybeSuit = SuitEnum | 'Joker'

class NewCard {
	private _rank: MaybeRank
	private _suit: MaybeSuit

	constructor(rank: RankEnum | 'Joker', suit?: SuitEnum) {
		this._rank = rank
		this._suit = suit || 'Joker'
	}

	public get rank(): MaybeRank {
		return this._rank
	}
	public get suit(): MaybeSuit {
		return this._suit
	}
	public get isJoker() {
		return this._rank === 'Joker'
	}
}

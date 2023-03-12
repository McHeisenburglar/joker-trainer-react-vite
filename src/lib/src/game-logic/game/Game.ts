import * as ScoreService from '../score/ScoreTable.js'
import * as PlayerService from '../player/Player.js'

export class Game {
	private _scores: ScoreTable
	private _config: GameConfig
	private _players: PlayerList

	public constructor(config: GameConfig) {
		this._scores = {}
		this._config = { ...config }
		this._players = PlayerService.newPlayerList()
		this.init()
	}

	private init() {
		this.initScoreTable()
		this.initPlayersList()
	}

	private initScoreTable() {
		this._scores = ScoreService.newScoreTable(this._config.sets)
	}
	private initPlayersList() {
		this._players = PlayerService.newPlayerList()
	}

	private test() {
		console.log(this.score)
	}

	public printScore() {
		console.log(this._scores)
	}
	public get score(): ScoreTable {
		return this._scores
	}
}

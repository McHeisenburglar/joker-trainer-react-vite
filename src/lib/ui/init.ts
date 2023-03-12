import {
	Card,
	RankEnum,
	SuitEnum,
	Deck,
	RegularCard,
	JokerCard,
} from '../archive/card.js'
import { randomCard } from '../archive/index.js'

class Player {
	name: string
	hand: RegularCard[]
	constructor(name: string) {
		this.name = name
		this.hand = []
	}
	groupedHand(): RegularCard[] {
		return [...this.hand].sort((a, b) => b.suit - a.suit)
	}
}
// helpers
const SUIT_EMOJIS = ['♣️', '♥️', '♠️', '♦️']
const RANK_SHORT_NAME = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

// Components
const HandComponent = (player: Player, index: number) => {
	const { name } = player
	const el = document.createElement('div')
	el.classList.add('hand', 'outline', `position-${index}`)
	el.id = `position-${index}`
	const template = `
			<h3 class="player-name">${name}</h3>
			<ul class="card-list" id="cards-list-${name}"></ul>
	`
	el.innerHTML = template
	return el
}
const CardComponent = (rank: string, suit: string, playerPos?: number) => {
	const el = document.createElement('div')
	let cardId: string
	let template: string
	el.classList.add('card')
	if (playerPos !== undefined) el.classList.add(`player-${playerPos}`)
	if (rank && suit) {
		template = `
                <span class="rank">
                    ${suit}
                </span>
				<span class="suit">
                    ${rank}
                </span>
		`
		cardId = `${rank}-${suit}`
		el.classList.add(cardId)
	} else {
		template = `<span class="joker-span">Jok</span>`
		cardId = `joker`
		el.classList.add(cardId)
	}

	el.innerHTML = template
	el.addEventListener('click', () => {
		handleCardClick(cardId)
	})
	return el
}

function handleCardClick(cardId: string) {
	console.log(cardId)
}

const TableComponent = (): Element => {
	const el = document.createElement('div')
	el.classList.add('game-table-center')
	return el
}

class LogMessage {
	text: string
	state?: string
	constructor(text: string) {
		this.text = text
	}
}

function LogMessageComponent(msg: LogMessage): Element {
	const el = document.createElement('li')
	el.classList.add('dev-log-message', msg.state!)
	el.innerText = msg.text
	return el
}

function domID(id: string): Element | null {
	return document.getElementById(id)
}

// Initialize deck
const deck = new Deck()
deck.shuffle()

// Initialize players
// const PLAYER_NAMES = ['Irakli', 'Dea', 'Maka', 'Giorgi']
// const players: Player[] = []

// PLAYER_NAMES.forEach((name) => {
// 	players.push(new Player(name))
// })

function renderUI(game: Game) {
	const { players } = game
	// Render
	function initializeUI() {
		const TEST_DIV = document.getElementById('test-div')
		players.forEach((player, index) => {
			TEST_DIV!.appendChild(HandComponent(player, index))
		})
		TEST_DIV!.appendChild(TableComponent())
	}
	initializeUI()
}

const LOG: LogMessage[] = []

function renderRound(game: Game) {
	const { players } = game
	function displayAllCards() {
		players.forEach((player, index) => {
			displayCardsForPlayer(player, index)
		})
	}

	function displayCardsForPlayer(player: Player, playerPos: number) {
		const cards = player.hand
		const parentEl = document.getElementById(`cards-list-${player.name}`)!
		parentEl.innerHTML = ''
		cards.forEach((c) => {
			const rank = RANK_SHORT_NAME[c.rank]
			const suit = SUIT_EMOJIS[c.suit]
			const component = CardComponent(rank, suit, playerPos)
			parentEl!.appendChild(component)
		})
	}

	function displayTrump() {
		const trump = game.round!.trump!

		const trumpEl = domID('trump-card')!
		trumpEl.innerHTML = ''

		let rank: string = ''
		let suit: string = ''
		if (trump instanceof RegularCard) {
			rank = RANK_SHORT_NAME[trump.rank]
			suit = SUIT_EMOJIS[trump.suit]
		}
		const component = CardComponent(rank, suit)
		trumpEl.appendChild(component)
	}

	displayAllCards()
	displayTrump()
}

function clearLog(): void {
	const list = domID('dev-log-list')!
	list.innerHTML = ''
}

function refreshLog(): void {
	const list = domID('dev-log-list')!
	LOG.forEach((msg) => {
		const el = LogMessageComponent(msg)
		list.appendChild(el)
	})
}

class Game {
	players: Player[]
	round?: Round
	constructor() {
		this.players = []
	}
	private nextPos(pos: number): number {
		return (pos + 1) % 4
	}
	nextRound() {
		this.players.forEach((p) => (p.hand = []))
		if (!this.round) {
			this.round = new Round(1, 0, this)
			return
		} else {
			this.round = new Round(
				(this.round.roundNum + 1) % 9,
				this.nextPos(this.round.startingPlayer),
				this
			)
		}
	}
}

class Round {
	roundNum: number
	startingPlayer: number
	trump: Card | null
	gameObject: Game
	constructor(number: number, startingPlayer: number, gameObject: Game) {
		this.roundNum = number
		this.startingPlayer = startingPlayer
		this.trump = null
		this.gameObject = gameObject
	}
	init(): void {
		this.dealAndDetermineTrump()
	}
	dealAndDetermineTrump(): void {
		const deck = new Deck()
		deck.shuffle()
		for (let i = 0; i < this.roundNum; i++) {
			for (let j = 0; j < 4; j++) {
				const card = deck.dealTopCard()
				// this.gameObject.players[j].hand.push(card)
			}
		}
		this.trump = deck.dealTopCard()
	}
}

const myGame = new Game()
;['Irakli', 'Dea', 'Maka', 'Giorgi'].forEach((name) =>
	myGame.players.push(new Player(name))
)

const nextRound = document.getElementById('btn-next-round')
nextRound?.addEventListener('click', (e) => {
	e.preventDefault()
	myGame.nextRound()
	myGame.round!.init()
	renderRound(myGame)
	refreshTurnHighlight()
	// renderUI(myGame)
})
const clearLogBtn = document.getElementById('btn-clear-log')
clearLogBtn!.addEventListener('click', (e) => {
	e.preventDefault()
	clearLog()
})

function addBtnListener(id: string, callback: (e: Event) => void) {
	try {
		const button = domID(`btn-${id}`)!
		button.addEventListener('click', callback)
	} catch (e) {
		console.log("Couldn't find button")
	}
}

addBtnListener('pass-turn', (e: Event): void => {
	e.preventDefault()
})

renderUI(myGame)

myGame.nextRound()
function refreshTurnHighlight() {
	const currentTurn = myGame.round!.startingPlayer
	document
		.querySelectorAll('.current-turn')
		.forEach((el) => el.classList.remove('current-turn'))
	domID(`position-${currentTurn}`)!.classList.add('current-turn')
}

myGame.round!.init()
renderRound(myGame)

refreshTurnHighlight()
refreshLog()

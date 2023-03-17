import React, { useEffect, useState } from 'react'
import { useGame } from '../../hooks/useGame'
import { Deck as CardDeck } from '../../lib/game-logic/card/CardDeck'
import { getRandomCards } from '../../lib/helpers/random'
import Card from './Card'
import CardHand from './CardHand'
import CardTable from './CardTable'
import { GameContext } from '../../state/gameContext'
import { Game } from '../../lib/game-logic/game/Game'

class CardsInHand {
	private _cards: Card[]
	constructor() {
		this._cards = []
	}

	public addCard(card: Card) {
		this._cards.push(card)
	}
	public clear() {
		this._cards = []
	}

	public get cards() {
		return this._cards
	}
}

interface IGameState {
	currentPlayer: PlayerPosition
	tableCards: ICardTable
	trump?: Suit
}

const FourPlayerCardGame = () => {
	let currentPlayer: PlayerPosition = 0
	let tableCards: ICardTable = {
		0: null,
		1: null,
		2: null,
		3: null,
	}
	const [gameState, setGameState] = useState<IGameState>({
		currentPlayer: 0,
		tableCards: {
			0: null,
			1: null,
			2: null,
			3: null,
		},
	})

	const previousPlayer = () =>
		((getCurrentPlayer() + 4 - 1) % 4) as PlayerPosition
	const nextPlayer = () => ((getCurrentPlayer() + 1) % 4) as PlayerPosition

	const getCurrentPlayer: () => PlayerPosition = () => gameState.currentPlayer

	// let playedCard = tableCards[previousPlayer()]
	const playedCard: () => Card | null = () => getTableCards()[previousPlayer()]
	useEffect(() => {
		currentPlayer = gameState.currentPlayer
		tableCards = gameState.tableCards
		// playedCard = tableCards[previousPlayer()]
		console.log('new played card!', playedCard())
		console.log('table cards', tableCards)
	}, [gameState])

	const getTableCards: () => ICardTable = () => gameState.tableCards

	const setCurrentPlayer = (player: PlayerPosition) => {
		setGameState({
			...gameState,
			currentPlayer: player,
		})
	}

	const setTableCards = (cards: ICardTable) => {
		console.log('setting table cards', cards)
		setGameState((gameState) => {
			return {
				...gameState,
				tableCards: { ...cards },
			}
		})
	}

	const playCard = (card: Card, playerPos: PlayerPosition) => {
		const newTable = {
			...tableCards,
		}
		newTable[playerPos] = card
		const next = nextPlayer()
		setGameState({
			...gameState,
			currentPlayer: next,
			tableCards: newTable,
		})
	}

	const [deck, setDeck] = useState(new CardDeck())
	const [hands, setHands] = useState([
		new CardsInHand(),
		new CardsInHand(),
		new CardsInHand(),
		new CardsInHand(),
	])

	const [trumpSuit, setTrumpSuit] = useState<Suit>('hearts')

	const dealCards = () => {
		deck.reset()
		deck.shuffle()
		hands.forEach((hand) => {
			hand.clear()
			for (let i = 0; i < 9; i++) {
				const card = deck.pop()
				hand.addCard(card)
			}
		})
		setHands([...hands])
	}

	useEffect(() => {
		dealCards()
	}, [])

	const handleClick = (card: Card, playerPos: PlayerPosition) => {
		console.log('clicked', card)
		playCard(card, playerPos)
	}

	return (
		<GameContext.Provider value={{ state: gameState }}>
			<div className="game-container">
				<p>Current player: {currentPlayer}</p>
				<div className="card-hands-container">
					{!!playedCard() && <Card card={playedCard()!} />}
					<button onClick={dealCards}>Deal Cards</button>
					{hands.map((hand, index) => (
						<CardHand
							key={index}
							cards={hand.cards}
							trumpSuit={trumpSuit}
							playedCard={playedCard() || undefined}
							playerPos={index as PlayerPosition}
							onCardClick={handleClick}
						/>
					))}
				</div>
				<div className="card-table-container">
					<CardTable></CardTable>
				</div>
			</div>
		</GameContext.Provider>
	)
}

export default FourPlayerCardGame

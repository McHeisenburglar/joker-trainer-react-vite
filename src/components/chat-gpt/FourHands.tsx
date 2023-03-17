import React, { useEffect, useState } from 'react'
import { useGame } from '../../hooks/useGame'
import { Deck as CardDeck } from '../../lib/game-logic/card/CardDeck'
import { getRandomCards } from '../../lib/helpers/random'
import Card from './Card'
import CardHand from './CardHand'
import CardTable from './CardTable'

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

const FourPlayerCardGame = () => {
	const { state, setCurrentPlayer, setTableCards } = useGame()
	const { tableCards } = state
	const [deck, setDeck] = useState(new CardDeck())
	const [hands, setHands] = useState([
		new CardsInHand(),
		new CardsInHand(),
		new CardsInHand(),
		new CardsInHand(),
	])
	const [trumpSuit, setTrumpSuit] = useState(null)

	const previousPlayer = () =>
		((state.currentPlayer + 4 - 1) % 4) as PlayerPosition
	const nextPlayer = () => ((state.currentPlayer + 1) % 4) as PlayerPosition

	const playedCard = tableCards[previousPlayer()]

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
		const newTable = {
			...tableCards,
		}
		newTable[playerPos] = card
		setTableCards({
			...newTable,
		})
		setCurrentPlayer(nextPlayer())
		const playedCard = tableCards[previousPlayer()]
	}

	return (
		<div className="game-container">
			<div className="card-hands-container">
				{!!playedCard && <Card card={playedCard} />}
				<button onClick={dealCards}>Deal Cards</button>
				{hands.map((hand, index) => (
					<CardHand
						key={index}
						cards={hand.cards}
						trumpSuit={trumpSuit}
						playedCard={playedCard || undefined}
						playerPos={index as PlayerPosition}
						onCardClick={handleClick}
					/>
				))}
			</div>
			<div className="card-table-container">
				<CardTable></CardTable>
			</div>
		</div>
	)
}

export default FourPlayerCardGame

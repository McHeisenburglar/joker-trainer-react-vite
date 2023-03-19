import React, { useEffect, useState } from 'react'
import { Deck } from '../../lib/game-logic/card/CardDeck'
import CardTable from './CardTable'

import {
	allPlayableCards,
	CardsInHand,
	getPlayableCards,
	sortCards,
} from '../../lib/helpers/handHelpers'
import { isSameCard } from '../../lib/helpers/cardHelpers'
import CardRow from './CardRow'
import DevWindow from './DevWindow'
import CardHand from './CardHand'
import { getRandomElement } from '../../lib/helpers/random'

const blankTable = () => {
	return {
		0: null,
		1: null,
		2: null,
		3: null,
	}
}

const DemoGame: React.FC = () => {
	const [deck, setDeck] = useState<Deck>(new Deck())
	const [hands, setHands] = useState<CardsInHand[]>([])
	const [currentTurn, setCurrentTurn] = useState<PlayerPosition>(0)
	const [previousWinner, setPreviousWinner] = useState<PlayerPosition>(0)
	const [cardTable, setCardTable] = useState<ICardTable>(blankTable())

	useEffect(() => {
		deck.shuffle()
		const shuffledDeck = deck.shuffle()
		setDeck(shuffledDeck)
		dealCards()
	}, [])

	const dealCards = () => {
		const deck = new Deck()
		deck.shuffle()

		const hands = [
			new CardsInHand(),
			new CardsInHand(),
			new CardsInHand(),
			new CardsInHand(),
		]

		while (!deck.isEmpty()) {
			hands.forEach((hand) => {
				hand.addCard(deck.pop())
			})
		}

		setHands(hands)
	}

	const tableIsFull = () => {
		return Object.values(cardTable).every((card) => card !== null)
	}

	const playNextCard = () => {
		if (deck) {
			try {
				const card = deck.pop()
				const newCardTable = { ...cardTable }
				newCardTable[currentTurn] = card
				setCardTable(newCardTable)
				moveTurn()
				setDeck(deck)
			} catch (e) {
				return
			}
		}
	}

	const playCard = (card: Card) => {
		const newCardTable = { ...cardTable }
		newCardTable[currentTurn] = card
		setCardTable(newCardTable)
	}

	const moveTurn = () => {
		const nextTurn = ((currentTurn + 1) % 4) as PlayerPosition
		setCurrentTurn(nextTurn)
	}

	const clearTable = () => {
		setCardTable(blankTable())
	}

	const playerPlaysTurn = () => {
		const hand = hands[currentTurn]
		const playableCards = getPlayableCards(
			hand.cards,
			cardTable[previousWinner],
			null
		).filter((c) => c.playable)

		const cardToPlay = getRandomElement<Card>(playableCards)
		const newHand = new CardsInHand()
		hand.cards.forEach((card) => {
			if (!isSameCard(card, cardToPlay)) {
				newHand.addCard(card)
			}
		})
		const newHands = [...hands]
		newHands[currentTurn] = newHand

		setHands(newHands)
		playCard(cardToPlay)
	}

	const nextMove = () => {
		if (tableIsFull()) {
			clearTable()
		} else {
			playerPlaysTurn()
			moveTurn()
			// playNextCard()
		}
	}

	return (
		<div>
			{hands.map((hand, i) => {
				return (
					<div className="card-row">
						<span className={`${i === currentTurn ? 'highlight' : ''}`}>
							{i}
						</span>
						<CardRow cards={hand.cards} key={i} />
					</div>
				)
			})}
			<div className="card-table-container">
				<CardTable cards={cardTable} />
			</div>
			{/* {deck && <CardRow cards={deck.cards} />} */}
			<DevWindow>
				<button onClick={nextMove}>Play Next Card</button>
			</DevWindow>
		</div>
	)
}

export default DemoGame

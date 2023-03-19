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
import { determineWinner } from '../../lib/game-logic/round/DetermineWinner'
import SuitCard from './SuitCard'
import useUpdateEffect from '../../hooks/useUpdateEffect'

const blankTable = () => {
	return {
		0: null,
		1: null,
		2: null,
		3: null,
	}
}

const DemoGame: React.FC = () => {
	const [hands, setHands] = useState<CardsInHand[]>([])
	const [currentTurn, setCurrentTurn] = useState<PlayerPosition>(0)
	const [previousWinner, setPreviousWinner] = useState<PlayerPosition>(0)
	const [cardTable, setCardTable] = useState<ICardTable>(blankTable())
	const [trumpSuit, setTrumpSuit] = useState<Suit | null>(null)

	useEffect(() => {
		startGame()
	}, [])

	const startGame = () => {
		dealCards()
		setRandomTrump()
	}

	const playedCard = () => {
		return cardTable[previousWinner]
	}

	const setRandomTrump = () => {
		const trumpSuit = getRandomElement<Suit>([
			'spades',
			'hearts',
			'clubs',
			'diamonds',
		])
		setTrumpSuit(trumpSuit)
	}

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
	const tableIsEmpty = () => {
		return Object.values(cardTable).every((card) => card === null)
	}

	const playCardOnTable = (card: Card) => {
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

	const randomPlayerTurn = () => {
		const cardToPlay = getRandomCardForPlayer(currentTurn)
		playerPlaysCard(currentTurn, cardToPlay)
		playCardOnTable(cardToPlay)
	}

	const getRandomCardForPlayer = (player: PlayerPosition) => {
		const hand = hands[currentTurn]
		const playableCards = getPlayableCards(
			hand.cards,
			playedCard(),
			trumpSuit
		).filter((c) => c.playable)
		const cardToPlay = getRandomElement<Card>(playableCards)
		return cardToPlay
	}

	const playerPlaysCard = (player: PlayerPosition, card: Card) => {
		const hand = hands[player]
		const newHand = new CardsInHand()
		hand.cards.forEach((c) => {
			if (!isSameCard(c, card)) {
				newHand.addCard(c)
			}
		})
		const newHands = [...hands]
		newHands[currentTurn] = newHand
		setHands(newHands)
	}

	const nextMove = () => {
		if (hands.every((hand) => hand.cards.length === 0)) {
			startGame()
		} else {
			randomPlayerTurn()
		}
	}

	useUpdateEffect(() => {
		if (tableIsFull()) {
			setTimeout(() => {
				const cardTableArray = Object.values(cardTable) as Card[]
				const winner = determineWinner(cardTableArray) as PlayerPosition
				setPreviousWinner(winner)
				setCurrentTurn(winner)
				clearTable()
			}, 1000)
		} else if (!tableIsEmpty()) {
			moveTurn()
		}
	}, [cardTable])

	const handleCardClick = (card: Card, player: PlayerPosition) => {
		playerPlaysCard(player, card)
		playCardOnTable(card)
	}

	const [isPlaying, setIsPlaying] = useState(false)
	const autoPlay = () => {}

	return (
		<div>
			{trumpSuit && (
				<DevWindow position="top-left">
					<SuitCard suit={trumpSuit} />
				</DevWindow>
			)}
			<div className="card-table-window">
				<CardTable cards={cardTable} />
			</div>
			<DevWindow position="bottom-left">
				{hands.map((hand, index) => {
					return (
						<div className="player-hand-row tiny">
							<span className={`${index === currentTurn ? 'highlight' : ''}`}>
								{index}
							</span>
							<CardHand
								key={index}
								cards={hand.cards}
								myTurn={currentTurn === index}
								trumpSuit={trumpSuit}
								playedCard={playedCard()}
								onCardClick={(card) =>
									handleCardClick(card, index as PlayerPosition)
								}
							/>
							{/* <CardRow cards={hand.cards} key={i} /> */}
						</div>
					)
				})}
			</DevWindow>
			{/* {deck && <CardRow cards={deck.cards} />} */}
			<DevWindow position="top-right">
				<button onClick={nextMove}>Play Next Card</button>
				<button onClick={autoPlay}>Start auto-play</button>
			</DevWindow>
		</div>
	)
}

export default DemoGame

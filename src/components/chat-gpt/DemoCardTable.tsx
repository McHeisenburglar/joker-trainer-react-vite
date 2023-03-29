import { useEffect, useRef, useState } from 'react'
import { Deck } from '../../lib/game-logic/card/CardDeck'
import {
	getRandomCard,
	getRandomCards,
	getRandomElement,
} from '../../lib/helpers/random'
import CardTable from './CardTable'
import DevWindow from './DevWindow'
import CardFanWithProps from './CardFanWithProps'
import CardFan from './CardFan'
import { isSameCard } from '../../lib/helpers/cardHelpers'
import { sortCards } from '../../lib/helpers/handHelpers'

const blankTable = () => {
	return {
		0: null,
		1: null,
		2: null,
		3: null,
	}
}

const sampleTable = () => {
	const table: ICardTable = {
		0: {
			suit: 'spades',
			rank: 'ace',
			type: 'regular',
		},
		1: {
			suit: 'hearts',
			rank: 'queen',
			type: 'regular',
		},
		2: {
			type: 'joker',
			id: 'joker1',
		},
		3: {
			suit: 'clubs',
			rank: 'king',
			type: 'regular',
		},
	}
	return table
}

const randomTable: () => ICardTable = () => {
	const table: ICardTable = blankTable()
	table[0] = getRandomCard()
	table[1] = getRandomCard()
	table[2] = getRandomCard()
	table[3] = getRandomCard()
	return table
}

const DemoCardTable: React.FC = () => {
	const deck = useRef(new Deck().shuffle())
	const [cardTable, setCardTable] = useState<ICardTable>(blankTable())
	const [currentTurn, setCurrentTurn] = useState<PlayerPosition>(0)

	const newSortedHand = () => {
		const newHand = new Deck().shuffle().deal(10)
		const sorted = sortCards(newHand)
		return sorted
	}

	const myHandRef = useRef(newSortedHand())
	const [myHand, setMyHand] = useState(myHandRef.current)

	const playCardOnTable = (card: Card, pos: PlayerPosition) => {
		const newCardTable = { ...cardTable }
		newCardTable[pos] = card
		setCardTable(newCardTable)
	}

	const tableIsFull = () => {
		return Object.values(cardTable).every((card) => card !== null)
	}
	const tableIsEmpty = () => {
		return Object.values(cardTable).every((card) => card === null)
	}

	const next = () => {
		if (tableIsFull()) {
			clearTable()
		} else {
			playRandomCard(currentTurn)
			moveTurn()
		}
	}

	const moveTurn = () => {
		const nextTurn = ((currentTurn + 1) % 4) as PlayerPosition
		setCurrentTurn(nextTurn)
	}

	const playRandomCard = (pos: PlayerPosition) => {
		const cardToPlay = getRandomElement(deck.current.cards)
		playCardOnTable(cardToPlay, pos)
	}

	const clearTable = () => {
		setCardTable(blankTable())
	}

	const fillTable = () => {
		setCardTable(randomTable())
	}

	const fillSampleTable = () => {
		setCardTable(sampleTable())
	}

	const handleCardClick = (card: Card) => {
		playCardOnTable(card, 2)
		removeCardFromHand(card)
	}

	const removeCardFromHand = (card: Card) => {
		const newHand = myHandRef.current.filter((c) => !isSameCard(c, card))
		myHandRef.current = newHand
		setMyHand(newHand)
	}

	const handleDealClick = () => {
		const newHand = newSortedHand()
		// console.log('ayy')
		myHandRef.current = newHand
		setMyHand(newHand)
	}

	const goesToPlayer = (pos: PlayerPosition) => {
		clearTable()
		// return
	}

	return (
		<div className="demo-card-table">
			<CardTable cards={cardTable} startingPlayer={0} />
			<DevWindow position="bottom-left">
				<div className="section">
					<button onClick={next}>Next</button>
					{['top', 'right', 'bottom', 'left'].map((position, index) => {
						const pos = index as PlayerPosition
						return (
							<button onClick={() => playRandomCard(pos)} key={position}>
								{position}
							</button>
						)
					})}
				</div>
				<div className="section">
					<button onClick={clearTable}>Clear table</button>
					<button onClick={fillTable}>Fill table</button>
					<button onClick={fillSampleTable}>Sample</button>
				</div>
				<div>
					<h3>Goes to player:</h3>
					{['top', 'right', 'bottom', 'left'].map((position, index) => {
						const pos = index as PlayerPosition
						return (
							<button onClick={() => goesToPlayer(pos)} key={position}>
								{position}
							</button>
						)
					})}
				</div>
			</DevWindow>
			{/* <CardFan onCardClick={handleCardClick} /> */}
			<CardFanWithProps
				cards={myHand}
				onCardClick={handleCardClick}
				onDealClick={handleDealClick}
			/>
		</div>
	)
}

export default DemoCardTable

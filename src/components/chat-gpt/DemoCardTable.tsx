import { useRef, useState } from 'react'
import { Deck } from '../../lib/game-logic/card/CardDeck'
import { getRandomElement } from '../../lib/helpers/random'
import CardTable from './CardTable'
import DevWindow from './DevWindow'
import CardFan from './CardFan'

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

const DemoCardTable: React.FC = () => {
	const deck = useRef(new Deck().shuffle())
	const [cardTable, setCardTable] = useState<ICardTable>(blankTable())
	const [currentTurn, setCurrentTurn] = useState<PlayerPosition>(0)

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

	const handleCardClick = (card: Card) => {
		playCardOnTable(card, 2)
	}

	return (
		<div className="demo-card-table">
			<CardTable cards={cardTable} startingPlayer={0} />
			<DevWindow position="bottom-left">
				<button onClick={next}>Next</button>
				{['top', 'right', 'bottom', 'left'].map((position, index) => {
					const pos = index as PlayerPosition
					return (
						<button onClick={() => playRandomCard(pos)} key={position}>
							{position}
						</button>
					)
				})}
				<button onClick={clearTable}>Clear table</button>
			</DevWindow>
			<CardFan onCardClick={handleCardClick} />
		</div>
	)
}

export default DemoCardTable

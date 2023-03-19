import { useRef, useState } from 'react'
import { Deck } from '../../lib/game-logic/card/CardDeck'
import { getRandomElement } from '../../lib/helpers/random'
import CardTable from './CardTable'
import DevWindow from './DevWindow'

const blankTable = () => {
	return {
		0: null,
		1: null,
		2: null,
		3: null,
	}
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

	return (
		<div>
			<CardTable cards={cardTable} />
			<DevWindow position="bottom-left">
				<button onClick={next}>Next</button>
				{['top', 'right', 'bottom', 'left'].map((position, index) => {
					const pos = index as PlayerPosition
					return <button onClick={() => playRandomCard(pos)}>{position}</button>
				})}
			</DevWindow>
		</div>
	)
}

export default DemoCardTable

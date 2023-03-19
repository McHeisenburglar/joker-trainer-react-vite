import React, { useEffect, useState } from 'react'
import { Deck } from '../../lib/game-logic/card/CardDeck'
import CardTable from './CardTable'

import {
	allPlayableCards,
	getPlayableCards,
	sortCards,
} from '../../lib/helpers/handHelpers'
import CardRow from './CardRow'

const DemoGame: React.FC = () => {
	const [deck, setDeck] = useState<Deck | null>(null)
	useEffect(() => {
		const deck = new Deck()
		deck.shuffle()
		setDeck(deck)

		const card = deck.pop()
		const newCardTable = {
			...cardTable,
		}
		newCardTable[currentTurn] = card

		setDeck(deck)
		setCardTable(newCardTable)
	}, [])
	const [currentTurn, setCurrentTurn] = useState<PlayerPosition>(0)
	const [cardTable, setCardTable] = useState<ICardTable>({
		0: null,
		1: null,
		2: null,
		3: null,
	})
	const [playedCard, setPlayedCard] = useState<Card | null>(null)

	return (
		<div>
			<CardTable cards={cardTable} />
			{deck && <CardRow cards={deck.cards} />}
		</div>
	)
}

export default DemoGame

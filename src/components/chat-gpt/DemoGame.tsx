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
	const [deck, setDeck] = useState<Deck>(new Deck())
	useEffect(() => {
		deck.shuffle()
		setDeck(deck)
	}, [])
	const [currentTurn, setCurrentTurn] = useState(0)
	const [cardTable, setCardTable] = useState<ICardTable>({
		0: null,
		1: null,
		2: null,
		3: null,
	})
	const [playedCard, setPlayedCard] = useState<Card | null>(null)

	return (
		<div>
			{/* <CardTable cards={cardTable} /> */}
			<CardRow cards={deck.cards} />
		</div>
	)
}

export default DemoGame

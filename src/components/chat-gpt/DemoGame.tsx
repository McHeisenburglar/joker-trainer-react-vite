import React, { useEffect, useState } from 'react'
import { Deck } from '../../lib/game-logic/card/CardDeck'
import CardTable from './CardTable'

import {
	allPlayableCards,
	getPlayableCards,
	sortCards,
} from '../../lib/helpers/handHelpers'
import CardRow from './CardRow'
import DevWindow from './DevWindow'

const DemoGame: React.FC = () => {
	const [deck, setDeck] = useState<Deck>(new Deck())
	useEffect(() => {
		// const deck = new Deck()
		// deck.shuffle()
		// const shuffledDeck = deck.shuffle()
		// setDeck(shuffledDeck)
		playNextCard()
	}, [])
	const [currentTurn, setCurrentTurn] = useState<PlayerPosition>(0)
	const [cardTable, setCardTable] = useState<ICardTable>({
		0: null,
		1: null,
		2: null,
		3: null,
	})
	const [playedCard, setPlayedCard] = useState<Card | null>(null)

	const playNextCard = () => {
		if (deck) {
			const card = deck.pop()
			const newCardTable = {
				...cardTable,
			}
			newCardTable[currentTurn] = card

			const nextTurn = ((currentTurn + 1) % 4) as PlayerPosition
			setCurrentTurn(nextTurn)
			setDeck(deck)
			setCardTable(newCardTable)
		}
	}

	return (
		<div>
			<CardTable cards={cardTable} />
			{deck && <CardRow cards={deck.cards} />}
			<DevWindow>
				<button onClick={playNextCard}>Play Next Card</button>
			</DevWindow>
		</div>
	)
}

export default DemoGame

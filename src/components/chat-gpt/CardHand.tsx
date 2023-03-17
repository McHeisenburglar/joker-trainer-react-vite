import React from 'react'
import { useGame } from '../../hooks/useGame'
import {
	allPlayableCards,
	getPlayableCards,
	sortCards,
} from '../../lib/helpers/handHelpers'
import Card from './Card'

type CardHandProps = {
	cards: Card[]
	playedCard?: Card
	trumpSuit: Suit | null
	playerPos: PlayerPosition
	onCardClick: (card: Card, playerPos: PlayerPosition) => void
}

const CardHand: React.FC<CardHandProps> = ({
	cards,
	playedCard,
	trumpSuit,
	playerPos,
	onCardClick,
}) => {
	const sortedCards = sortCards(cards)
	const playableCards = playedCard
		? getPlayableCards(sortedCards, playedCard, trumpSuit)
		: allPlayableCards(sortedCards)

	const { state } = useGame()
	const myTurn = state.currentPlayer === playerPos

	const handleCardClick = (card: Card) => {
		onCardClick(card, playerPos)
	}

	return (
		<ul className="card-hand shown">
			{playerPos}
			{playableCards.map((card, index) => (
				<li key={index} className="card-hand-item">
					{myTurn ? (
						<Card
							card={card}
							playable={card.playable}
							disabled={!card.playable}
							onClickCallback={() => handleCardClick(card)}
						/>
					) : (
						<Card card={card} />
					)}
				</li>
			))}
		</ul>
	)
}

export default CardHand

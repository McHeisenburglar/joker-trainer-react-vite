import React, { useEffect } from 'react'
import { useGame } from '../../hooks/useGame'
import {
	allPlayableCards,
	getPlayableCards,
	sortCards,
} from '../../lib/helpers/handHelpers'
import Card from './Card'

type CardHandProps = {
	cards: Card[]
	playedCard?: Card | null
	trumpSuit: Suit | null
	myTurn: boolean
	onCardClick: (card: Card) => void
}

const CardHand: React.FC<CardHandProps> = ({
	cards,
	playedCard,
	trumpSuit,
	myTurn,
	onCardClick,
}) => {
	const sortedCards = sortCards(cards)
	const playableCards = playedCard
		? getPlayableCards(sortedCards, playedCard, trumpSuit)
		: allPlayableCards(sortedCards)

	const handleCardClick = (card: Card) => {
		onCardClick(card)
	}

	return (
		<ul className="card-hand shown">
			{playableCards.map((card, index) => (
				<li key={index} className="card-hand-item">
					{myTurn ? (
						<Card
							card={card}
							playable={card.playable}
							disabled={!card.playable}
							onClick={() => handleCardClick(card)}
						/>
					) : (
						<Card card={card} disabled={true} />
					)}
				</li>
			))}
		</ul>
	)
}

export default CardHand

import '../../scss/card-fan.scss'
import React, { useRef, useState, useEffect } from 'react'
import { Deck } from '../../lib/game-logic/card/CardDeck'
import Card from './Card'
import HiddenCard from './HiddenCard'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import DevWindow from './DevWindow'
import { isSameCard } from '../../lib/helpers/cardHelpers'
import { sortCards } from '../../lib/helpers/handHelpers'

interface CardFanProps {
	cards: Card[]
	onCardClick?: (card: Card) => void
	onDealClick?: () => void
}

const CardFanWithProps: React.FC<CardFanProps> = ({
	cards,
	onCardClick,
	onDealClick,
}) => {
	const [isSpreading, setIsSpreading] = React.useState(true)
	const nodeRef = useRef(null)

	// const [sortedCards, setSortecCards] = useState(sortCards(cards))

	// useEffect(() => {
	// 	const sorted = sortCards(cards)
	// 	setSortecCards(sorted)
	// }, [cards])

	const toggle = () => {
		setIsSpreading(!isSpreading)
	}

	const handleCardClick = (card: Card) => {
		if (onCardClick) {
			onCardClick(card)
		}
	}

	const handleDealClick = () => {
		if (onDealClick) {
			onDealClick()
		}
	}

	return (
		<div className="card-fan-container">
			<CSSTransition
				in
				appear
				nodeRef={nodeRef}
				timeout={1500}
				onEntered={() => {
					setIsSpreading(false)
				}}
			>
				<div
					ref={nodeRef}
					className={`card-fan ${isSpreading ? 'spread' : ''} card-count-${
						cards.length
					}`}
				>
					{cards.map((card, index) => (
						/* <HiddenCard /> */
						<Card
							card={card}
							key={JSON.stringify(card)}
							onClick={handleCardClick}
							className={`card-${index + 1}-in-fan`}
						/>
					))}
				</div>
			</CSSTransition>
			<DevWindow position="bottom-right">
				<button onClick={toggle}>Spread: {JSON.stringify(isSpreading)}</button>
				<button onClick={handleDealClick}>Deal again</button>
			</DevWindow>
		</div>
	)
}

export default CardFanWithProps

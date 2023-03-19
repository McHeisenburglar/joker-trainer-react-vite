import '../../scss/card-fan.scss'
import React, { useRef, useState, useEffect } from 'react'
import { Deck } from '../../lib/game-logic/card/CardDeck'
import Card from './Card'
import HiddenCard from './HiddenCard'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import DevWindow from './DevWindow'
import { isSameCard } from '../../lib/helpers/cardHelpers'

interface CardFanProps {
	onCardClick?: (card: Card) => void
}

const CardFan: React.FC<CardFanProps> = ({ onCardClick }) => {
	const [isSpreading, setIsSpreading] = React.useState(true)
	const cardsRef = useRef(new Deck().shuffle().deal(10))
	const nodeRef = useRef(null)

	const [cards, setCards] = useState(cardsRef.current)

	useEffect(() => {
		setCards(cardsRef.current)
	}, [])

	const toggle = () => {
		setIsSpreading(!isSpreading)
	}

	const redeal = () => {
		cardsRef.current = new Deck().shuffle().deal(10)
		setCards(cardsRef.current)
	}

	const handleCardClick = (card: Card) => {
		if (onCardClick) {
			console.log('hello')
			onCardClick(card)
		}
		const newCards = cards.filter((c) => !isSameCard(c, card))
		cardsRef.current = newCards
		setCards(cardsRef.current)
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
				<button onClick={redeal}>Deal again</button>
			</DevWindow>
		</div>
	)
}

export default CardFan

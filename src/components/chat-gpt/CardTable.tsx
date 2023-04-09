import '../../scss/card-table.scss'
import '../../scss/effects.scss'
import React, { useEffect } from 'react'
import {
	CSSTransition,
	SwitchTransition,
	TransitionGroup,
} from 'react-transition-group'
import Card from './Card'
import CardSlot from './CardSlot'

type CardTableProps = {
	cards: ICardTable
	startingPlayer?: PlayerPosition
	exitDirection?: 'top' | 'right' | 'bottom' | 'left' | null
}

const CardTable: React.FC<CardTableProps> = ({
	cards,
	startingPlayer,
	exitDirection,
}) => {
	console.log(exitDirection)
	const positions = ['top', 'right', 'bottom', 'left']
	return (
		<div className="card-table card-table-animated">
			{positions.map((position, index) => {
				const playerPos = index as PlayerPosition
				const card = cards[playerPos]

				const zIndexClass =
					startingPlayer !== undefined
						? `z-index-${(startingPlayer + (4 - playerPos)) % 4}`
						: ''

				return (
					<div
						className={`card-table-item ${position} ${!card ? 'under' : ''} ${
							card ? zIndexClass : ''
						}`}
						key={position}
					>
						<TransitionGroup>
							<CSSTransition
								key={JSON.stringify(card)}
								in={!!card}
								timeout={3000}
								className={`animated-card ${
									exitDirection ? `goes-${exitDirection}` : 'fade'
								}`}
							>
								{card ? <Card card={card} /> : <CardSlot />}
							</CSSTransition>
						</TransitionGroup>
					</div>
				)
			})}
		</div>
	)
}

export default CardTable

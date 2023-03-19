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
import { start } from 'repl'

type CardTableProps = {
	cards: ICardTable
	startingPlayer?: PlayerPosition
}

const CardTable: React.FC<CardTableProps> = ({ cards, startingPlayer }) => {
	const ref = React.useRef<HTMLDivElement>(null)
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
								timeout={1000}
								className="animated-card"
							>
								{card ? (
									<Card
										card={card}
										className={`${
											card.type === 'regular' ? 'golden-shine' : ''
										}`}
									/>
								) : (
									<CardSlot />
								)}
							</CSSTransition>
						</TransitionGroup>
					</div>
				)
			})}
		</div>
	)
}

export default CardTable

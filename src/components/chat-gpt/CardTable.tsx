import '../../scss/card-table.scss'
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
}

const CardTable: React.FC<CardTableProps> = ({ cards }) => {
	const positions = ['top', 'right', 'bottom', 'left']
	return (
		<div className="card-table card-table-animated">
			{positions.map((position, index) => {
				const playerPos = index as PlayerPosition
				const card = cards[playerPos]
				const placeholder: Card = {
					type: 'regular',
					rank: 'ace',
					suit: 'spades',
				}
				return (
					<div
						className={`card-table-item ${position} ${!card && 'under'}`}
						key={position}
					>
						{/* <SwitchTransition mode="out-in"> */}
						<TransitionGroup>
							<CSSTransition
								key={JSON.stringify(card)}
								in={!!card}
								timeout={1000}
								className="my-node"
							>
								{card ? <Card card={card} /> : <CardSlot />}
							</CSSTransition>
						</TransitionGroup>
						{/* <CardSlot /> */}
						{/* </SwitchTransition> */}
					</div>
				)
			})}
		</div>
	)
}

export default CardTable

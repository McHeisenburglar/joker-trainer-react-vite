import React, { useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
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
				return (
					<div
						className={`card-table-item ${position} ${
							!cards[playerPos] ? 'under' : ''
						}`}
					>
						{card ? <Card card={card} /> : <CardSlot />}
					</div>
				)
			})}
		</div>
	)
}

export default CardTable

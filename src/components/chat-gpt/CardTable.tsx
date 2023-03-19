import React from 'react'
import Card from './Card'
import { useGame } from '../../hooks/useGame'
import { GameContext } from '../../state/gameContext'
import CardSlot from './CardSlot'

type CardTableProps = {
	cards: ICardTable
}

const CardTable: React.FC<CardTableProps> = ({ cards }) => {
	// const { tableCards } = React.useContext(GameContext).state
	// const cards = tableCards
	return (
		<div className="card-table">
			<div className={`card-table-item top ${!cards[0] ? 'under' : ''}`}>
				{cards[0] ? <Card card={cards[0]} /> : <CardSlot />}
			</div>
			<div className={`card-table-item right ${!cards[1] ? 'under' : ''}`}>
				{cards[1] ? <Card card={cards[1]} /> : <CardSlot />}
			</div>
			<div className={`card-table-item bottom ${!cards[2] ? 'under' : ''}`}>
				{cards[2] ? <Card card={cards[2]} /> : <CardSlot />}
			</div>
			<div className={`card-table-item left ${!cards[3] ? 'under' : ''}`}>
				{cards[3] ? <Card card={cards[3]} /> : <CardSlot />}
			</div>
		</div>
	)
}

export default CardTable

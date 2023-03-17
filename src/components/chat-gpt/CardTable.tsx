import React from 'react'
import Card from './Card'
import { useGame } from '../../hooks/useGame'

type CardTableProps = {
	cards?: ICardTable
}

const CardTable: React.FC<CardTableProps> = () => {
	const cards = useGame().tableCards
	return (
		<div className="card-table">
			<div className="card-table-item top">
				{cards[0] ? <Card card={cards[0]} /> : null}
			</div>
			<div className="card-table-item right">
				{cards[1] ? <Card card={cards[1]} /> : null}
			</div>
			<div className="card-table-item bottom">
				{cards[2] ? <Card card={cards[2]} /> : null}
			</div>
			<div className="card-table-item left">
				{cards[3] ? <Card card={cards[3]} /> : null}
			</div>
		</div>
	)
}

export default CardTable

import React from 'react'
import CardRow from './CardRow'

const CardGrid = () => {
	return (
		<div className="card-row-grid">
			<CardRow suit="hearts" />
			<CardRow suit="diamonds" />
			<CardRow suit="spades" />
			<CardRow suit="clubs" />
		</div>
	)
}

export default CardGrid

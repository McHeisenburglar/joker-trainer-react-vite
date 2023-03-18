import React from 'react'
import CardRow from './CardRow'

type SelectableCard = IRegularCard & {
	selected: boolean
}
interface CardGridProps {
	selectedCards: CardMap<Suit, SelectableCard[]>
}

const CardGrid: React.FC<CardGridProps> = ({ selectedCards }) => {
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

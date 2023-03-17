import React from 'react'
import Card from './Card'

type CardTableProps = {
	cards: {
		top: IRegularCard
		right: IRegularCard
		bottom: IRegularCard
		left: IRegularCard
	}
}

const CardTable: React.FC<CardTableProps> = ({ cards }) => {
	return (
		<div className="card-table">
			<div className="card-table-item top">
				{cards.top ? (
					<Card rank={cards.top.rank} suit={cards.top.suit} />
				) : null}
			</div>
			<div className="card-table-item left">
				{cards.left ? (
					<Card rank={cards.left.rank} suit={cards.left.suit} />
				) : null}
			</div>
			<div className="card-table-item right">
				{cards.right ? (
					<Card rank={cards.right.rank} suit={cards.right.suit} />
				) : null}
			</div>
			<div className="card-table-item bottom">
				{cards.bottom ? (
					<Card rank={cards.bottom.rank} suit={cards.bottom.suit} />
				) : null}
			</div>
		</div>
	)
}

export default CardTable

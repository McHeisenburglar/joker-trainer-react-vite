import React from 'react'
import Card from './Card'

type CardHandProps = {
	cards: IRegularCard[]
}

const CardHand: React.FC<CardHandProps> = ({ cards }) => {
	return (
		<ul className="card-hand">
			{cards.map((card, i) => (
				<li key={i} className="card-hand-item">
					<Card rank={card.rank} suit={card.suit} />
				</li>
			))}
		</ul>
	)
}

export default CardHand

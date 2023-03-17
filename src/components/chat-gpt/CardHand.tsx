import React from 'react'
import Card from './Card'

type CardHandProps = {
	cards: IRegularCard[]
}

const CardHand: React.FC<CardHandProps> = ({ cards }) => {
	return (
		<ul className="card-hand shown">
			{cards.map((card, index) => (
				<li key={index} className="card-hand-item">
					<Card {...card} />
				</li>
			))}
		</ul>
	)
}

export default CardHand

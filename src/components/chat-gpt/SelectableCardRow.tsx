import React, { useMemo } from 'react'
import { useState } from 'react'
import SuitCard from './SuitCard'
import Card from './Card'
import { Deck } from '../../lib/game-logic/card/CardDeck'

interface CardRowProps {
	cards: SelectableCard[]
	onClick: (card: SelectableCard) => void
}

type SelectableCard = IRegularCard & {
	selected: boolean
}

const SelectableCardRow: React.FC<CardRowProps> = ({ cards, onClick }) => {
	return (
		<div className="card-row">
			<ul className="card-row-list horizontal-list">
				{cards.map((card, index) => (
					<li
						key={index}
						className={`card-row-item selectable ${
							card.selected ? 'selected' : 'deselected'
						}`}
						onClick={() => onClick(card)}
					>
						<Card card={card} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default SelectableCardRow

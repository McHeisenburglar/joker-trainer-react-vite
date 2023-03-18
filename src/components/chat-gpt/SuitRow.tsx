import React, { useMemo } from 'react'
import { useState } from 'react'
import SuitCard from './SuitCard'
import Card from './Card'
import { Deck } from '../../lib/game-logic/card/CardDeck'

interface CardRowProps {
	suit: Suit
}

const SuitRow: React.FC<CardRowProps> = ({ suit }) => {
	const [selectedCount, setSelectedCount] = useState(0)

	const suitCount = suit === 'hearts' || suit === 'diamonds' ? 9 : 8
	const suitCards = new Array(suitCount).fill(null)

	const handleClick = (index: number) => {
		console.log(index)
		setSelectedCount(index)
	}

	return (
		<div className="card-row">
			<ul className={`card-row-list horizontal-list `}>
				<li
					className={`card-row-item none-selected selectable ${
						selectedCount === 0 ? 'selected' : ''
					}`}
					onClick={() => handleClick(0)}
				>
					<SuitCard suit={suit} />
				</li>
				{suitCards.map((_, index) => {
					return (
						<li
							key={index + 1}
							className={`card-row-item selectable ${
								selectedCount >= index + 1 ? 'selected' : ''
							}`}
							onClick={() => handleClick(index + 1)}
						>
							<SuitCard suit={suit} />
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default SuitRow

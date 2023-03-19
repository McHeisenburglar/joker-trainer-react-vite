import { useState } from 'react'
import { Deck } from '../../lib/game-logic/card/CardDeck'
import CardGrid from './CardGrid'

function CardRowGame() {
	return (
		<div className="center-content full-screen">
			<div className="card-grid-game">
				<CardGrid />
				<div className="button-bar">
					<button>Select all</button>
					<button>Start Game</button>
				</div>
			</div>
		</div>
	)
}

export default CardRowGame

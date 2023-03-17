import React from 'react'
import { createContext, useState } from 'react'

// Define the shape of the game state
interface GameState {
	tableCards: ICardTable
	currentPlayer: PlayerPosition
	trump?: Suit
}

// Define a default value for the game state
const defaultGameState: GameState = {
	tableCards: {
		0: null,
		1: null,
		2: null,
		3: null,
	},
	currentPlayer: 0,
}

// Create the context object for the game state
export const GameContext = createContext<GameState>(defaultGameState)

interface ChildrenProps {
	children: React.ReactNode
}

export const GameProvider: React.FC<ChildrenProps> = ({ children }) => {
	const [gameState, setGameState] = useState<GameState>(defaultGameState)

	// Define functions for updating the game state
	const setTableCards = (cards: ICardTable) => {
		setGameState({ ...gameState, tableCards: cards })
	}

	const setCurrentPlayer = (player: PlayerPosition) =>
		setGameState({ ...gameState, currentPlayer: player })

	const setTrump = (suit: Suit) => setGameState({ ...gameState, trump: suit })

	// Create an object with the functions for updating the game state
	const gameActions = {
		setTableCards,
		setCurrentPlayer,
		setTrump,
	}

	return (
		<GameContext.Provider value={{ ...gameState, ...gameActions }}>
			{children}
		</GameContext.Provider>
	)
}

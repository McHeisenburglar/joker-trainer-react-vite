import { createContext } from 'react'

interface IGameContext {
	state: {
		currentPlayer: PlayerPosition
		tableCards: ICardTable
		trump?: Suit
	}
}
export const GameContext = createContext<IGameContext>({
	state: {
		currentPlayer: 0,
		tableCards: {
			0: null,
			1: null,
			2: null,
			3: null,
		},
	},
})

// // Define the shape of the game state
// interface GameState {
// 	tableCards: ICardTable
// 	currentPlayer: PlayerPosition
// 	trump?: Suit
// }

// interface GameContextType {
// 	state: GameState
// 	setTableCards: (cards: ICardTable) => void
// 	setCurrentPlayer: (player: PlayerPosition) => void
// 	setTrump: (suit: Suit) => void
// }

// // Define a default value for the game state
// const defaultGameState: GameState = {
// 	tableCards: {
// 		0: null,
// 		1: null,
// 		2: null,
// 		3: null,
// 	},
// 	currentPlayer: 0,
// }

// // Create the context object for the game state
// export const GameContext = createContext<GameContextType>({
// 	state: defaultGameState,
// 	setTableCards: () => {},
// 	setCurrentPlayer: () => {},
// 	setTrump: () => {},
// })

// interface ChildrenProps {
// 	children: React.ReactNode
// }

// export const GameProvider: React.FC<ChildrenProps> = ({ children }) => {
// 	const [gameState, setGameState] = useState<GameState>(defaultGameState)

// 	// Define functions for updating the game state
// 	const setTableCards = (cards: ICardTable) => {
// 		setGameState({ ...gameState, tableCards: cards })
// 	}

// 	const setCurrentPlayer = (player: PlayerPosition) =>
// 		setGameState({ ...gameState, currentPlayer: player })

// 	const setTrump = (suit: Suit) => setGameState({ ...gameState, trump: suit })

// 	// Create an object with the functions for updating the game state
// 	const gameActions = {
// 		setTableCards,
// 		setCurrentPlayer,
// 		setTrump,
// 	}

// 	return (
// 		<GameContext.Provider value={{ state: gameState, ...gameActions }}>
// 			{children}
// 		</GameContext.Provider>
// 	)
// }

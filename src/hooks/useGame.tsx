import { useContext } from 'react'
import { GameContext } from '../state/gameContext'

export const useGame = () => useContext(GameContext)

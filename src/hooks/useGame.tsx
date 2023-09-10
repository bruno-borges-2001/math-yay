import { GAME_DIFFICULTY, GAME_MODE } from "@/types/game";
import { createContext, useContext, useState } from "react";

interface GameContextProps {
  gamemode: GAME_MODE
  setGamemode: (mode: GAME_MODE) => void

  gameDifficulty: GAME_DIFFICULTY
  setGameDifficulty: (difficulty: GAME_DIFFICULTY) => void
}

const GameContext = createContext({} as GameContextProps)

export function GameProvider({ mode, children }: { mode: GAME_MODE, children: React.ReactNode }) {
  const [gamemode, setGamemode] = useState(mode)
  const [gameDifficulty, setGameDifficulty] = useState(GAME_DIFFICULTY.MEDIUM)

  return (
    <GameContext.Provider value={{ gamemode, setGamemode, gameDifficulty, setGameDifficulty }}>
      {children}
    </GameContext.Provider>
  )
}

export default function useGame() {
  return useContext(GameContext)
}
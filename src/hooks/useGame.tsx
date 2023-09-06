import { GAME_MODE } from "@/types/game";
import { createContext, useContext, useState } from "react";

interface GameContextProps {
  gamemode: GAME_MODE
  setGamemode: (mode: GAME_MODE) => void
}

const GameContext = createContext({} as GameContextProps)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gamemode, setGamemode] = useState(GAME_MODE.NORMAL)

  return (
    <GameContext.Provider value={{ gamemode, setGamemode }}>
      {children}
    </GameContext.Provider>
  )
}

export default function useGame() {
  return useContext(GameContext)
}
'use client'

import { GAME_MODE, GAME_STATE, OperationReturn } from "@/types/game"
import { useEffect, useState } from "react"
import Round from "./round"
import useGame, { GameProvider } from "@/hooks/useGame"
import { Button } from "../ui/button"

interface GameProps {
  onReset: () => void
}

function Game({ onReset }: GameProps) {
  const { gamemode } = useGame()

  const [gameState, setGameState] = useState(GAME_STATE.UNSTARTED)

  const [round, setRound] = useState(1)

  // answers
  const [correctAnswers, setCorrectAnswers] = useState<OperationReturn[]>([])
  const [incorrectAnswers, setIncorrectAnswers] = useState<OperationReturn[]>([])
  const [skippedAnswers, setSkippedAnswers] = useState<OperationReturn[]>([])

  useEffect(() => {
    if (gamemode === GAME_MODE.UNLIMITED) return;

    if (round > 20) {
      setGameState(GAME_STATE.FINISHED)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamemode, round])

  const UPDATE_FUNCTIONS = {
    correct: setCorrectAnswers,
    incorrect: setIncorrectAnswers,
    skipped: setSkippedAnswers
  }

  const handleNextRound = (result: keyof typeof UPDATE_FUNCTIONS) => (operation: OperationReturn) => {
    UPDATE_FUNCTIONS[result](prev => [...prev, operation])
    setRound(prev => prev + 1)
  }

  switch (gameState) {
    case GAME_STATE.UNSTARTED:
      return (
        <div>
          <Button variant="primary" size="lg" onClick={() => setGameState(GAME_STATE.IN_PROGRESS)}>Start Game</Button>
        </div>
      )
    case GAME_STATE.IN_PROGRESS:
      return (
        <div>
          <Round
            key={round}
            round={round}
            onCorrect={handleNextRound('correct')}
            onIncorrect={handleNextRound('incorrect')}
            onSkip={handleNextRound('skipped')}
          />
          {gamemode === GAME_MODE.UNLIMITED && <Button variant="primary" onClick={() => setGameState(GAME_STATE.FINISHED)}>End Game</Button>}
        </div>
      )
    case GAME_STATE.FINISHED:
      return (
        <div>
          <Button variant="primary" onClick={onReset}>Restart</Button>
        </div>
      )
  }
}

export default function GameWrapper() {
  const [key, setKey] = useState('')

  return (
    <GameProvider>
      <Game key={key} onReset={() => setKey(String(Date.now))} />
    </GameProvider>
  )
}
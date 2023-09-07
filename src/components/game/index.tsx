'use client'

import useGame, { GameProvider } from "@/hooks/useGame"
import { NORMAL_MODE_ROUNDS } from "@/lib/constants/game"
import { DetailedResult, GAME_MODE, GAME_STATE, OperationReturn, PossibleResult, RoundResult } from "@/types/game"
import { useEffect, useMemo, useState } from "react"
import { Button } from "../ui/button"
import ResultList from "./resultList"
import Round from "./round"

interface GameProps {
  onReset: () => void
}
function Game({ onReset }: GameProps) {
  const { gamemode } = useGame()

  const [gameState, setGameState] = useState(GAME_STATE.UNSTARTED)

  const [round, setRound] = useState(1)

  // answers
  const [correctAnswers, setCorrectAnswers] = useState<DetailedResult[]>([])
  const [incorrectAnswers, setIncorrectAnswers] = useState<DetailedResult[]>([])
  const [skippedAnswers, setSkippedAnswers] = useState<DetailedResult[]>([])

  const answersByRound: RoundResult[] = useMemo(() => {
    const allAnswers: RoundResult[] = [...correctAnswers, ...incorrectAnswers, ...skippedAnswers]

    if (gamemode === GAME_MODE.NORMAL && allAnswers.length < NORMAL_MODE_ROUNDS) {
      const remainingAnswers: RoundResult[] = new Array(NORMAL_MODE_ROUNDS - allAnswers.length)
        .fill(0)
        .map((_, i) => ({ round: i + allAnswers.length + 1 }))

      allAnswers.push(...remainingAnswers)
    }

    if (gamemode === GAME_MODE.UNLIMITED) {
      allAnswers.push({ round: allAnswers.length + 1 })
    }

    return allAnswers.sort((a, b) => a.round - b.round)
  }, [gamemode, correctAnswers, incorrectAnswers, skippedAnswers])

  console.log(answersByRound)

  useEffect(() => {
    if (gamemode === GAME_MODE.UNLIMITED) return;

    if (round > 20) {
      setGameState(GAME_STATE.FINISHED)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamemode, round])

  const UPDATE_FUNCTIONS: Record<PossibleResult, React.Dispatch<React.SetStateAction<DetailedResult[]>>> = {
    correct: setCorrectAnswers,
    incorrect: setIncorrectAnswers,
    skipped: setSkippedAnswers
  }

  const handleNextRound = (result: PossibleResult) => (operation: OperationReturn) => {
    UPDATE_FUNCTIONS[result](prev => [...prev, { ...operation, round, answer: result }])
    setRound(prev => prev + 1)
  }

  const renderState = () => {
    switch (gameState) {
      case GAME_STATE.UNSTARTED:
        return (
          <div>
            <Button variant="primary" size="lg" onClick={() => setGameState(GAME_STATE.IN_PROGRESS)}>Start Game</Button>
          </div>
        )
      case GAME_STATE.IN_PROGRESS:
        return (
          <div >
            <Round
              key={round}
              round={round}
              onCorrect={handleNextRound('correct')}
              onIncorrect={handleNextRound('incorrect')}
              onSkip={handleNextRound('skipped')}
            />
            {gamemode === GAME_MODE.UNLIMITED && (
              <div className="flex flex-col justify-center items-center mt-2">
                <Button variant="primary" className="max-w-[120px]" onClick={() => setGameState(GAME_STATE.FINISHED)}>End Game</Button>
              </div>
            )}
            <div className="fixed bottom-0 left-[50%] translate-x-[-50%] max-w-[85vw] py-2">
              <ResultList results={answersByRound} />
            </div>
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

  return (
    <>
      {renderState()}
    </>
  )
}

export default function GameWrapper() {
  const [key, setKey] = useState('')

  return (
    <GameProvider>
      <Game key={key} onReset={() => setKey(String(Date.now))} />
    </GameProvider>
  )
}
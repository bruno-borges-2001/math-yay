'use client'

import useGame, { GameProvider } from "@/hooks/useGame"
import { NORMAL_MODE_ROUNDS } from "@/lib/constants/game"
import { DetailedResult, GAME_MODE, GAME_STATE, OperationReturn, PossibleResult, RoundResult } from "@/types/game"
import { LayoutGroup } from "framer-motion"
import { ElementRef, useEffect, useMemo, useRef, useState } from "react"
import Timer from "../general/timer"
import { Button } from "../ui/button"
import ResultList from "./resultList"
import Round from "./round"

interface GameProps {
  onReset: () => void
}

function Game({ onReset }: GameProps) {
  const timerRef = useRef<ElementRef<typeof Timer>>(null)

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

  useEffect(() => {
    if (gamemode === GAME_MODE.UNLIMITED) return;

    document.getElementById(`round-${round}`)?.scrollIntoView({ behavior: 'smooth', inline: 'end', block: 'end' })

    if (round > 20) {
      setGameState(GAME_STATE.FINISHED)
      timerRef.current?.stopTimer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamemode, round])

  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      timerRef.current?.startTimer()
    }
  }, [gameState])

  // useEffect(() => {
  //   switch (gameState) {
  //     case GAME_STATE.IN_PROGRESS:
  //       startTimer()
  //     case GAME_STATE.FINISHED:
  //       stopTimer()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [gameState])

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
            <Button variant="primary" size="lg" onClick={() => {
              setGameState(GAME_STATE.IN_PROGRESS)
            }}>Start Game</Button>
          </div>
        )
      case GAME_STATE.IN_PROGRESS:
        return (
          <div>
            <div className="flex justify-center mb-2">
              <Timer key="timer" ref={timerRef} />
            </div>

            <Round
              key={round}
              round={round}
              onCorrect={handleNextRound('correct')}
              onIncorrect={handleNextRound('incorrect')}
              onSkip={handleNextRound('skipped')}
            />
            {gamemode === GAME_MODE.UNLIMITED && (
              <div className="flex flex-col justify-center items-center mt-2">
                <Button variant="primary" onClick={() => {
                  setGameState(GAME_STATE.FINISHED)
                  timerRef.current?.stopTimer()
                }}>End Game</Button>
              </div>
            )}
            <div className="fixed bottom-0 left-[50%] translate-x-[-50%] max-w-[85vw] py-2">
              <ResultList results={answersByRound} singleLine />
            </div>
          </div>
        )
      case GAME_STATE.FINISHED:
        return (
          <div>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-center">Congratulations, you completed the challenge in</p>
              <Timer key="timer" ref={timerRef} />
              <p className="text-center">You can check your results below</p>
            </div>

            <section className="max-w-[80vw] md:max-w-[450px] relative my-4">
              <ResultList results={answersByRound} />
            </section>

            <div className="flex flex-col justify-center items-center ">
              <Button variant="primary" onClick={onReset}>Restart</Button>
            </div>
          </div>
        )
    }
  }

  return (
    <LayoutGroup>
      {renderState()}
    </LayoutGroup>
  )
}

export default function GameWrapper() {
  const [key, setKey] = useState('')

  return (
    <GameProvider>
      <Game key={key} onReset={() => setKey(String(Date.now()))} />
    </GameProvider>
  )
}
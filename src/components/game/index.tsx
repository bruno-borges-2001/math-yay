'use client'

import useGame, { GameProvider } from "@/hooks/useGame"
import { NORMAL_MODE_ROUNDS } from "@/lib/constants/game"
import { DetailedResult, GAME_MODE, GAME_STATE, OperationReturn, RESULT_STATUS, RoundResult } from "@/types/game"
import { LayoutGroup } from "framer-motion"
import { ElementRef, useEffect, useMemo, useRef, useState } from "react"
import Timer from "../general/timer"
import { Button } from "../ui/button"
import GameDifficultySelect from "./gameDifficultySelect"
import ResultList from "./resultList"
import Round from "./round"
import ShareResultButton from "./shareResultButton"

interface GameProps {
  onReset: () => void
}

function Game({ onReset }: GameProps) {
  const timerRef = useRef<ElementRef<typeof Timer>>(null)

  const { gamemode } = useGame()

  const [gameState, setGameState] = useState(GAME_STATE.UNSTARTED)

  const [answers, setAnswers] = useState<DetailedResult[]>([])

  const round = answers.length + 1

  const answersByRound: RoundResult[] = useMemo(() => {
    const allAnswers: RoundResult[] = [...answers]

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
  }, [gamemode, answers])

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

  const handleNextRound = (result: RESULT_STATUS) => (operation: OperationReturn) => {
    setAnswers(prev => [...prev, { ...operation, round, answer: result }])
  }

  const renderState = () => {
    switch (gameState) {
      case GAME_STATE.UNSTARTED:
        return (
          <div className="flex flex-col items-center text-center">
            <div className="fixed top-8">
              <GameDifficultySelect />
            </div>

            <h1 className="text-5xl font-black">Welcome to Math! Yay!</h1>
            <h2 className="text-xl font-semibold mt-4 mb-8">Solve the math questions the fastest you can</h2>

            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setGameState(GAME_STATE.IN_PROGRESS)
              }}
            >
              Start Game
            </Button>

            <p className="text-lg mt-8">{gamemode === GAME_MODE.NORMAL ? 'There will be 20 questions for you to solve in the least time possible' : 'Try to answer as many questions as you want, when you\'re finished just click the End Game button'}</p>
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
              onCorrect={handleNextRound(RESULT_STATUS.CORRECT)}
              onIncorrect={handleNextRound(RESULT_STATUS.INCORRECT)}
              onSkip={handleNextRound(RESULT_STATUS.SKIPPED)}
            />

            {gamemode === GAME_MODE.UNLIMITED && (
              <div className="flex flex-col justify-center items-center mt-2">
                <Button
                  variant="primary"
                  onClick={() => {
                    setGameState(GAME_STATE.FINISHED)
                    timerRef.current?.stopTimer()
                  }}
                >
                  End Game
                </Button>
              </div>
            )}

            <div className="fixed bottom-0 left-[50%] translate-x-[-50%] max-w-[85vw] py-2 z-[-1]">
              <ResultList results={answersByRound} inGameMode />
            </div>
          </div>
        )
      case GAME_STATE.FINISHED:
        return (
          <div>
            <div className="flex flex-col items-center justify-center gap-2 text-lg text-center">
              <p>Congratulations, you completed the challenge in</p>
              <Timer key="timer" ref={timerRef} />
              <p>You can check your results below</p>
            </div>

            <section className="max-w-[80vw] md:max-w-[450px] relative my-4 z-0">
              <ResultList results={answersByRound} />
            </section>

            <div className="flex flex-col justify-center items-center">
              <ShareResultButton results={answersByRound} time={timerRef.current?.timerValue ?? ''} />
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

export default function GameWrapper({ mode = GAME_MODE.NORMAL }: { mode: GAME_MODE }) {
  const [key, setKey] = useState('')

  return (
    <GameProvider mode={mode}>
      <Game key={key} onReset={() => setKey(String(Date.now()))} />
    </GameProvider>
  )
}
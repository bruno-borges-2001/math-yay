import { GAME_MODE, RESULT_STATUS, RoundResult } from "@/types/game"
import { BsCheckCircleFill, BsFillSkipEndCircleFill, BsFillXCircleFill } from 'react-icons/bs'

import useGame from "@/hooks/useGame"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef } from "react"
import './resultList.styles.css'

interface ResultListProps {
  results: RoundResult[]
  inGameMode?: boolean
}

interface ResultItemProps {
  result: RoundResult
}

function ResultItem({ result }: ResultItemProps) {
  const { gamemode } = useGame()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (gamemode === GAME_MODE.NORMAL) return;
    ref?.current?.scrollIntoView({ behavior: 'smooth', inline: 'end', block: 'end' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderResult = (answer?: RESULT_STATUS) => {
    if (answer === undefined) return null;

    switch (answer) {
      case RESULT_STATUS.CORRECT: return <BsCheckCircleFill color="green" />
      case RESULT_STATUS.INCORRECT: return <BsFillXCircleFill color="red" />
      case RESULT_STATUS.SKIPPED: return <BsFillSkipEndCircleFill color="gray" />
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="result-container"
      id={`round-${result.round}`}
    >
      <div className="round-content">{result.round}</div>
      <div className="round-content">{renderResult(result.answer)}</div>
    </motion.div>
  )
}

export default function ResultList({ results, inGameMode = false }: ResultListProps) {
  return (
    <AnimatePresence>
      <motion.article layout className={cn("general-container results-wrapper", { "w-min": inGameMode, "detailed-results-wrapper": !inGameMode })} layoutId="result-list">
        {results.map(result => <ResultItem key={result.round} result={result} />)}
      </motion.article>
    </AnimatePresence>
  )
}
import { PossibleResult, RoundResult } from "@/types/game"
import { BsCheckCircleFill, BsFillSkipEndCircleFill, BsFillXCircleFill } from 'react-icons/bs'

import { AnimatePresence, motion } from "framer-motion"
import './resultList.styles.css'

interface ResultListProps {
  results: RoundResult[]
}

export default function ResultList({ results }: ResultListProps) {

  const renderResult = (answer?: PossibleResult) => {
    if (!answer) return null;

    switch (answer) {
      case 'correct': return <BsCheckCircleFill color="green" />
      case 'incorrect': return <BsFillXCircleFill color="red" />
      case 'skipped': return <BsFillSkipEndCircleFill color="gray" />
    }
  }

  return (
    <AnimatePresence>
      <motion.article layout className="results-wrapper">
        {results.map(result => (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            key={result.round} className="result-container">
            <div className="round-content">{result.round}</div>
            <div className="round-content">{renderResult(result.answer)}</div>
          </motion.div>
        ))}
      </motion.article>
    </AnimatePresence>
  )
}
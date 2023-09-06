'use client'

import { generate } from "@/lib/game/generate";
import { GAME_DIFFICULTY, OperationReturn } from "@/types/game";
import { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from "@/components/ui/input";


interface RoundProps {
  round: number;
  onCorrect: (operation: OperationReturn) => void;
  onIncorrect: (operation: OperationReturn) => void;
  onSkip: (operation: OperationReturn) => void;

  forcedOperation?: OperationReturn
}

type Form = {
  answer: string
}

export default function Round({ forcedOperation, round = 0, onCorrect, onIncorrect, onSkip }: RoundProps) {
  const [operationData] = useState(forcedOperation ?? generate(GAME_DIFFICULTY.EASY, round))
  const { operands, operation, result } = operationData

  const { register, handleSubmit } = useForm<Form>()

  const onSubmit: SubmitHandler<Form> = ({ answer }) => {
    if (!answer) {
      onSkip(operationData)
      return;
    }

    const _answer = parseFloat(answer.replace(',', '.'))

    if (_answer === result) {
      onCorrect(operationData)
    } else {
      onIncorrect(operationData)
    }
  }

  const renderOperation = () => {
    switch (operation) {
      case 'sqrt':
        return (
          <>
            √{operands[0]}
          </>
        )
      case '**':
        return (
          <>
            {operands[0]}<span className="absolute text-sm">{operands[1]}</span>
          </>
        )
      default:
        return (
          <>
            {operands[0]} {operation} {operands[1]}
          </>
        )
    }
  }

  return (
    <form className="flex flex-col items-center max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl">Round {round}</h1>
      <h3 className="relative text-3xl my-10">{renderOperation()}</h3>
      <Input
        autoFocus
        autoComplete="off"
        pattern="[0-9.,]*"
        placeholder="Your answer"
        {...register('answer')}
      />
      <p className="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">Type your answer and press enter to submit your answer</p>
    </form>
  )
}
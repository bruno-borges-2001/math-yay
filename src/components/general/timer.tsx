'use client'

import useTimer from "@/hooks/useTimer"
import { forwardRef, memo, useImperativeHandle, useMemo } from "react"

interface TimerRef {
  startTimer: () => void
  stopTimer: () => number
  timerValue: string
}


const Timer = forwardRef<TimerRef>((_, ref) => {
  const { timerValue, startTimer, stopTimer } = useTimer()

  const parsedValue = useMemo(() => {
    try {
      const milisecondString = String(timerValue % 1000).padStart(3, '0')
      const seconds = timerValue / 1000

      const minuteString = String(Math.floor(seconds / 60)).padStart(2, '0')
      const secondString = String(Math.floor(seconds % 60)).padStart(2, '0')

      return `${minuteString}:${secondString}:${milisecondString}`
    } catch {
      return '00:00:000'
    }
  }, [timerValue])

  useImperativeHandle(ref, () => ({
    startTimer,
    stopTimer,
    timerValue: parsedValue
  }))

  return <div className="general-container w-32 text-center">{parsedValue}</div>
})

Timer.displayName = 'Timer'

export default memo(Timer)
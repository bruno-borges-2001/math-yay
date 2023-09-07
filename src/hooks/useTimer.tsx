'use client'

import { useCallback, useRef, useState } from "react";

export default function useTimer() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [timerStart, setTimerStart] = useState(0)
  const [timerValue, setTimerValue] = useState(0)

  const updateTimerValue = useCallback((start: number) => {
    timeoutRef.current = setInterval(() => {
      setTimerValue(Date.now() - start)
    }, 100)
  }, [])

  const startTimer = useCallback(() => {
    if (timeoutRef.current) return;
    const now = Date.now()

    setTimerStart(now)
    setTimerValue(0)

    updateTimerValue(now)
  }, [updateTimerValue])

  const getDetailedTimer = useCallback(() => {
    return Date.now() - timerStart
  }, [timerStart])

  const stopTimer = useCallback(() => {
    if (!timeoutRef.current) return 0

    clearTimeout(timeoutRef.current)
    timeoutRef.current = null

    return getDetailedTimer()
  }, [getDetailedTimer])

  return { timerValue, startTimer, stopTimer, getDetailedTimer }
}
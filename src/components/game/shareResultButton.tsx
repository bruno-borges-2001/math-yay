import useGame from "@/hooks/useGame"
import { GAME_DIFFICULTY, GAME_MODE, RESULT_STATUS, RoundResult } from "@/types/game"
import { usePathname } from "next/navigation"
import { FaTwitter } from 'react-icons/fa'
import { Button } from "../ui/button"

function getTwitterHref(url: string, text: string) {
  const shareUrl = new URL('https://twitter.com/intent/tweet')
  const search = new URLSearchParams({ url, text }).toString()

  shareUrl.search = search

  return shareUrl.href
}

function buildTweetText(results: RoundResult[], gamemode: GAME_MODE, difficulty: GAME_DIFFICULTY, time: string) {
  const answeredResults = results.filter(el => el.answer !== undefined)
  const correctAnswersCount = answeredResults.filter(el => el.answer === RESULT_STATUS.CORRECT).length

  return `Hey everyone! Check it out!\n\nI am playing Math! Yay! and just answered ${correctAnswersCount} out of ${answeredResults.length} questions correctly in ${time} playing the ${gamemode} mode (${difficulty.toUpperCase()}). It was super fun!\n\nYou can try it for yourself here:\n`
}

interface ShareResultButtonProps {
  time: string;
  results: RoundResult[]
}

export default function ShareResultButton({ time, results }: ShareResultButtonProps) {
  const { gamemode, gameDifficulty } = useGame()

  const pathname = usePathname()
  console.log(pathname)

  const text = buildTweetText(results, gamemode, gameDifficulty, time)
  const shareHref = getTwitterHref(process.env.NEXT_PUBLIC_BASE_URL + pathname, text)

  return (
    <Button asChild className="my-3 gap-2 !bg-[#1DA1F2] !text-offwhite hover:brightness-110"><a href={shareHref} target="_blank">Share your Results on Twitter<FaTwitter /></a></Button>
  )
}
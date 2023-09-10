import useGame from "@/hooks/useGame";
import { GAME_DIFFICULTY } from "@/types/game";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function GameDifficultySelect() {
  const { gameDifficulty, setGameDifficulty } = useGame()

  const difficulties = Object.values(z.nativeEnum(GAME_DIFFICULTY).enum)

  return (
    <Select value={gameDifficulty} onValueChange={setGameDifficulty}>
      <SelectTrigger className="w-[180px] capitalize">
        <SelectValue placeholder="Game Difficulty" />
      </SelectTrigger>
      <SelectContent>
        {difficulties.map(el => <SelectItem key={el} value={el} className="capitalize">{el}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}
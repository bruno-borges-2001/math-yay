import GameWrapper from '@/components/game'
import { GAME_MODE } from '@/types/game'

export default function Home() {
  return (
    <div className='p-6'>
      <GameWrapper mode={GAME_MODE.UNLIMITED} />
    </div>
  )
}

import GameWrapper from '@/components/game'
import { OPEN_GRAPH_METADATA, TWITTER_METADATA } from '@/lib/constants'
import { GAME_MODE } from '@/types/game'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Math! Yay! - Unlimited Mode',

  openGraph: {
    ...OPEN_GRAPH_METADATA,
    title: 'Math! Yay! - Unlimited Mode'
  },

  twitter: {
    ...TWITTER_METADATA,
    title: 'Math! Yay! - Unlimited Mode'
  }
}

export default function Home() {
  return (
    <div className='p-6'>
      <GameWrapper mode={GAME_MODE.UNLIMITED} />
    </div>
  )
}

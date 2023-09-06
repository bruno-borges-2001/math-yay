import SignIn from '@/components/auth/SignIn'
import GameWrapper from '@/components/game'
import ModeToggle from '@/components/ui/modeToggle'

export default function Home() {
  return (
    <div className='w-[100vw] h-[100vh] grid place-items-center'>
      <div className='fixed top-3 right-3'>
        <ModeToggle />
      </div>
      <div className='fixed top-3 left-3'>
        <SignIn />
      </div>

      <div className='p-6'>
        <GameWrapper />
      </div>
    </div>
  )
}

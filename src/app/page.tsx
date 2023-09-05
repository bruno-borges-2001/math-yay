import SignIn from '@/components/auth/SignIn'
import ModeToggle from '@/components/ui/modeToggle'

export default function Home() {
  return (
    <div>
      <div className='fixed top-3 right-3'>
        <ModeToggle />
      </div>
      <SignIn />
    </div>
  )
}

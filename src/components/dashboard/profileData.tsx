import { useEffect, useState } from 'react'
import { BsCheck2 } from 'react-icons/bs'
import { PiCopySimpleThin } from 'react-icons/pi'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { useToast } from '../ui/use-toast'

interface ProfileDataProps {
  isMyDashboard: boolean
  username?: string | null
  userId?: string | null
}

export default function ProfileData({ isMyDashboard, username, userId }: ProfileDataProps) {
  const { toast } = useToast()

  const [justCopied, setJustCopied] = useState(false)

  useEffect(() => {
    if (justCopied) {
      setTimeout(() => { setJustCopied(false) }, 5000)
    }
  }, [justCopied])

  const handleCopyLink = () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/dashboard?id=' + (userId ?? '')
    navigator.clipboard.writeText(url).then(() => {
      setJustCopied(true)
      toast({
        description: 'Profile link copied to the clipboard'
      })
    })
  }

  return !!username && (
    <div className="header-content">
      <div>
        {!isMyDashboard && <p className="text-sm">You&apos;re looking at</p>}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <h6 className="flex gap-1 items-center cursor-pointer" onClick={handleCopyLink}>
                <strong className="text-lg">{username}&apos;s</strong>
                Dashboard
                {justCopied ? <BsCheck2 /> : <PiCopySimpleThin />}
              </h6>
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>{justCopied ? 'Profile link copied to the clipboard' : 'Copy profile link'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
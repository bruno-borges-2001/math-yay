import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function useAuthStatusNotification() {
  const { data: session, status } = useSession()
  const { toast } = useToast()

  const sendUnauthenticatedToast = () => {
    toast({
      title: 'Warning! Your stats are not being recorded!',
      description: 'What is the point of playing if you don\'t know how you\'re doing?\n\nSign in and start recording your stats.',
      variant: 'destructive',
      action: <ToastAction altText="Sign In" onClick={() => signIn('google')}>Sign in</ToastAction>
    })
  }

  const sendAuthenticatedToast = () => {
    toast({
      title: `Welcome Back! ${session?.user.name}`,
      description: 'You are already logged in and your stats are being recorded. You can check them on the dashboard.'
    })
  }

  useEffect(() => {
    switch (status) {
      case 'authenticated':
        sendAuthenticatedToast()
        return
      case 'unauthenticated':
        sendUnauthenticatedToast()
        return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])
}
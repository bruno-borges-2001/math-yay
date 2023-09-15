import AuthLoader from '@/components/auth/AuthLoader'
import LiquidSideNav from '@/components/ui/liquidSideNav'
import ModeToggle from '@/components/ui/modeToggle'
import Providers from '@/hooks'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Math! Yay!',
  description: 'Test your math knowledge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <AuthLoader />

          <div className='fixed top-3 left-3 z-[500]'>
            <LiquidSideNav />
          </div>

          <div className='fixed top-8 right-8'>
            <ModeToggle />
          </div>

          {children}
        </Providers>
      </body>
    </html>
  )
}

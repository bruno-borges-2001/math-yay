import AuthLoader from '@/components/auth/AuthLoader'
import LiquidSideNav from '@/components/ui/liquidSideNav'
import ModeToggle from '@/components/ui/modeToggle'
import { Toaster } from '@/components/ui/toaster'
import Providers from '@/hooks'
import { OPEN_GRAPH_METADATA, TWITTER_METADATA } from '@/lib/constants'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Math! Yay!',
  description: 'Test your math knowledge',

  openGraph: { ...OPEN_GRAPH_METADATA },

  twitter: { ...TWITTER_METADATA }
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

          <div className='fixed-container'>
            <LiquidSideNav />
          </div>

          <div className='fixed-container right'>
            <ModeToggle />
          </div>

          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}

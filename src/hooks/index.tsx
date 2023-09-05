import React from "react"
import TrpcProvider from "@/lib/trpc/Provider";
import NextAuthProvider from "@/lib/auth/Provider";

import { ThemeProvider } from "./ThemeProvider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
      <TrpcProvider>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </TrpcProvider>
    </ThemeProvider>
  )
}
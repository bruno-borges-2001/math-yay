import NextAuthProvider from "@/lib/auth/Provider";
import TrpcProvider from "@/lib/trpc/Provider";
import React from "react";

import { ThemeProvider } from "./ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem >
      <TrpcProvider>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </TrpcProvider>
    </ThemeProvider>
  )
}
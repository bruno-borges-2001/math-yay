"use client";
import { AnimatePresence, motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Loader from "../ui/loader";

function SignIn() {
  const { data: session, status } = useSession();

  return (
    <>
      {status === 'loading' && (
        <motion.div
          key="loader-wrapper"
          initial={{ y: 0 }}
          exit={{ y: '100%' }}
          className="fixed inset-0 h-[100vh] w-[100vw] grid place-items-center z-50 bg-gray-300 dark:bg-slate-800"
        >
          <Loader />
        </motion.div>
      )}
      {session ?
        <>
          Signed in as {session.user?.email} <br />
          <Button variant={"destructive"} onClick={() => signOut()}>Sign out</Button>
        </>
        :
        <>
          Not signed in <br />
          <Button onClick={() => signIn('google')}>Sign in</Button>
        </>}
    </>
  )
}

export default function SignInWrapper() {
  return (
    <AnimatePresence>
      <SignIn />
    </AnimatePresence>
  )
}
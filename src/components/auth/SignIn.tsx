"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === 'loading') return null

  return session ?
    <>
      Signed in as {session.user?.email} <br />
      <Button variant={"destructive"} onClick={() => signOut()}>Sign out</Button>
    </>
    :
    <>
      Not signed in <br />
      <Button onClick={() => signIn('google')}>Sign in</Button>
    </>
}
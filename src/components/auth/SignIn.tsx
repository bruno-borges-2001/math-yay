"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import Loader from "../ui/loader";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div className="fixed inset-0 h-[100vh] w-[100vw] grid place-items-center z-50 bg-slate-200 dark:bg-slate-800"><Loader /></div>;

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <Button variant={"destructive"} onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn('google')}>Sign in</Button>
    </>
  );
}
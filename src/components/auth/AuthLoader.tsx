'use client'

import { useSession } from "next-auth/react";
import Loader from "../general/loader";

export default function AuthLoader() {
  const { status } = useSession();

  return <Loader isLoading={status === 'loading'} />
}
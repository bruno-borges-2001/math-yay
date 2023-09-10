'use client'

import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Loader from "../ui/loader";

export default function AuthLoader() {
  const { status } = useSession();

  return (
    <AnimatePresence>
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
    </AnimatePresence>
  )
}
'use client'

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { FiMenu, FiX } from "react-icons/fi";
import ModeToggle from "./modeToggle";

export default function LiquidSideNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="shadow-lg rounded-full">
        <motion.button
          whileHover={{ rotate: "180deg" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="text-3xl bg-white text-black hover:text-indigo-500 transition-colors p-4 rounded-full"
        >
          <FiMenu />
        </motion.button>
      </div>
      <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

interface NavProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void
}

const Nav = ({ isOpen, setIsOpen }: NavProps) => {
  const { data: session } = useSession()

  const body = document.querySelector('body')

  return body && createPortal(
    <motion.nav
      className="fixed top-0 bottom-0 w-screen bg-white dark:bg-black z-50"
      animate={isOpen ? "open" : "closed"}
      variants={navVariants}
      initial="closed"
    >
      <div className="absolute top-8 right-8 flex flex-col sm:flex-row-reverse items-end sm:items-center">
        <motion.button
          className="text-3xl bg-white dark:bg-black hover:text-indigo-500 border-[1px] border-transparent hover:border-indigo-500 transition-colors p-4 rounded-full"
          whileHover={{ rotate: "180deg" }}
          onClick={() => setIsOpen(false)}
          whileTap={{ scale: 0.9 }}
        >
          <FiX />
        </motion.button>
        <div>
          <ModeToggle />
        </div>
      </div>

      <motion.div
        variants={linkWrapperVariants}
        className="flex flex-col gap-4 absolute bottom-8 left-8"
      >
        <p>Play</p>
        <NavLink text="Normal Mode" href="/" onClick={() => setIsOpen(false)} />
        <NavLink text="Unlimited Mode" href="/unlimited" onClick={() => setIsOpen(false)} />

        {session ? (
          <>
            <p>Your Account</p>
            <NavLink text="Dashboard" href="/dashboard" onClick={() => setIsOpen(false)} />
            <NavLink text="Log Out" variant="destruction" onClick={() => signOut()} />
          </>
        ) : (
          <NavLink text="Sign In" variant="construction" onClick={() => signIn('google')} className="fixed top-8 left-8" />
        )}

      </motion.div>
    </motion.nav>,
    body
  );
};

interface NavLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  onClick?: () => void;
  href?: string;

  variant?: 'default' | 'construction' | 'destruction'
}

const NavLink = ({ text, href, onClick, className, variant = 'default' }: NavLinkProps) => {
  const Component = (
    <motion.div
      className={cn("cursor-pointer inline-block z-10 w-fit font-black transition-colors", className, {
        'text-7xl hover:text-indigo-500': variant === 'default',
        'text-5xl hover:text-green-800': variant === 'construction',
        'text-5xl hover:text-red-600 mt-8': variant === 'destruction'
      })}
      variants={navLinkVariants}
      transition={{
        type: "spring",
        damping: 3,
      }}
      whileHover={{
        y: -15,
        rotate: "-5deg",
      }}
      rel="nofollow"
      onClick={onClick}
    >
      {text}
    </motion.div>
  )

  return href
    ? (
      <Link href={href}>
        {Component}
      </Link>
    )
    : Component
};

const navVariants = {
  open: {
    x: "0%",
    borderTopLeftRadius: "0vw",
    borderBottomLeftRadius: "0vw",
    opacity: 1,
  },
  closed: {
    x: "100%",
    borderTopLeftRadius: "50vw",
    borderBottomLeftRadius: "50vw",
    opacity: 0,
  },
};

const linkWrapperVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const navLinkVariants = {
  open: { x: 0 },
  closed: { x: 25 },
};
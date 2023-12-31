'use client'

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

const TOGGLE_CLASSES = "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

export default function ModeToggle({ vertical }: { vertical?: boolean }) {
  const { theme, setTheme } = useTheme()

  return theme && (
    <div className={cn("relative flex w-fit items-center rounded-full sm:flex-row", { 'flex-col': vertical })}>
      <button
        className={cn(TOGGLE_CLASSES, theme === "light" ? "text-offwhite" : "text-slate-300")}
        onClick={() => setTheme("light")}
      >
        <FiSun className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10 hidden sm:block">Light</span>
      </button>
      <button
        className={cn(TOGGLE_CLASSES, theme === "dark" ? "text-offwhite" : "text-slate-800")}
        onClick={() => setTheme("dark")}
      >
        <FiMoon className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10 hidden sm:block">Dark</span>
      </button>
      <div className={cn("absolute inset-0 z-0 flex sm:flex-row", theme === "dark" ? "justify-end" : "justify-start", { 'flex-col': vertical })}>
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className={cn("rounded-full bg-default-gradient sm:h-full sm:w-1/2", { "h-1/2 w-full": vertical, "h-full w-1/2": !vertical })}
        />
      </div>
    </div >
  );
};
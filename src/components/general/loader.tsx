import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import LoaderIndicator from "../ui/loaderIndicator";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;

  backgroundColor?: string;
  caption?: string;
  zIndex?: number;
}

export default function Loader({ isLoading, caption, backgroundColor, zIndex = 999, className, ...rest }: LoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader-wrapper"
          initial={{ y: 0 }}
          exit={{ y: '100%' }}
          className={cn("fixed inset-0 h-[100vh] w-[100vw] flex flex-col justify-center items-center text-center gap-6 z-50 bg-gray-400 dark:bg-slate-800", className)}
          style={{ zIndex, backgroundColor }}
        >
          <LoaderIndicator />
          {caption && <p>{caption}</p>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
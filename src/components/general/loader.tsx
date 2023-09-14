import { AnimatePresence, motion } from "framer-motion";
import LoaderIndicator from "../ui/loaderIndicator";

interface LoaderProps {
  isLoading: boolean;

  backgroundColor?: string;
  caption?: string;
  zIndex?: number;
}

export default function Loader({ isLoading, caption, backgroundColor, zIndex = 999 }: LoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader-wrapper"
          initial={{ y: 0 }}
          exit={{ y: '100%' }}
          className="fixed inset-0 h-[100vh] w-[100vw] flex flex-col justify-center items-center gap-6 z-50 bg-gray-400 dark:bg-slate-800"
          style={{ zIndex, backgroundColor }}
        >
          <LoaderIndicator />
          {caption && <p>{caption}</p>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
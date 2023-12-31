import { Variants, motion } from "framer-motion";

const variants: Variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

export default function LoaderIndicator() {
  return (
    <motion.div
      transition={{ staggerChildren: 0.25 }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-gray-700 dark:bg-offwhite" />
      <motion.div variants={variants} className="h-12 w-2 bg-gray-700 dark:bg-offwhite" />
      <motion.div variants={variants} className="h-12 w-2 bg-gray-700 dark:bg-offwhite" />
      <motion.div variants={variants} className="h-12 w-2 bg-gray-700 dark:bg-offwhite" />
      <motion.div variants={variants} className="h-12 w-2 bg-gray-700 dark:bg-offwhite" />
    </motion.div>
  );
};
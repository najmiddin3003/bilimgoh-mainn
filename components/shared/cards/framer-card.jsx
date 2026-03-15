"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function AnimatedSection() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <motion.div variants={item} className="p-6 bg-slate-800 rounded-xl">
        Card 1
      </motion.div>

      <motion.div variants={item} className="p-6 bg-slate-800 rounded-xl">
        Card 2
      </motion.div>

      <motion.div variants={item} className="p-6 bg-slate-800 rounded-xl">
        Card 3
      </motion.div>
    </motion.div>
  );
}

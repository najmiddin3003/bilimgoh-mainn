"use client";

import { Star, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const AVATAR_COLORS = [
  "from-emerald-400 to-teal-500",
  "from-violet-500 to-purple-500",
  "from-emerald-500 to-green-600",
  "from-rose-500 to-pink-500",
  "from-fuchsia-500 to-purple-500",
  "from-emerald-400 to-emerald-600",
  "from-sky-500 to-blue-500",
  "from-orange-500 to-amber-500",
];

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export default function Testimonials() {
  const { t } = useTranslation();

  const rawItems = t("testimonials.items", { returnObjects: true });
  const testimonials = Array.isArray(rawItems) ? rawItems : [];

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="testimonial"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="py-24 bg-white dark:bg-[#0B0F14] border-y border-gray-200 dark:border-[#1F2937]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div variants={fadeUp} className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {t("testimonials.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            {t("testimonials.description")}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((item, i) => (
            <motion.article
              key={i}
              variants={cardAnimation}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition flex flex-col h-full"
            >
              <Quote
                size={28}
                className="text-emerald-500/80 mb-3 fill-emerald-500/15"
              />

              <div className="flex gap-1 text-amber-400 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={15} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex-1 mb-6">
                {item.text}
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-gray-100 dark:border-gray-800">
                <div
                  className={`h-11 w-11 shrink-0 rounded-full bg-gradient-to-br ${
                    AVATAR_COLORS[i % AVATAR_COLORS.length]
                  } text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-black/5`}
                >
                  {getInitials(item.name)}
                </div>

                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

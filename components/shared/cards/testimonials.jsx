"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Testimonials() {
  const { t } = useTranslation();

  const testimonials = t("testimonials.items", { returnObjects: true });

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardAnimation = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="py-24 bg-white dark:bg-[#0B0F14] border-y border-gray-200 dark:border-[#1F2937]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-green-500 tracking-widest text-sm font-semibold">
            {t("testimonials.badge")}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-[#E5E7EB] mt-3">
            {t("testimonials.title")}
          </h2>

          <p className="text-gray-600 dark:text-[#9CA3AF] mt-4 max-w-xl mx-auto">
            {t("testimonials.description")}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              variants={cardAnimation}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-[#1F2937] rounded-2xl shadow-md dark:shadow-black/40 hover:shadow-xl transition p-6"
            >
              {/* Stars */}
              <motion.div
                variants={fadeUp}
                className="flex gap-1 text-yellow-400 mb-4"
              >
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
              </motion.div>

              <p className="text-green-500 text-2xl mb-2">“</p>

              <p className="text-gray-600 dark:text-[#9CA3AF] text-sm mb-6">
                {item.text}
              </p>

              {/* User */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-[#1F2937]">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Image
                    src={item.avatar}
                    width={40}
                    height={40}
                    alt={item.name}
                    className="rounded-full"
                  />
                </motion.div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-[#E5E7EB] text-sm">
                    {item.name}
                  </h4>

                  <p className="text-xs text-gray-500 dark:text-[#9CA3AF]">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

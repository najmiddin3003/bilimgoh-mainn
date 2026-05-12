"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-white dark:bg-[#0B0F14]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-[#0B1220] text-white px-8 py-14 md:px-14 md:py-16 text-center shadow-2xl"
        >
          {/* Soft glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />

          <h2 className="relative text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {t("cta.titleStart")}{" "}
            <span className="italic font-extrabold text-emerald-400">
              {t("cta.titleAccent")}
            </span>{" "}
            {t("cta.titleEnd")}
          </h2>

          <p className="relative text-gray-300 mt-5 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            {t("cta.description")}
          </p>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/auth">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-full shadow-lg shadow-black/20 transition"
              >
                {t("cta.primary")}
                <ArrowRight size={16} />
              </motion.button>
            </Link>

            <Link href="/pricing">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-transparent border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                {t("cta.secondary")}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

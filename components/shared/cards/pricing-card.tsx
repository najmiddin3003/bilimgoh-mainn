"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import Navbar from "../navbar";

const plans = [
  {
    name: "Bepul",
    price: "0 so'm",
    period: "",
    description: "Boshlang'ich qadamlar uchun",
    features: [
      "Limited courses access",
      "Basic lessons",
      "Ads included",
      "Community access",
    ],
    buttonText: "Bepul boshlash",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "300 000 so'm",
    period: "/ oy",
    description: "Professional o'sishni istaganlar uchun",
    features: [
      "Full access to all courses",
      "Personal mentor support",
      "Certificates (advanced)",
      "Offline access",
      "Priority support",
    ],
    buttonText: "Eng yaxshisini tanlash",
    highlighted: true,
    badge: "Eng ko'p tanlangan",
  },
  {
    name: "Medium",
    price: "150 000 so'm",
    period: "/ oy",
    description: "Bilimlarni mustahkamlash uchun",
    features: [
      "Access to most courses",
      "No ads",
      "Progress tracking",
      "Certificates (basic)",
    ],
    buttonText: "Tanlash",
    highlighted: false,
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

function CheckIcon({ highlighted = false }: { highlighted?: boolean }) {
  return (
    <span
      className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
        highlighted
          ? "bg-emerald-500/15 text-emerald-400 dark:bg-emerald-400/15 dark:text-emerald-300"
          : "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400"
      }`}
    >
      ✓
    </span>
  );
}

export default function PricingPlans() {
  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden bg-white py-20 text-slate-900 transition-colors duration-300 dark:bg-[#020817] dark:text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/12" />
          <div className="absolute bottom-[-140px] right-[-120px] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/10" />
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl dark:bg-emerald-500/8" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <span className="mb-4 block text-xs font-extrabold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
              Narxlar va rejalar
            </span>

            <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              O&apos;zingiz uchun eng mos{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-green-400 to-green-300 bg-clip-text text-transparent">
                planingizni
              </span>{" "}
              tanlang
            </h2>

            <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
              Kelajagingiz uchun sarmoya qiling.{" "}
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                Bilimgoh
              </span>{" "}
              bilan o&apos;rganishni hoziroq boshlang va yangi marralarni zabt
              eting.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-end"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                whileHover={{ y: -8, scale: plan.highlighted ? 1.03 : 1.01 }}
                transition={{ duration: 0.25 }}
                className={`group relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-3xl border p-8 backdrop-blur-xl transition-colors duration-300 ${
                  plan.highlighted
                    ? "z-10 min-h-[620px] border-emerald-400/40 bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent shadow-[0_0_0_1px_rgba(16,185,129,0.15),0_25px_80px_-20px_rgba(16,185,129,0.35)] dark:border-emerald-400/30 dark:bg-[linear-gradient(180deg,rgba(16,185,129,0.10),rgba(6,182,212,0.06),rgba(2,8,23,0.75))] dark:shadow-[0_0_0_1px_rgba(52,211,153,0.14),0_30px_80px_-20px_rgba(16,185,129,0.45)] lg:scale-105"
                    : "border-slate-200 bg-white/90 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 dark:from-emerald-400/8 dark:to-cyan-400/8" />
                </div>

                {plan.badge && (
                  <div className="absolute left-1/2 top-4 -translate-x-1/2">
                    <div className="rounded-full border border-emerald-300/40 bg-gradient-to-r from-emerald-500 to-green-400 px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-lg shadow-emerald-500/20">
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div
                  className={`${plan.badge ? "pt-10" : ""} relative z-10 mb-8`}
                >
                  <h3
                    className={`mb-2 ${
                      plan.highlighted
                        ? "text-2xl font-black text-slate-900 dark:text-white"
                        : "text-xl font-bold text-slate-900 dark:text-white"
                    }`}
                  >
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="font-medium text-slate-500 dark:text-slate-400">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {plan.description}
                  </p>
                </div>

                <div className="relative z-10 mb-10 flex-grow space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckIcon highlighted={plan.highlighted} />
                      <span
                        className={`text-sm sm:text-base ${
                          plan.highlighted
                            ? "font-medium text-slate-800 dark:text-slate-100"
                            : "text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className={`relative z-10 mt-auto w-full rounded-full px-6 py-4 text-center text-sm font-bold transition duration-300 active:scale-[0.98] sm:text-base ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-emerald-500 via-green-400 to-cyan-400 text-white shadow-lg shadow-emerald-500/20 hover:brightness-110"
                      : plan.name === "Bepul"
                        ? "border border-emerald-500/30 bg-emerald-500/5 text-emerald-700 hover:bg-emerald-500/10 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:hover:bg-emerald-400/15"
                        : "bg-slate-100 text-emerald-700 hover:bg-slate-200 dark:bg-white/10 dark:text-emerald-300 dark:hover:bg-white/15"
                  }`}
                >
                  {plan.buttonText}
                </button>

                {plan.highlighted && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

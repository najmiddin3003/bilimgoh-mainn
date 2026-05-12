"use client";

import {
  Users,
  MessageCircle,
  Calendar,
  Globe,
  Heart,
  Bell,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Community() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Users,
      title: t("community.features.studyGroupsTitle"),
      text: t("community.features.studyGroupsText"),
    },
    {
      icon: MessageCircle,
      title: t("community.features.discussionForumsTitle"),
      text: t("community.features.discussionForumsText"),
    },
    {
      icon: Calendar,
      title: t("community.features.liveSessionsTitle"),
      text: t("community.features.liveSessionsText"),
    },
    {
      icon: Bell,
      title: t("community.features.peerSupportTitle"),
      text: t("community.features.peerSupportText"),
    },
    {
      icon: Globe,
      title: t("community.features.globalCommunityTitle"),
      text: t("community.features.globalCommunityText"),
    },
    {
      icon: Heart,
      title: t("community.features.projectCollaborationTitle"),
      text: t("community.features.projectCollaborationText"),
    },
  ];

  const floatingAvatars = [
    {
      letter: "Z",
      color: "from-emerald-400 to-teal-500",
      position: "top-6 left-2 sm:left-6",
      delay: 0,
    },
    {
      letter: "D",
      color: "from-violet-500 to-purple-500",
      position: "top-2 right-6 sm:right-10",
      delay: 0.4,
    },
    {
      letter: "J",
      color: "from-red-500 to-rose-500",
      position: "bottom-8 left-4 sm:left-12",
      delay: 0.8,
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="community"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="py-24 bg-white dark:bg-[#0B0F14] border-y border-gray-200 dark:border-[#1F2937]"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <motion.div variants={fadeUp}>
          <p className="text-green-500 text-sm font-semibold tracking-[0.25em] uppercase">
            {t("community.badge")}
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-3 leading-tight">
            {t("community.title")}{" "}
            <span className="text-gray-900 dark:text-white">
              {t("community.titleHighlight")}
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-lg">
            {t("community.description")}
          </p>

          {/* Features grid */}
          <motion.div
            variants={container}
            className="grid sm:grid-cols-2 gap-4 mt-10"
          >
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="rounded-2xl bg-emerald-50/70 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 p-4 hover:border-emerald-300 dark:hover:border-emerald-500/30 transition"
                >
                  <div className="bg-white dark:bg-[#0F172A] shadow-sm w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                    <Icon className="text-emerald-500" size={18} />
                  </div>

                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                    {item.title}
                  </h4>

                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3 rounded-full font-medium shadow-lg shadow-emerald-500/25 transition"
          >
            {t("community.button")}
          </motion.button>
        </motion.div>

        {/* RIGHT — central stat card with floating avatars */}
        <motion.div
          variants={fadeUp}
          className="relative h-[420px] md:h-[460px] flex items-center justify-center"
        >
          {/* Soft glow */}
          <div className="pointer-events-none absolute inset-10 rounded-full bg-gradient-to-br from-emerald-200/50 via-emerald-100/40 to-teal-100/40 blur-3xl dark:from-emerald-500/15 dark:via-emerald-500/10 dark:to-teal-500/10" />

          {/* Rotating dashed ring */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute h-[340px] w-[340px] rounded-full border-2 border-dashed border-emerald-300/60 dark:border-emerald-500/30"
          />

          {/* Central stat card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl shadow-emerald-500/10 px-8 py-7 text-center w-[230px]"
          >
            <div className="text-4xl md:text-5xl font-extrabold text-emerald-500">
              {t("community.stat.value")}
            </div>
            <div className="mt-1 font-semibold text-gray-900 dark:text-white">
              {t("community.stat.label")}
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {t("community.stat.subtext")}
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              {t("community.badges.supportTitle")}
            </div>
          </motion.div>

          {/* Floating letter avatars */}
          {floatingAvatars.map((a) => (
            <motion.div
              key={a.letter}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + a.delay }}
              className={`absolute ${a.position}`}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4 + a.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br ${a.color} text-white text-lg font-extrabold flex items-center justify-center shadow-xl shadow-black/10 ring-4 ring-white dark:ring-[#0B0F14]`}
              >
                {a.letter}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

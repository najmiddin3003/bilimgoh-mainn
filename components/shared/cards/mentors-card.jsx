"use client";

import { Send, Linkedin, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const MENTOR_VISUALS = [
  { color: "from-emerald-400 to-teal-500" },
  { color: "from-violet-500 to-purple-500" },
  { color: "from-orange-500 to-red-500" },
  { color: "from-sky-500 to-blue-500" },
  { color: "from-fuchsia-500 to-purple-500" },
];

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export default function Mentors() {
  const { t } = useTranslation();

  const rawItems = t("mentors.items", { returnObjects: true });
  const mentors = Array.isArray(rawItems) ? rawItems : [];

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
      id="mentors"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="py-20 bg-white dark:bg-[#0B0F14] border-y border-gray-200 dark:border-[#1F2937]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div variants={fadeUp} className="text-center mb-14">
          <p className="text-green-500 tracking-[0.25em] text-xs font-bold uppercase">
            {t("mentors.badge")}
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-3 tracking-tight">
            {t("mentors.title")}{" "}
            <span className="text-emerald-500">
              {t("mentors.titleHighlight")}
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-xl mx-auto">
            {t("mentors.description")}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6"
        >
          {mentors.map((mentor, idx) => {
            const visual = MENTOR_VISUALS[idx % MENTOR_VISUALS.length];
            const isDark = idx === 0;

            return (
              <motion.article
                key={`${mentor.name}-${idx}`}
                variants={cardAnimation}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={`lg:col-span-2 rounded-2xl p-6 text-center transition shadow-sm hover:shadow-2xl flex flex-col ${
                  isDark
                    ? "bg-[#0B1220] text-white border border-[#0B1220] hover:shadow-emerald-500/20"
                    : "bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-800 hover:shadow-emerald-500/10"
                }`}
              >
                {/* Avatar */}
                <div className="relative w-24 h-24 mx-auto mb-5">
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${visual.color} opacity-25 blur-xl`}
                  />
                  <div
                    className={`relative h-full w-full rounded-full bg-gradient-to-br ${visual.color} flex items-center justify-center text-white text-2xl font-extrabold shadow-lg shadow-black/10`}
                  >
                    {getInitials(mentor.name)}
                  </div>
                </div>

                {/* Role badge */}
                <p
                  className={`text-[10px] font-bold tracking-[0.18em] uppercase mb-2 ${
                    isDark ? "text-emerald-400" : "text-emerald-500"
                  }`}
                >
                  {mentor.role}
                </p>

                {/* Name */}
                <h3
                  className={`text-lg font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-900 dark:text-white"
                  }`}
                >
                  {mentor.name}
                </h3>

                {/* Bio */}
                <p
                  className={`text-xs leading-relaxed mb-5 flex-1 ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {mentor.bio}
                </p>

                {/* Stats */}
                <div
                  className={`flex items-center justify-around gap-2 mb-5 pt-4 border-t ${
                    isDark
                      ? "border-white/10"
                      : "border-gray-100 dark:border-gray-800"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-base font-extrabold text-emerald-500">
                      {mentor.primaryValue}
                    </span>
                    <span
                      className={`text-[10px] ${
                        isDark
                          ? "text-gray-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {mentor.primaryLabel}
                    </span>
                  </div>

                  <div
                    className={`w-px h-8 ${
                      isDark ? "bg-white/10" : "bg-gray-200 dark:bg-gray-800"
                    }`}
                  />

                  <div className="flex flex-col">
                    <span className="text-base font-extrabold text-emerald-500">
                      {mentor.secondaryValue}
                    </span>
                    <span
                      className={`text-[10px] ${
                        isDark
                          ? "text-gray-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {mentor.secondaryLabel}
                    </span>
                  </div>
                </div>

                {/* Social */}
                <div
                  className={`flex justify-center gap-4 ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  <a
                    href="#"
                    className="transition hover:-translate-y-0.5 hover:text-emerald-500"
                  >
                    <Send size={16} />
                  </a>
                  <a
                    href="#"
                    className="transition hover:-translate-y-0.5 hover:text-emerald-500"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href="#"
                    className="transition hover:-translate-y-0.5 hover:text-emerald-500"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

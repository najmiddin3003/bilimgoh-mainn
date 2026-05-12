"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Trophy,
  Award,
  Briefcase,
  Gift,
  Lock,
  GraduationCap,
  Crown,
  Flame,
} from "lucide-react";



const FEATURE_ICONS = [Trophy, Award, Briefcase, Gift, Lock, GraduationCap];

const AVATAR_COLORS = [
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-sky-500 to-blue-500",
  "from-violet-500 to-purple-500",
  "from-fuchsia-500 to-pink-500",
  "from-cyan-500 to-sky-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-purple-500",
  "from-green-500 to-emerald-500",
  "from-pink-500 to-rose-500",
  "from-teal-500 to-emerald-500",
  "from-blue-500 to-indigo-500",
];

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export default function TopStudents() {
  const { t } = useTranslation();

  const featuresRaw = t("topStudents.features", { returnObjects: true });
  const features = Array.isArray(featuresRaw) ? featuresRaw : [];

  const studentsRaw = t("topStudents.students", { returnObjects: true });
  const students = Array.isArray(studentsRaw) ? studentsRaw : [];

  const top3 = students.slice(0, 3);
  const rest = students.slice(3, 13);

  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <motion.section
      id="top-students"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="py-24 bg-white dark:bg-[#0B0F14]"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
        {/* LEFT */}
        <motion.div variants={fadeUp}>
          <p className="text-green-500 text-sm font-semibold tracking-[0.25em] uppercase">
            {t("topStudents.badge")}
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-3 leading-tight">
            {t("topStudents.title")}{" "}
            <span className="text-emerald-500">
              {t("topStudents.titleHighlight")}
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-lg">
            {t("topStudents.description")}
          </p>

          <motion.div
            variants={container}
            className="grid sm:grid-cols-2 gap-4 mt-10"
          >
            {features.map((item, idx) => {
              const Icon = FEATURE_ICONS[idx] || Trophy;
              return (
                <motion.div
                  key={idx}
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
            {t("topStudents.button")}
          </motion.button>
        </motion.div>

        {/* RIGHT — Leaderboard */}
        <motion.div
          variants={fadeUp}
          className="relative flex flex-col bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl shadow-emerald-500/5 p-7 md:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="inline-flex items-center gap-2">
              <Crown size={22} className="text-amber-400 fill-amber-400" />
              <span className="font-bold text-gray-900 dark:text-white text-lg">
                {t("topStudents.leaderboard.title")}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Flame size={14} />
              {t("topStudents.leaderboard.totalPoints")}
            </div>
          </div>

          {/* Podium (top 3) */}
          <div className="grid grid-cols-3 gap-4 mb-6 flex-shrink-0">
            {podiumOrder.map((s) => {
              const rankIndex = students.indexOf(s);
              const rank = rankIndex + 1;
              const isFirst = rank === 1;

              return (
                <div
                  key={s.name}
                  className={`flex flex-col items-center ${isFirst ? "-mt-6" : "mt-6"}`}
                >
                  <div className="relative">
                    {isFirst && (
                      <Crown
                        size={30}
                        className="absolute -top-9 left-1/2 -translate-x-1/2 z-20 text-amber-400 fill-amber-400 drop-shadow"
                      />
                    )}

                    

                    <div
                      className={`relative z-10 ${
                        isFirst ? "h-36 w-36" : "h-28 w-28"
                      } rounded-full p-[3px] bg-gradient-to-br ${
                        isFirst
                          ? "from-amber-400 to-yellow-500"
                          : "from-emerald-400 to-emerald-500"
                      }`}
                    >
                      <div
                        className={`h-full w-full rounded-full bg-gradient-to-br ${
                          AVATAR_COLORS[rankIndex % AVATAR_COLORS.length]
                        } text-white font-extrabold flex items-center justify-center ${
                          isFirst ? "text-4xl" : "text-2xl"
                        } shadow-inner`}
                      >
                        {getInitials(s.name)}
                      </div>
                    </div>

                    <span
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 ${
                        isFirst
                          ? "bg-amber-400 text-white h-7 w-7 text-sm"
                          : "bg-emerald-500 text-white h-6 w-6 text-xs"
                      } font-bold rounded-full flex items-center justify-center shadow`}
                    >
                      {rank}
                    </span>
                  </div>

                  <p
                    className={`mt-5 font-bold text-gray-900 dark:text-white truncate max-w-full text-center ${
                      isFirst ? "text-lg" : "text-base"
                    }`}
                  >
                    {s.name}
                  </p>
                  <p className="text-sm text-emerald-500 font-semibold mt-1">
                    {s.points} {t("topStudents.leaderboard.pointSuffix")}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Rest of leaderboard */}
          {rest.length > 0 && (
            <div className="grid grid-cols-5 gap-x-2 gap-y-3">
              {rest.map((s, idx) => {
                const rank = idx + 4;
                const isMiddleRow = rank <= 8;

                return (
                  <div
                    key={s.name}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex flex-col items-center w-full">
                      <span
                        className={`bg-white dark:bg-[#0F172A] border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-extrabold rounded-full flex items-center justify-center shadow-sm ${
                          isMiddleRow
                            ? "text-xs h-6 min-w-[24px] px-1.5 mb-2"
                            : "text-[10px] h-5 min-w-[20px] px-1 mb-1.5"
                        }`}
                      >
                        {rank}
                      </span>
                      <div
                        className={`rounded-full p-[2px] bg-gradient-to-br from-emerald-300 to-emerald-500 ${
                          isMiddleRow ? "h-24 w-24" : "h-16 w-16"
                        }`}
                      >
                        <div
                          className={`h-full w-full rounded-full bg-gradient-to-br ${
                            AVATAR_COLORS[rank % AVATAR_COLORS.length]
                          } text-white font-bold flex items-center justify-center ${
                            isMiddleRow ? "text-lg" : "text-sm"
                          }`}
                        >
                          {getInitials(s.name)}
                        </div>
                      </div>
                    </div>
                    <p
                      className={`mt-2 font-semibold text-gray-900 dark:text-white leading-tight line-clamp-2 px-1 ${
                        isMiddleRow ? "text-sm" : "text-xs"
                      }`}
                    >
                      {s.name}
                    </p>
                    <p
                      className={`text-emerald-500 font-semibold mt-0.5 ${
                        isMiddleRow ? "text-xs" : "text-[10px]"
                      }`}
                    >
                      {s.points} {t("topStudents.leaderboard.pointSuffix")}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}

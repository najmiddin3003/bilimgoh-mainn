"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const TEACHER_VISUALS = [
  { initials: "NE", color: "from-pink-500 to-rose-500", border: "border-rose-500/70" },
  { initials: "AR", color: "from-orange-500 to-amber-500", border: "border-amber-500/70" },
  { initials: "MS", color: "from-emerald-500 to-teal-500", border: "border-teal-500/70" },
  { initials: "JA", color: "from-orange-500 to-red-500", border: "border-red-500/70" },
  { initials: "GT", color: "from-purple-500 to-fuchsia-500", border: "border-fuchsia-500/70" },
  { initials: "DK", color: "from-cyan-500 to-sky-500", border: "border-sky-500/70" },
  { initials: "AY", color: "from-violet-500 to-purple-500", border: "border-purple-500/70" },
  { initials: "BE", color: "from-emerald-500 to-green-600", border: "border-green-600/70" },
  { initials: "NT", color: "from-sky-500 to-blue-500", border: "border-blue-500/70" },
  { initials: "SM", color: "from-indigo-500 to-purple-600", border: "border-purple-600/70" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.05 },
  }),
};

export default function TeachersGrid() {
  const { t } = useTranslation();

  const items = t("teachersGrid.items", { returnObjects: true });
  const teachers = Array.isArray(items) ? items : [];

  return (
    <section
      id="teachers"
      className="py-20 bg-white dark:bg-[#0B0F14] relative overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[60%] rounded-full bg-emerald-100/40 blur-3xl dark:bg-emerald-500/5" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p className="text-green-500 font-semibold tracking-[0.3em] text-xs uppercase">
            {t("teachersGrid.badge")}
          </p>

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-3 tracking-tight max-w-3xl mx-auto leading-tight">
            {t("teachersGrid.title")}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
            {t("teachersGrid.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {teachers.map((teacher, idx) => {
            const visual = TEACHER_VISUALS[idx] || TEACHER_VISUALS[0];
            const stats = Array.isArray(teacher.stats) ? teacher.stats : [];

            return (
              <motion.div
                key={`${teacher.name}-${idx}`}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/40 transition flex flex-col items-center text-center"
              >
                <div className="relative h-24 w-24 mb-4 transition-transform duration-300 group-hover:scale-105">
                  <motion.div
                    aria-hidden
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-0 rounded-full border-2 border-dashed ${visual.border}`}
                  />
                  <div
                    className={`absolute inset-1.5 rounded-full bg-gradient-to-br ${visual.color} text-white text-2xl font-extrabold flex items-center justify-center shadow-lg shadow-black/10`}
                  >
                    {visual.initials}
                  </div>
                </div>

                <p className="text-green-500 font-bold text-[10px] tracking-[0.18em] uppercase mb-2">
                  {teacher.role}
                </p>

                <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight mb-1">
                  {teacher.name}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2rem]">
                  {teacher.specialty}
                </p>

                <div className="mt-auto w-full pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-2">
                  {stats.map((s, sIdx) => (
                    <div key={sIdx} className="flex flex-col items-center">
                      <span className="font-extrabold text-gray-900 dark:text-white text-sm">
                        {s.value}
                      </span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

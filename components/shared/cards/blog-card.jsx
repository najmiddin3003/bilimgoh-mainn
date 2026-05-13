"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Target, Zap, FileText } from "lucide-react";

/** Yuqori rangli panel + badge ikonkasi + pastki avatar rangi */
const POST_VISUALS = [
  {
    topBg: "bg-emerald-500",
    Icon: Target,
    BadgeIcon: Target,
    avatarClass: "bg-rose-400",
  },
  {
    topBg: "bg-indigo-600",
    Icon: Zap,
    BadgeIcon: Zap,
    avatarClass: "bg-orange-400",
  },
  {
    topBg: "bg-amber-500",
    Icon: FileText,
    BadgeIcon: FileText,
    avatarClass: "bg-sky-500",
  },
  {
    topBg: "bg-pink-500",
    Icon: FileText,
    BadgeIcon: FileText,
    avatarClass: "bg-amber-500",
  },
];

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function Blog() {
  const { t } = useTranslation();

  const rawItems = t("blog.items", { returnObjects: true });
  const posts = Array.isArray(rawItems) ? rawItems : [];

  return (
    <motion.section
      id="blog"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="py-20 bg-white dark:bg-[#0B0F14]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-12">
          <p className="text-emerald-500 tracking-[0.25em] text-xs font-bold uppercase">
            {t("blog.badge")}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-3 tracking-tight">
            {t("blog.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            {t("blog.description")}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {posts.slice(0, 3).map((post, idx) => {
            const visual = POST_VISUALS[idx % POST_VISUALS.length];
            const Icon = visual.Icon;
            const BadgeIcon = visual.BadgeIcon;
            const excerpt =
              typeof post.excerpt === "string" ? post.excerpt : "";
            const readTime =
              typeof post.readTime === "string"
                ? post.readTime
                : typeof post.date === "string"
                  ? post.date
                  : "";

            return (
              <motion.article
                key={`${post.title}-${idx}`}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.5rem] border border-gray-200/80 bg-white shadow-lg shadow-gray-200/60 transition hover:shadow-xl dark:border-gray-800 dark:bg-[#11161c] dark:shadow-black/40"
              >
                {/* Yuqori: kategoriya + katta ikonka */}
                <div
                  className={`relative min-h-[11.5rem] shrink-0 px-5 pb-10 pt-5 ${visual.topBg}`}
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-gray-900 shadow-sm">
                    <BadgeIcon
                      size={13}
                      className="shrink-0 text-gray-800"
                      strokeWidth={2.25}
                    />
                    {post.category}
                  </span>
                  <div className="pointer-events-none absolute inset-x-0 bottom-2 top-14 flex items-center justify-center">
                    <Icon
                      size={80}
                      className="text-white drop-shadow-sm"
                      strokeWidth={1.35}
                    />
                  </div>
                </div>

                {/* Pastki: oq blok — sarlavha, qisqacha, muallif */}
                <div className="flex flex-1 flex-col bg-white px-5 pb-5 pt-5 dark:bg-[#0f1419]">
                  <h3 className="text-lg font-bold leading-snug tracking-tight text-gray-900 line-clamp-2 dark:text-white">
                    {post.title}
                  </h3>
                  {excerpt ? (
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      {excerpt}
                    </p>
                  ) : (
                    <div className="flex-1" />
                  )}

                  <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${visual.avatarClass}`}
                    >
                      {getInitials(post.author)}
                    </div>
                    <div className="min-w-0 flex-1 text-sm">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {post.author}
                      </span>
                      {readTime ? (
                        <>
                          <span className="text-gray-300 dark:text-gray-600">
                            {" "}
                            ·{" "}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {readTime}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* View all */}
        <motion.div variants={fadeUp} className="mt-12 flex justify-center">
          <button
            type="button"
            className="group inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-7 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:border-emerald-500/60 hover:bg-gray-50 dark:border-gray-600 dark:bg-[#151a20] dark:text-gray-100 dark:hover:border-emerald-500/50 dark:hover:bg-[#1a2028]"
          >
            {t("blog.viewAll")}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}

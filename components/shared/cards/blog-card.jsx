"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Target, Zap, FileText } from "lucide-react";

const POST_VISUALS = [
  {
    gradient: "from-emerald-500 to-emerald-700",
    Icon: Target,
    iconColor: "text-emerald-500",
    avatarColor: "from-rose-500 to-pink-500",
  },
  {
    gradient: "from-violet-500 to-indigo-700",
    Icon: Zap,
    iconColor: "text-violet-500",
    avatarColor: "from-emerald-400 to-teal-500",
  },
  {
    gradient: "from-orange-500 to-amber-700",
    Icon: FileText,
    iconColor: "text-orange-500",
    avatarColor: "from-sky-500 to-blue-500",
  },
  {
    gradient: "from-pink-500 to-rose-700",
    Icon: FileText,
    iconColor: "text-pink-500",
    avatarColor: "from-amber-500 to-orange-500",
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.slice(0, 3).map((post, idx) => {
            const visual = POST_VISUALS[idx % POST_VISUALS.length];
            const Icon = visual.Icon;

            return (
              <motion.article
                key={`${post.title}-${idx}`}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${visual.gradient} text-white shadow-lg hover:shadow-2xl hover:shadow-black/20 transition flex flex-col h-full min-h-[380px] cursor-pointer`}
              >
                {/* Background pattern */}
                <div className="pointer-events-none absolute -top-8 -right-8 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-black/10 blur-2xl" />

                {/* Top: category badge */}
                <div className="relative p-5 flex items-start justify-between">
                  <span className="inline-flex items-center bg-white/95 backdrop-blur text-gray-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow">
                    {post.category}
                  </span>
                </div>

                {/* Center icon */}
                <div className="relative flex-1 flex items-center justify-center px-5">
                  <div className="h-16 w-16 rounded-2xl bg-white shadow-xl shadow-black/10 flex items-center justify-center">
                    <Icon size={28} className={visual.iconColor} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Bottom: title + author */}
                <div className="relative p-5 pt-4">
                  <h3 className="font-bold text-base md:text-lg leading-snug line-clamp-2 mb-4">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-2.5 pt-3 border-t border-white/20">
                    <div
                      className={`h-8 w-8 shrink-0 rounded-full bg-gradient-to-br ${visual.avatarColor} ring-2 ring-white/90 text-white text-[10px] font-bold flex items-center justify-center`}
                    >
                      {getInitials(post.author)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold truncate">
                        {post.author}
                      </p>
                      <p className="text-[10px] text-white/70 truncate">
                        {post.date}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* View all */}
        <motion.div variants={fadeUp} className="flex justify-center mt-10">
          <button className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium transition group">
            {t("blog.viewAll")}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}

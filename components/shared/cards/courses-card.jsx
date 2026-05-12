"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock, Users, Star, ArrowRight, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import courses from "../../../constants";

export default function Courses({ simpleMode = false, forcedCategory = null }) {
  const categories = [
    "Til kurslari",
    "Aniq fanlar",
    "Ijtimoiy fanlar",
    "Imtihon tayyorlov",
    "Maktab tayyorlov",
    "Kasbiy rivojlanish",
    "IT kurslar",
    "Bolalar kurslari",
  ];

  const [activeCategory, setActiveCategory] = useState("Til kurslari");
  const { t } = useTranslation();

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const hasForcedCategory = Boolean(forcedCategory);
  const filteredCourses = hasForcedCategory
    ? forcedCategory === "all"
      ? courses
      : courses.filter((c) => c.category === forcedCategory)
    : simpleMode
      ? courses
      : activeCategory === "Barchasi"
        ? courses
        : courses.filter((c) => c.category === activeCategory);

  const getInitials = (name = "") =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  const isTop = (course) => parseFloat(course.rating) >= 5.0;

  return (
    <section
      id="courses"
      className={simpleMode ? "bg-white" : "py-20 bg-white dark:bg-[#0B0F14]"}
    >
      <div className={simpleMode ? "mx-auto w-full" : "max-w-7xl mx-auto px-6"}>
        {!simpleMode && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12"
          >
            <p className="text-green-500 font-semibold tracking-[0.3em] text-xs uppercase">
              {t("courses.badge")}
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-3 tracking-tight">
              {t("courses.title")}{" "}
              <span className="text-gray-900 dark:text-white">
                {t("courses.titleHighlight")}
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mt-4">
              {t("courses.description")}
            </p>
          </motion.div>
        )}

        {!simpleMode && !hasForcedCategory && (
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition border ${
                    active
                      ? "bg-gray-900 text-white border-gray-900 shadow-md dark:bg-white dark:text-gray-900 dark:border-white"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:bg-[#0F172A] dark:text-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        <div
          className={`${
            simpleMode
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {filteredCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/40 transition overflow-hidden h-full flex flex-col"
              >
                {/* IMAGE with overlays */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={course.image}
                    width={400}
                    height={250}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Green tinted gradient for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-emerald-700/10 to-emerald-500/10 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-500/30 via-transparent to-transparent" />

                  {/* Top badge */}
                  <div className="absolute top-3 left-3">
                    {isTop(course) ? (
                      <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur text-gray-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow">
                        <Flame size={11} className="text-orange-500" />
                        TOP
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-white/95 backdrop-blur text-gray-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow">
                        {course.category.split(" ")[0]}
                      </span>
                    )}
                  </div>

                  {/* Rating bottom-left */}
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur text-gray-900 px-2.5 py-1 rounded-full text-xs font-bold shadow">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {course.rating}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 leading-snug line-clamp-2 min-h-[3rem]">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-white text-[10px] flex items-center justify-center font-bold">
                      {getInitials(course.instructor)}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {course.instructor}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pb-4 mb-4 border-b border-gray-100 dark:border-gray-800">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={13} />
                      {course.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={13} />
                      {course.students}
                    </span>
                  </div>

                  {/* Price + Batafsil */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-extrabold text-gray-900 dark:text-white text-base">
                      {course.price}
                    </span>
                    <span className="inline-flex items-center gap-1 text-green-500 group-hover:text-green-600 text-sm font-semibold transition">
                      {t("courses.enroll")?.replace("→", "").trim() || "Batafsil"}
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {!simpleMode && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-center mt-12"
          >
            <button className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 font-medium transition group">
              {t("courses.viewAll")?.replace("→", "").trim() ||
                "Barcha kurslarni ko'rish"}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </motion.div>
        )}

        {!simpleMode && filteredCourses.length === 0 && (
          <p className="text-center mt-10 text-gray-500">
            Bu kategoriyada kurslar mavjud emas
          </p>
        )}
      </div>
    </section>
  );
}

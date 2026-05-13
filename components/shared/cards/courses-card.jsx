"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock, Users, Star, ArrowRight, Flame, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import courses from "../../../constants";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function isTop(course) {
  return parseFloat(course.rating) >= 5.0;
}

export function CourseCard({ course }) {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-2xl hover:shadow-black/10 dark:border-gray-800 dark:bg-[#0F172A] dark:hover:shadow-black/40"
    >
      <Link
        href={`/courses/${course.id}`}
        className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0F172A]"
        aria-label={`${course.title} — batafsil`}
      />
      <div className="pointer-events-none relative z-10 flex flex-1 flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={course.image}
            width={400}
            height={250}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-emerald-700/10 to-emerald-500/10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-green-500/30 via-transparent to-transparent" />

          <div className="absolute top-3 left-3">
            {isTop(course) ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase shadow backdrop-blur">
                <Flame size={11} className="text-orange-500" />
                TOP
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase shadow backdrop-blur">
                {course.category.split(" ")[0]}
              </span>
            )}
          </div>

          <button
            type="button"
            aria-label={liked ? "Yoqtirilganlardan olib tashlash" : "Yoqtirish"}
            aria-pressed={liked}
            onClick={(e) => {
              e.preventDefault();
              setLiked((v) => !v);
            }}
            className="pointer-events-auto absolute top-3 right-3 z-20 flex size-9 items-center justify-center rounded-full bg-black/30 text-white shadow-md backdrop-blur-sm transition hover:bg-black/45 dark:bg-white/15 dark:hover:bg-white/25"
          >
            <Heart
              size={18}
              className={
                liked
                  ? "fill-red-500 text-red-500"
                  : "text-white drop-shadow-sm"
              }
              strokeWidth={liked ? 0 : 2}
            />
          </button>

          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-gray-900 shadow backdrop-blur">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              {course.rating}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-3 line-clamp-2 min-h-[3rem] font-bold leading-snug text-gray-900 dark:text-white">
            {course.title}
          </h3>

          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-[10px] font-bold text-white">
              {getInitials(course.instructor)}
            </span>
            <span className="truncate text-xs text-gray-600 dark:text-gray-400">
              {course.instructor}
            </span>
          </div>

          <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} />
              {course.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users size={13} />
              {course.students}
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-base font-extrabold text-gray-900 dark:text-white">
              {course.price}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-500 transition group-hover:text-green-600">
              {t("courses.enroll")?.replace("→", "").trim() || "Batafsil"}
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

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

  return (
    <section
      id="courses"
      className={simpleMode ? "bg-white" : "bg-white py-20 dark:bg-[#0B0F14]"}
    >
      <div className={simpleMode ? "mx-auto w-full" : "mx-auto max-w-7xl px-6"}>
        {!simpleMode && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-12 text-center"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-green-500 uppercase">
              {t("courses.badge")}
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              {t("courses.title")}{" "}
              <span className="text-gray-900 dark:text-white">
                {t("courses.titleHighlight")}
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-gray-400">
              {t("courses.description")}
            </p>
          </motion.div>
        )}

        {!simpleMode && !hasForcedCategory && (
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                    active
                      ? "border-gray-900 bg-gray-900 text-white shadow-md dark:border-white dark:bg-white dark:text-gray-900"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-[#0F172A] dark:text-gray-300 dark:hover:border-gray-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        <div
          className={
            simpleMode
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          }
        >
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {!simpleMode && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <button
              type="button"
              className="group inline-flex items-center gap-2 font-medium text-gray-700 transition hover:text-green-500 dark:text-gray-200 dark:hover:text-green-400"
            >
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
          <p className="mt-10 text-center text-gray-500">
            Bu kategoriyada kurslar mavjud emas
          </p>
        )}
      </div>
    </section>
  );
}

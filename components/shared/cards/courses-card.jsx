"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock, Users, Star } from "lucide-react";
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

  // 🔹 ACTIVE CATEGORY
  const [activeCategory, setActiveCategory] = useState("Til kurslari");
  const { t } = useTranslation();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // 🔹 COURSES DATA

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
    <section className={simpleMode ? "bg-white" : "py-20 bg-white dark:bg-[#0B0F14]"}>
      <section className="courses-section">
        <div className={simpleMode ? "mx-auto w-full" : "max-w-7xl mx-auto px-6"}>
          {!simpleMode && (
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-green-500 font-semibold tracking-widest text-sm">
                {t("courses.badge")}
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-[#E5E7EB] mt-3">
                {t("courses.title")}{" "}
                <span className="text-green-500">
                  {t("courses.titleHighlight")}
                </span>
              </h2>

              <p className="text-gray-600 dark:text-[#9CA3AF] max-w-xl mx-auto mt-4">
                {t("courses.description")}
              </p>
            </motion.div>
          )}

          {!simpleMode && !hasForcedCategory && (
            <div className="flex justify-center mb-12">
              <div className="flex gap-2 w-full bg-gray-100 dark:bg-[#111827] p-2 rounded-full">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 w-full rounded-full text-[12px] transition ${
                      activeCategory === cat
                        ? "bg-green-500 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#1F2937]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={`${simpleMode ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"}`}>
            {filteredCourses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-[#0F172A] border rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  {/* IMAGE */}
                  <Image
                    src={course.image}
                    width={400}
                    height={250}
                    alt={course.title}
                    className="w-full h-52 object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-5">
                    <h3 className="font-semibold mb-2">{course.title}</h3>

                    <p className="text-sm text-gray-500 mb-3">
                      {course.instructor}
                    </p>

                    {/* STATS */}
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {course.duration}
                      </div>

                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        {course.students}
                      </div>

                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={14} fill="currentColor" />
                        {course.rating}
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{course.price}</span>

                      <button className="text-green-500 hover:text-green-400">
                        Batafsil
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {!simpleMode && (
            <motion.div variants={fadeUp} className="flex justify-center mt-14">
              <button className="border border-gray-300 dark:border-[#1F2937] px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-[#111827] dark:text-[#E5E7EB] transition">
                {t("courses.viewAll")}
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
    </section>
  );
}

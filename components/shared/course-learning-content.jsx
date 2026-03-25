"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock3,
  Mic,
  Star,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import courses from "@/constants";
import Courses from "@/components/shared/cards/courses-card";

function CertificationCard({ title, level, description, onExplore }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-3 inline-flex rounded-lg bg-emerald-100 p-2 text-emerald-700">
        <Mic size={16} />
      </div>
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mb-4 text-xs text-gray-500">{level}</p>
      <p className="mb-5 text-xs text-gray-600">{description}</p>
      <button
        onClick={onExplore}
        className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700"
      >
        Explore Path
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

const sidebarCategoryMap = {
  "all-lessons": "all",
  "til-kurslari": "Til kurslari",
  "aniq-fanlar": "Aniq fanlar",
  "ijtimoiy-fanlar": "Ijtimoiy fanlar",
  "imtihon-tayyorlov": "Imtihon tayyorlov",
  "maktab-tayyorlov": "Maktab tayyorlov",
  "kasbiy-rivojlanish": "Kasbiy rivojlanish",
  "it-kurslar": "IT kurslar",
  "bolalar-kurslari": "Bolalar kurslari",
};

const labelMap = {
  "all-lessons": "All Lessons",
  "til-kurslari": "Til kurslari",
  "aniq-fanlar": "Aniq fanlar",
  "ijtimoiy-fanlar": "Ijtimoiy fanlar",
  "imtihon-tayyorlov": "Imtihon tayyorlov",
  "maktab-tayyorlov": "Maktab tayyorlov",
  "kasbiy-rivojlanish": "Kasbiy rivojlanish",
  "it-kurslar": "IT kurslar",
  "bolalar-kurslari": "Bolalar kurslari",
};

export default function CourseLearningContent({
  courseId = "1",
  selectedMenuItem = "all-lessons",
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all-levels");
  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState("all-categories");
  const router = useRouter();
  const selectedCourse =
    courses.find((course) => String(course.id) === String(courseId)) ||
    courses[0];
  const selectedCategory = sidebarCategoryMap[selectedMenuItem] || "all";
  const listForCategory =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);
  const subjects = [...new Set(listForCategory.map((course) => course.title))];
  const teachers = [
    ...new Set(listForCategory.map((course) => course.instructor)),
  ];
  const averageRating = (
    listForCategory.reduce((sum, item) => sum + Number(item.rating || 0), 0) /
    (listForCategory.length || 1)
  ).toFixed(1);
  const sectionTitle =
    labelMap[selectedMenuItem] || selectedCourse?.category || "All Lessons";
  const courseImage =
    selectedCourse?.image || "/assets/courses/course-img-1.jpg";
  const isAllLessons = selectedCategory === "all";
  const deriveLevelFromDuration = (durationText = "") => {
    const month = Number(String(durationText).replace(/[^\d]/g, "")) || 0;
    if (month >= 6) return "advanced";
    if (month >= 4) return "intermediate";
    return "beginner";
  };
  const levelLabelMap = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };
  
  const filteredAllLessons = useMemo(() => {
    return courses.filter((course) => {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const courseLevel = deriveLevelFromDuration(course.duration);
      const matchQuery =
        !normalizedQuery ||
        course.title.toLowerCase().includes(normalizedQuery) ||
        course.instructor.toLowerCase().includes(normalizedQuery) ||
        course.category.toLowerCase().includes(normalizedQuery);
      const matchLevel =
        selectedLevel === "all-levels" || courseLevel === selectedLevel;
      const matchCategory =
        selectedCategoryFilter === "all-categories" ||
        course.category === selectedCategoryFilter;

      return matchQuery && matchLevel && matchCategory;
    });
  }, [searchQuery, selectedLevel, selectedCategoryFilter]);
  const courseDescription = isAllLessons
    ? "Barcha yo'nalishlar bo'yicha kurslar to'plami. Har bir bo'limda real loyihalar, amaliy mashg'ulotlar va mentorlik mavjud."
    : `${sectionTitle} bo'limida ${subjects.length} ta yo'nalish o'qitiladi va ${teachers.length} nafar o'qituvchi dars beradi.`;

  return (
    <section
      className={`rounded-2xl p-4 md:p-6 ${
        isAllLessons
          ? "bg-linear-to-br from-slate-950 via-slate-900 to-emerald-950"
          : "bg-[#f2f7f5]"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          className={`inline-flex items-center gap-1 text-sm ${
            isAllLessons ? "text-emerald-200" : "text-emerald-700"
          }`}
        >
          <ArrowLeft size={14} />
          Back to Courses
        </button>
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            isAllLessons
              ? "border border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          Recommended
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          {isAllLessons ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-extrabold text-white md:text-5xl">
                    All Lessons <span className="text-emerald-400">bo&apos;limi</span>
                  </h1>
                  <p className="mt-4 max-w-2xl text-base text-slate-300">
                    O&apos;zbekistonning eng sara o&apos;qituvchilari tomonidan tayyorlangan interaktiv
                    darslar jamlanmasi. Bilimingizni yangi bosqichga olib chiqing.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      Jami kurslar
                    </p>
                    <p className="mt-1 text-3xl font-semibold text-emerald-300">{courses.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      Yo&apos;nalishlar
                    </p>
                    <p className="mt-1 text-3xl font-semibold text-emerald-300">
                      {new Set(courses.map((course) => course.category)).size}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      O&apos;rtacha reyting
                    </p>
                    <p className="mt-1 text-3xl font-semibold text-emerald-300">{averageRating}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-linear-to-r from-slate-950/80 via-slate-950/50 to-emerald-950/20 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <p className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-200">
                  Hafta tavsiyasi
                </p>
                <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
                  IELTS Masterclass:
                  <br />
                  <span className="text-emerald-400">8.0+ Band Score</span>
                </h2>
                <p className="mt-4 max-w-2xl text-base text-slate-300">
                  Nafaqat til bilish, balki imtihon strategiyalarini mukammal o&apos;rganing.
                  Britaniyalik ekspertlar bilan birgalikda yaratilgan maxsus kurs.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button className="rounded-xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_8px_30px_rgba(52,211,153,0.4)] transition hover:bg-emerald-300">
                    Book Your Seat
                  </button>
                  <button className="rounded-xl border border-white/10 bg-white/0 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5">
                    Kurs haqida
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                {sectionTitle}
              </p>
              <h1 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">{`${sectionTitle} bo'limi`}</h1>
              <p className="mt-3 max-w-2xl text-sm text-gray-600">{courseDescription}</p>
            </>
          )}

          {isAllLessons ? (
            <div className="mt-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/4 p-4 md:p-5"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search courses..."
                    className="flex-1 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-emerald-300/60"
                  />
                </div>

                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      Barcha lesson cardlari
                    </h2>
                    <p className="mt-1 text-sm text-slate-300">
                      {
                        "Har bir kurs bo`yicha umumiy ma`lumot, mentor va natijalar bir sahifada."
                      }
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100">
                    {"Professional katalog"}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredAllLessons.map((course, idx) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.03 }}
                    >
                      <Link href={`/courses/${course.id}`}>
                        <article className="h-full rounded-2xl border border-emerald-300/20 bg-linear-to-b from-slate-900 to-slate-950 p-4 shadow-[0_0_0_1px_rgba(16,185,129,0.05)] transition hover:-translate-y-1 hover:border-emerald-300/50 hover:shadow-[0_10px_35px_rgba(16,185,129,0.18)]">
                          <div className="flex items-center justify-between">
                            <p className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-emerald-200">
                              <BookOpen size={12} />
                              {course.category}
                            </p>
                            <span className="rounded-full bg-indigo-400/20 px-2 py-1 text-xs text-indigo-100">
                              {
                                levelLabelMap[
                                  deriveLevelFromDuration(course.duration)
                                ]
                              }
                            </span>
                          </div>

                          <h3 className="mt-3 text-lg font-semibold text-white">
                            {course.title}
                          </h3>
                          <p className="mt-1 text-sm text-slate-300">
                            {course.instructor}
                          </p>

                          <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
                            <span className="inline-flex items-center gap-1">
                              <Clock3 size={13} />
                              {course.duration}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Users size={13} />
                              {course.students}
                            </span>
                            <span className="inline-flex items-center gap-1 text-yellow-300">
                              <Star size={13} fill="currentColor" />
                              {course.rating}
                            </span>
                          </div>

                          <div className="mt-4 rounded-xl border border-emerald-300/25 bg-emerald-500/10 px-3 py-2 text-center text-sm font-medium text-emerald-100">
                            View Course
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                {filteredAllLessons.length === 0 && (
                  <p className="mt-4 rounded-xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-slate-300">
                    Filter bo`yicha kurs topilmadi. Qidiruv yoki select
                    qiymatlarini o`zgartirib ko`ring.
                  </p>
                )}
              </motion.div>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl bg-[#eaf2ee] p-4 md:p-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {"O'qitiladigan fanlar"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {"Ushbu bo'limdagi asosiy kurslar va o'qituvchilar."}
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {subjects.slice(0, 4).map((subject, idx) => (
                  <CertificationCard
                    key={subject}
                    title={subject}
                    level={
                      selectedCategory === "all"
                        ? "Ko'p yo'nalishli ta'lim"
                        : sectionTitle
                    }
                    description={`${teachers[idx % teachers.length] || "Mentor jamoasi"} tomonidan olib boriladi`}
                    onExplore={() =>
                      router.push(
                        `/courses/${courseId}?program=ielts-intensive`,
                      )
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <aside
          className={`rounded-3xl p-5 text-white ${isAllLessons ? "bg-slate-900/80 border border-white/10" : "bg-emerald-800"}`}
        >
          <h3 className="text-2xl font-bold">{sectionTitle}</h3>
          <p
            className={`mt-2 text-sm ${isAllLessons ? "text-slate-300" : "text-emerald-100"}`}
          >
            {teachers.slice(0, 3).join(", ")} bilan real-time darslar va
            haftalik topshiriqlar.
          </p>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Clock3 size={15} />
              <span>{`Yo'nalishlar soni: ${subjects.length}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={15} />
              <span>{`O'qituvchilar: ${teachers.length}`}</span>
            </div>
            {isAllLessons && (
              <div className="flex items-center gap-2">
                <Star size={15} />
                <span>{`O'rtacha reyting: ${averageRating}`}</span>
              </div>
            )}
          </div>

          <div
            className={`mt-5 overflow-hidden rounded-2xl ${
              isAllLessons
                ? "border border-white/10 bg-slate-800/70"
                : "border border-emerald-600 bg-emerald-900/60"
            }`}
          >
            <Image
              src={courseImage}
              alt={sectionTitle}
              width={360}
              height={180}
              className="h-36 w-full object-cover"
            />
          </div>

          <button className="mt-5 w-full rounded-full bg-white py-3 text-sm font-semibold text-emerald-800">
            Book Your Seat
          </button>
        </aside>
      </div>

      {!isAllLessons && (
        <div className="mt-8">
          <Courses simpleMode forcedCategory={selectedCategory} />
        </div>
      )}
    </section>
  );
}

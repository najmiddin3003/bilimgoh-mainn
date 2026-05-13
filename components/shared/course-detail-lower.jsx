"use client";

import { useState } from "react";
import { Check, Star } from "lucide-react";

import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "Umumiy" },
  { id: "syllabus", label: "Dastur" },
  { id: "teacher", label: "Ustoz" },
  { id: "reviews", label: "Sharhlar" },
];

function learningOutcomes(course) {
  const t = (course.title || "").toLowerCase();
  if (t.includes("ielts")) {
    return [
      "Listening strategiyalar — 4 qisim va akademik eshitish.",
      "Reading — skim, scan va moslashtirish usullari.",
      "Writing Task 1 — diagram, jadval va rasm shakllari.",
      "Writing Task 2 — argumentativ insholar, fikr va muhokama mavzulari.",
      "Speaking Part 1, 2, 3 — ravon javoblar, Cue card va follow-up savollar.",
      "Akademik lexika — 2000+ Band 7+ so'z va iboralar.",
      "Vaqt boshqaruvi — har bir bo'lim uchun maxsus strategiyalar.",
      "Stress boshqaruvi va imtihon kunidagi etika.",
    ];
  }
  if (t.includes("react") || t.includes("frontend") || t.includes("node") || t.includes("python")) {
    return [
      "Zamonaviy texnologiyalar va loyiha tuzilmasi.",
      "Komponentlar, holat va marshrutlash (routing).",
      "API bilan ishlash va ma'lumotlarni boshqarish.",
      "Git va jamoaviy ish jarayoni.",
      "UI/UX asoslari va responsiv dizayn.",
      "Xavfsizlik va optimallashtirish tamoyillari.",
      "Real loyiha ustida amaliyot.",
      "Deploy va monitoringga kirish.",
    ];
  }
  return [
    `${course.category} bo'yicha nazariy va amaliy modullar.`,
    "Mashqlar va uy vazifalari bilan bilimni mustahkamlash.",
    "Video darslar va qo'shimcha materiallar.",
    "Mentor bilan savol-javob sessiyalari.",
    "Modul yakuniy testlari va tahlil.",
    "Keyingi bosqichga yo'l-yo'riq va resurslar.",
    "Sertifikat va natijalarni hujjatlashtirish.",
    "Kichik guruhda qo'llab-quvvatlash.",
  ];
}

function aboutParagraphs(course) {
  const t = (course.title || "").toLowerCase();
  const inst = course.instructor || "mentor";
  if (t.includes("ielts")) {
    return [
      `IELTS Intensive dasturi ${inst} tomonidan ishlab chiqilgan — u o'quchilarning 6.5+ ballga chiqishidagi tajribasini Cambridge va British Council materiallari bilan birlashtiradi.`,
      "Har bir modul real imtihon formatiga yaqin topshiriqlar, audio va yozma namunalardan foydalanadi. Guruhda va individual tahlil orqali zaif tomonlaringiz tez aniqlanadi.",
      "Oxirgi uch yilda dastur bitiruvchilarning 90% dan ortig'i 6.5 yoki undan yuqori ball oldi. Siz ham shu yo'l bilan barqaror natijaga erishishingiz mumkin.",
    ];
  }
  return [
    `${course.title} kursi ${inst} va jamoamiz tomonidan ${course.category} bo'yicha zamonaviy metodika asosida tuzilgan.`,
    `Dastur ${course.duration || "bir necha oy"} davomida video darslar, jonli sessiyalar va amaliy mashqlarni o'z ichiga oladi. Har bir bosqich yakunida bilimni tekshirish uchun testlar beriladi.`,
    "Maqsadlaringizga mos individual tavsiyalar va keyingi o'qish yo'nalishlari bo'yicha yo'l-yo'riq bilan ta'minlanasiz.",
  ];
}

function requirements(course) {
  const t = (course.title || "").toLowerCase();
  const base = [
    "Kompyuter yoki smartfon va barqaror internet.",
    "Maqsad va intiluvchanlik — eng muhim talab.",
  ];
  if (t.includes("ielts")) {
    return [
      "Ingliz tili darajasi B1 (Intermediate) yoki undan yuqori.",
      "Haftasiga kamida 8–10 soat vaqt ajratish imkoniyati.",
      ...base,
    ];
  }
  return [
    `${course.category} bo'yicha boshlang'ich bilim yoki qiziqish.`,
    "Haftasiga kamida 6–8 soat mustaqil o'qish va mashq uchun vaqt.",
    ...base,
  ];
}

function syllabusBlocks() {
  return [
    { title: "1-modul", text: "Kirish va asosiy tushunchalar, maqsadlarni belgilash." },
    { title: "2-modul", text: "Amaliy mashqlar va real vaziyatlar bo'yicha tahlil." },
    { title: "3-modul", text: "Chuqurlashtirish va individual feedback." },
    { title: "4-modul", text: "Yakuniy loyiha / imtihon simulyatsiyasi va sertifikat." },
  ];
}

const MOCK_REVIEWS = [
  {
    name: "Madina K.",
    rating: 5,
    text: "Mentor juda tushunarli tushuntirdi, vaqtimni yaxshi rejalashtirdim.",
  },
  {
    name: "Jasur T.",
    rating: 5,
    text: "Materiallar yangi, mashqlar imtihonga yaqin — tavsiya qilaman.",
  },
];

export default function CourseDetailLower({ course }) {
  const [tab, setTab] = useState("overview");
  const outcomes = learningOutcomes(course);
  const about = aboutParagraphs(course);
  const reqs = requirements(course);
  const modules = syllabusBlocks();

  return (
    <section className="border-t border-gray-100 bg-white py-10 dark:border-gray-800 dark:bg-[#0b0f14] sm:py-14">
      <div className="mx-auto w-[96%] max-w-6xl px-2">
        <div
          className="flex gap-1 overflow-x-auto border-b border-gray-200 pb-px dark:border-gray-800"
          role="tablist"
          aria-label="Kurs bo'limlari"
        >
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                "relative shrink-0 rounded-t-lg px-4 py-3 text-sm font-medium transition outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 sm:px-5 sm:text-base",
                tab === id
                  ? "text-gray-900 after:absolute after:right-4 after:-bottom-px after:left-4 after:h-0.5 after:rounded-full after:bg-gray-900 dark:text-white dark:after:bg-white sm:after:right-5 sm:after:left-5"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {tab === "overview" && (
            <div className="space-y-12">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                  Nimalarni o&apos;rganasiz
                </h2>
                <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50/50 p-5 sm:p-8 dark:border-gray-800 dark:bg-gray-900/40">
                  <ul className="grid gap-4 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-4">
                    {outcomes.map((line, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-[15px]"
                      >
                        <Check
                          className="mt-0.5 size-5 shrink-0 text-emerald-500"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                  Kurs haqida
                </h2>
                <div className="mt-4 max-w-3xl space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                  {about.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                  Talablar
                </h2>
                <ul className="mt-5 max-w-2xl space-y-4">
                  {reqs.map((line, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-[15px]"
                    >
                      <span
                        className="mt-2 size-2 shrink-0 rounded-full bg-orange-400 ring-4 ring-orange-100 dark:ring-orange-950/60"
                        aria-hidden
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === "syllabus" && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                Dastur
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {course.duration} davomida modullar ketma-ket o&apos;tiladi.
              </p>
              <ol className="mt-8 space-y-6 border-l-2 border-emerald-200 pl-6 dark:border-emerald-800">
                {modules.map((m, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[29px] top-1 flex size-4 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white dark:bg-emerald-400 dark:ring-[#0b0f14]" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {m.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {tab === "teacher" && (
            <div className="max-w-xl">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                Ustoz
              </h2>
              <div className="mt-6 flex gap-4 rounded-2xl border border-gray-200 bg-gray-50/80 p-6 dark:border-gray-800 dark:bg-gray-900/50">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-lg font-bold text-white">
                  {(course.instructor || "?")
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()}
                </span>
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {course.instructor}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {course.category} bo&apos;yicha tajribali mentor. Darslarni amaliy
                    misollar va zamonaviy materiallar bilan olib boradi.
                  </p>
                </div>
              </div>
            </div>
          )}

          {tab === "reviews" && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                Sharhlar
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {MOCK_REVIEWS.map((r, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5 dark:border-gray-800 dark:bg-gray-900/40"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {r.name}
                      </span>
                      <span className="flex text-amber-500">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Star key={j} className="size-4 fill-current" aria-hidden />
                        ))}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                      {r.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

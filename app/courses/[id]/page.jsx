import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Clock,
  Star,
  Users,
  Video,
} from "lucide-react";

import Navbar from "@/components/shared/navbar";
import CourseDetailLower from "@/components/shared/course-detail-lower";
import CourseEnrollCard from "@/components/shared/course-enroll-card";
import SimilarCoursesSection from "@/components/shared/similar-courses-section";
import courses from "@/constants";

function findCourse(id) {
  const n = Number(id);
  if (!Number.isFinite(n)) return undefined;
  return courses.find((c) => c.id === n);
}

function parsePriceNum(price) {
  const p = String(price).toLowerCase();
  if (p.includes("bepul")) return 0;
  return parseInt(String(price).replace(/\D/g, ""), 10) || 0;
}

function formatWithSpaces(num) {
  return String(Math.max(0, Math.floor(num))).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function parseStudentsCount(s) {
  const t = String(s).trim();
  const km = t.match(/^([\d.]+)\s*K$/i);
  if (km) return Math.round(parseFloat(km[1]) * 1000);
  const n = parseInt(t.replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export async function generateMetadata(props) {
  const params = await props.params;
  const course = findCourse(params.id);
  return {
    title: course ? `${course.title} | Bilimgoh` : "Kurs | Bilimgoh",
    description: course
      ? `${course.title} — ${course.category} kursi, ${course.duration}.`
      : undefined,
  };
}

export default async function Page(props) {
  const params = await props.params;
  const course = findCourse(params.id);
  if (!course) notFound();

  const priceNum = parsePriceNum(course.price);
  const oldPriceNum =
    priceNum > 0 ? Math.ceil(priceNum / 0.67 / 10000) * 10000 : 0;
  const discountPct =
    priceNum > 0 && oldPriceNum > 0
      ? Math.round((1 - priceNum / oldPriceNum) * 100)
      : 0;
  const monthlyNum =
    priceNum > 0 ? Math.ceil(priceNum / 3 / 1000) * 1000 : 0;
  const oldPriceFormatted =
    oldPriceNum > 0 ? `${formatWithSpaces(oldPriceNum)} so'm` : null;
  const monthlyLabel =
    priceNum > 0
      ? `yoki ${formatWithSpaces(monthlyNum)} so'm/oy 3 oy bo'lib to'lash`
      : null;

  const ratingNum = parseFloat(course.rating);
  const isPopular = ratingNum >= 4.9;
  const reviewCount = 600 + course.id * 97;
  const studentCount = parseStudentsCount(course.students);
  const videoHours = 40 + (course.id % 16);

  const titleHighlight = course.title.toLowerCase().includes("ielts")
    ? "6.5+ kafolati bilan"
    : "sifatli ta'lim bilan";

  const description = `${course.title} — ${course.category} bo'yicha ${course.duration} davom etadigan dastur. Amaliy mashqlar, video darslar va mentor qo'llab-quvvatlashi bilan bilimingizni mustahkamlang. Kurs oxirida sertifikat va keyingi bosqichga yo'l-yo'riq beriladi.`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 pb-16 pt-6 text-white sm:pb-20 sm:pt-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_55%)]" />

        <div className="relative z-10 mx-auto w-[96%] max-w-6xl px-2">
          <nav
            className="mb-8 flex flex-wrap items-center gap-1 text-sm text-white/70"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition hover:text-white">
              Bosh sahifa
            </Link>
            <ChevronRight className="size-4 shrink-0 opacity-60" aria-hidden />
            <Link href="/all-courses" className="transition hover:text-white">
              Kurslar
            </Link>
            <ChevronRight className="size-4 shrink-0 opacity-60" aria-hidden />
            <Link
              href="/all-courses"
              className="max-w-[10rem] truncate transition hover:text-white sm:max-w-xs"
            >
              {course.category}
            </Link>
            <ChevronRight className="size-4 shrink-0 opacity-60" aria-hidden />
            <span className="max-w-[12rem] truncate font-medium text-white sm:max-w-md">
              {course.title}
            </span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] xl:grid-cols-[1fr_minmax(0,24rem)] lg:items-start lg:gap-12">
            <div>
              {isPopular ? (
                <span className="mb-4 inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold tracking-wide text-white uppercase shadow">
                  <Star
                    className="size-3.5 fill-white text-white"
                    aria-hidden
                  />
                  Eng mashhur
                </span>
              ) : (
                <span className="mb-4 inline-block rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/95 uppercase backdrop-blur">
                  {course.category}
                </span>
              )}

              <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                {course.title}
                <span className="text-amber-300"> — {titleHighlight}</span>
              </h1>

              <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/90 sm:text-lg">
                {description}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <Star
                    className="mb-2 size-5 fill-amber-400 text-amber-400"
                    aria-hidden
                  />
                  <p className="text-lg font-bold">
                    {course.rating}{" "}
                    <span className="text-sm font-normal text-white/80">
                      ({formatWithSpaces(reviewCount)})
                    </span>
                  </p>
                  <p className="text-xs text-white/70">Reyting</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <Users className="mb-2 size-5 text-white/90" aria-hidden />
                  <p className="text-lg font-bold">
                    {formatWithSpaces(studentCount)}
                  </p>
                  <p className="text-xs text-white/70">Talaba</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <Clock className="mb-2 size-5 text-white/90" aria-hidden />
                  <p className="text-lg font-bold">{course.duration}</p>
                  <p className="text-xs text-white/70">Davomiyligi</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <Video className="mb-2 size-5 text-white/90" aria-hidden />
                  <p className="text-lg font-bold">{videoHours} soat</p>
                  <p className="text-xs text-white/70">Video kontent</p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-white shadow-lg">
                  {getInitials(course.instructor)}
                </span>
                <div>
                  <p className="text-xs font-medium text-white/70">
                    Bosh ustoz
                  </p>
                  <p className="text-base font-semibold">{course.instructor}</p>
                </div>
              </div>
            </div>

            <CourseEnrollCard
              courseId={course.id}
              image={course.image}
              title={course.title}
              currentPriceLabel={course.price}
              currentPriceNum={priceNum}
              oldPriceFormatted={oldPriceFormatted}
              discountPct={discountPct}
              monthlyLabel={monthlyLabel}
            />
          </div>
        </div>
      </section>

      <CourseDetailLower
        course={{
          title: course.title,
          category: course.category,
          instructor: course.instructor,
          duration: course.duration,
        }}
      />

      <SimilarCoursesSection
        currentCourseId={course.id}
        category={course.category}
      />

      <div
        className="fixed bottom-6 left-4 z-40 hidden max-w-xs rounded-xl border border-gray-200 bg-white/95 p-3 text-xs text-gray-700 shadow-lg sm:block dark:border-gray-700 dark:bg-gray-900/95 dark:text-gray-200"
        role="status"
      >
        <span className="font-semibold text-gray-900 dark:text-white">
          Bobur S.
        </span>{" "}
        Samarqanddan Premium tarifga o&apos;tdi • 18 daqiqa oldin
      </div>

      <a
        href="https://t.me/bilimgoh"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 z-40 flex size-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg transition hover:bg-sky-600"
        aria-label="Telegram orqali yozish"
      >
        <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      </a>
    </div>
  );
}

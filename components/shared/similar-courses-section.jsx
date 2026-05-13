import Link from "next/link";
import { ArrowRight, PenLine, Star } from "lucide-react";

import courses from "@/constants";
import { cn } from "@/lib/utils";

function pickSimilar(all, currentId, category, limit = 3) {
  const notSelf = (c) => c.id !== currentId;
  const same = all.filter((c) => notSelf(c) && c.category === category);
  const rest = all.filter((c) => notSelf(c) && c.category !== category);
  const out = [];
  for (const c of same) {
    if (out.length >= limit) break;
    out.push(c);
  }
  for (const c of rest) {
    if (out.length >= limit) break;
    if (!out.some((x) => x.id === c.id)) out.push(c);
  }
  return out.slice(0, limit);
}

function thumbLabel(title) {
  const t = (title || "").toUpperCase();
  if (t.includes("TOEFL")) return { type: "text", value: "TOEFL" };
  if (t.includes("IELTS")) return { type: "text", value: "IELTS" };
  if (t.includes("C1") || t.includes("CEFR")) return { type: "text", value: "C1" };
  const w = (title || "").trim().split(/\s+/)[0] || "KURS";
  return { type: "text", value: w.slice(0, 5).toUpperCase() };
}

function usePenIcon(title) {
  const t = (title || "").toLowerCase();
  return (
    t.includes("design") ||
    t.includes("ux") ||
    t.includes("copy") ||
    t.includes("writing") ||
    t.includes("essay")
  );
}

function reviewCountFor(id) {
  return 120 + ((id * 47) % 800);
}

const GRADIENTS = [
  "bg-gradient-to-br from-blue-600 to-indigo-800",
  "bg-gradient-to-br from-emerald-600 to-teal-800",
  "bg-gradient-to-br from-rose-600 to-orange-800",
];

export default function SimilarCoursesSection({ currentCourseId, category }) {
  const similar = pickSimilar(courses, currentCourseId, category, 3);
  if (similar.length === 0) return null;

  return (
    <section className="border-t border-gray-100 bg-white py-12 dark:border-gray-800 dark:bg-[#0b0f14] sm:py-14">
      <div className="mx-auto w-[96%] max-w-6xl px-2">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
            O&apos;xshash kurslar
          </h2>
          <Link
            href="/all-courses"
            className="inline-flex w-fit items-center gap-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:bg-gray-800"
          >
            Hammasini ko&apos;rish
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {similar.map((c, i) => {
            const thumb = thumbLabel(c.title);
            const pen = usePenIcon(c.title);
            const reviews = reviewCountFor(c.id);
            const grad = GRADIENTS[i % GRADIENTS.length];

            return (
              <li key={c.id}>
                <Link
                  href={`/courses/${c.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-[#111827]"
                >
                  <div
                    className={cn(
                      "relative flex h-36 items-center justify-center",
                      grad
                    )}
                  >
                    {pen ? (
                      <PenLine
                        className="size-14 text-white drop-shadow-md"
                        strokeWidth={2}
                        aria-hidden
                      />
                    ) : (
                      <span className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl">
                        {thumb.value}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="line-clamp-2 font-bold leading-snug text-gray-900 dark:text-white">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {c.instructor} · {c.duration}
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                        <Star
                          className="size-4 shrink-0 fill-amber-400 text-amber-400"
                          aria-hidden
                        />
                        {c.rating}{" "}
                        <span className="font-normal text-gray-500 dark:text-gray-400">
                          ({reviews})
                        </span>
                      </span>
                      <span className="shrink-0 text-right text-sm font-bold text-gray-900 dark:text-white">
                        {c.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

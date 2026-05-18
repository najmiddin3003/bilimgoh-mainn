"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, X } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { resolveLikedCourses } from "@/lib/course-catalog";
import { cn } from "@/lib/utils";

export default function LikedCoursesDropdown() {
  const { user, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const likedCourses = resolveLikedCourses(user?.likedCourseIds ?? []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex size-10 items-center justify-center rounded-xl border border-white/8 bg-[#131a26] transition-colors",
          open ? "text-rose-400" : "text-slate-300 hover:text-white",
        )}
        aria-label="Yoqtirilgan kurslar"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Heart
          className={cn(
            "size-[18px]",
            likedCourses.length > 0 && "fill-rose-500 text-rose-500",
          )}
        />
        {likedCourses.length > 0 && (
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            {likedCourses.length > 9 ? "9+" : likedCourses.length}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Yoqtirilgan kurslar"
          className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#131a26] shadow-2xl shadow-black/40"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">Yoqtirilgan kurslar</p>
              <p className="text-xs text-slate-500">
                {likedCourses.length} ta kurs
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white"
              aria-label="Yopish"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="max-h-[min(24rem,60vh)] overflow-y-auto p-2">
            {!isAuthenticated ? (
              <p className="px-3 py-6 text-center text-sm text-slate-400">
                <Link href="/auth" className="text-sky-400 hover:underline">
                  Kiring
                </Link>{" "}
                va kurslarni saqlang.
              </p>
            ) : likedCourses.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-slate-400">
                Hali yoqtirilgan kurs yo‘q. Kurs kartasidagi yurakchani bosing.
              </p>
            ) : (
              <ul className="space-y-1">
                {likedCourses.map((course) => (
                  <li key={course.id}>
                    <Link
                      href={`/courses/${course.id}`}
                      onClick={() => setOpen(false)}
                      className="flex gap-3 rounded-xl p-2.5 transition hover:bg-white/5"
                    >
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">
                          {course.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {course.instructor}
                        </p>
                        <p className="mt-1 text-xs font-medium text-emerald-400">
                          {course.price}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {isAuthenticated && likedCourses.length > 0 && (
            <div className="border-t border-white/10 p-2">
              <Link
                href="/all-courses"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-center text-xs font-medium text-sky-400 transition hover:bg-white/5"
              >
                Barcha kurslarni ko‘rish
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

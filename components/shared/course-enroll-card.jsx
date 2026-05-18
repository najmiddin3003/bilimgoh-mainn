"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Play, Heart, ArrowRight, Clock, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCourseLike } from "@/hooks/use-course-like";
import { cn } from "@/lib/utils";

function formatWithSpaces(num) {
  return String(Math.max(0, Math.floor(num))).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function introDescription(title) {
  const t = (title || "").toLowerCase();
  if (t.includes("ielts")) {
    return "IELTS imtihoni qanday tuzilgan? Birinchi 4 daqiqalik darsda kursning umumiy formati, ustoz, modullar va kutilayotgan natijalar haqida bilib oling.";
  }
  return `${title} kursi qanday tashkil etilganligi, dastur modullari va kutilayotgan natijalar haqida qisqa tanishuv darsida bilib oling.`;
}

export default function CourseEnrollCard({
  courseId,
  image,
  title,
  currentPriceLabel,
  currentPriceNum,
  oldPriceFormatted,
  discountPct,
  monthlyLabel,
}) {
  const [introOpen, setIntroOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { liked: saved, toggle: toggleSaved, loading: saveLoading } =
    useCourseLike(courseId);
  const endAt = useMemo(
    () => Date.now() + 5 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000,
    []
  );
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!introOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setIntroOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [introOpen]);

  const remaining = Math.max(0, endAt - now);
  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

  const isFree = !currentPriceNum || String(currentPriceLabel).toLowerCase().includes("bepul");

  return (
    <div className="relative z-20 -mt-4 w-full max-w-md shrink-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-[#0f172a] lg:sticky lg:top-28 lg:mt-0 lg:self-start">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-sky-600 to-indigo-700">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="(max-width: 1024px) 100vw, 400px"
        />
        <button
          type="button"
          onClick={() => setIntroOpen(true)}
          className="absolute inset-0 flex items-center justify-center transition hover:opacity-90"
          aria-haspopup="dialog"
          aria-expanded={introOpen}
          aria-label="Bepul tanishuv darsini ko'rish"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-white/95 text-sky-700 shadow-lg">
            <Play className="ml-1 size-8 fill-current" aria-hidden />
          </span>
        </button>
        <button
          type="button"
          onClick={() => setIntroOpen(true)}
          className="absolute bottom-2 left-2 right-2 flex items-center gap-2 rounded-lg bg-black/45 px-3 py-2 text-left text-xs font-medium text-white backdrop-blur-sm transition hover:bg-black/55"
        >
          <Play className="size-3.5 shrink-0 fill-white" aria-hidden />
          Bepul tanishuv darsi 4:32
        </button>
      </div>

      <div className="mt-6 space-y-1">
        {isFree ? (
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Bepul
          </p>
        ) : (
          <>
            <div className="flex flex-wrap items-end gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {formatWithSpaces(currentPriceNum)}
              </span>
              <span className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                so&apos;m
              </span>
            </div>
            {oldPriceFormatted ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="line-through">{oldPriceFormatted}</span>
                {discountPct > 0 ? (
                  <span className="ml-2 font-semibold text-amber-600">
                    -{discountPct}% chegirma
                  </span>
                ) : null}
              </p>
            ) : null}
            {monthlyLabel ? (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {monthlyLabel}
              </p>
            ) : null}
          </>
        )}
      </div>

      {!isFree ? (
        <div
          className={cn(
            "mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-amber-900 dark:text-amber-100",
            "bg-amber-50 dark:bg-amber-950/50"
          )}
        >
          <Clock className="size-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
          <span>
            {days} kun {hours} soat {minutes} daqiqa — chegirma tugaydi
          </span>
        </div>
      ) : null}

      <Button
        type="button"
        className="mt-5 h-12 w-full rounded-xl border-0 bg-amber-500 text-base font-semibold text-white hover:bg-amber-600"
      >
        Hoziroq boshlash
        <ArrowRight className="ml-2 size-4" aria-hidden />
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={() => void toggleSaved()}
        disabled={saveLoading}
        aria-pressed={saved}
        className="mt-3 h-11 w-full rounded-xl border-gray-200 bg-white font-medium dark:border-gray-700 dark:bg-transparent"
      >
        <Heart
          className={cn(
            "mr-2 size-4",
            saved ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"
          )}
          strokeWidth={saved ? 0 : 2}
          aria-hidden
        />
        Saqlab qo&apos;yish
      </Button>

      <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        {title} — to&apos;lov xavfsiz kanallar orqali
      </p>

      {mounted &&
        introOpen &&
        createPortal(
          <div className="fixed inset-0 z-[200]">
            <button
              type="button"
              className="absolute inset-0 bg-black/65 backdrop-blur-sm"
              aria-label="Modalni yopish"
              onClick={() => setIntroOpen(false)}
            />
            <div className="pointer-events-none fixed inset-0 flex items-center justify-center p-4 sm:p-6">
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="intro-modal-title"
                className="pointer-events-auto w-full max-w-lg rounded-2xl border border-gray-800 bg-[#0f172a] p-5 shadow-2xl sm:p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <h2
                    id="intro-modal-title"
                    className="pr-2 text-lg font-semibold leading-snug text-white sm:text-xl"
                  >
                    {title} — Bepul tanishuv darsi
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIntroOpen(false)}
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Yopish"
                  >
                    <X className="size-5" aria-hidden />
                  </button>
                </div>

                <div className="relative mt-5 aspect-video overflow-hidden rounded-xl bg-emerald-500">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at center, rgba(255,255,255,0.45) 1.2px, transparent 1.2px)",
                      backgroundSize: "14px 14px",
                    }}
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex size-20 items-center justify-center rounded-full bg-white text-emerald-600 shadow-lg">
                      <Play className="ml-1 size-10 fill-current" aria-hidden />
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-white/90 sm:text-[15px]">
                  {introDescription(title)}
                </p>

                <Button
                  asChild
                  className="mt-6 h-12 w-full rounded-full border-0 bg-emerald-500 text-base font-bold text-white hover:bg-emerald-600"
                >
                  <Link href="/auth" onClick={() => setIntroOpen(false)}>
                    To&apos;liq kursga yozilish
                  </Link>
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

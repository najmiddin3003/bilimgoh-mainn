"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Gift, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import {
  clearExpiredNewUserPromo,
  getNewUserPromo,
  isNewUserPromoActive,
  msUntilPromoCanShow,
  NEW_USER_PROMO_CODE,
} from "@/lib/new-user-promo";
import { cn } from "@/lib/utils";

export default function NewUserPromoModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    clearExpiredNewUserPromo();

    const data = getNewUserPromo();
    if (!data) return;

    const show = () => {
      const current = getNewUserPromo();
      if (current && isNewUserPromoActive(current)) {
        setOpen(true);
      }
    };

    const waitMs = msUntilPromoCanShow(data);
    if (waitMs === 0) {
      show();
      return;
    }

    const timerId = window.setTimeout(show, waitMs);
    return () => window.clearTimeout(timerId);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(NEW_USER_PROMO_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-user-promo-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-label="Yopish"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/20"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-full p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
              aria-label="Yopish"
            >
              <X className="size-5" />
            </button>

            <div className="px-6 pb-6 pt-8 text-center sm:px-8 sm:pb-8 sm:pt-10">
              <div
                className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-amber-50"
                aria-hidden
              >
                <Gift className="size-7 text-amber-500" strokeWidth={1.75} />
              </div>

              <h2
                id="new-user-promo-title"
                className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-[1.65rem]"
              >
                Ketmang!
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-[15px]">
                Sizga maxsus chegirma kodi tayyorladik. Birinchi kursingizga{" "}
                <span className="font-semibold text-zinc-800">15% chegirma</span>
                .
              </p>

              <div className="mt-6 flex items-stretch overflow-hidden rounded-xl bg-zinc-900 shadow-inner">
                <div className="flex flex-1 items-center justify-center px-4 py-4">
                  <span className="text-lg font-bold tracking-[0.2em] text-white sm:text-xl">
                    {NEW_USER_PROMO_CODE}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => void handleCopy()}
                  className={cn(
                    "shrink-0 px-4 text-sm font-semibold transition sm:px-5",
                    copied
                      ? "bg-emerald-600 text-white"
                      : "bg-emerald-500 text-white hover:bg-emerald-600",
                  )}
                >
                  {copied ? "Nusxalandi" : "Nusxa olish"}
                </button>
              </div>

              <Link
                href="/all-courses"
                onClick={() => setOpen(false)}
                className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-emerald-500 text-sm font-semibold text-white shadow-md shadow-emerald-500/25 transition hover:bg-emerald-600"
              >
                Kurslarni ko&apos;rish
              </Link>

              <p className="mt-5 text-xs text-zinc-400">
                Kod 24 soat amal qiladi · Faqat yangi mijozlar uchun
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

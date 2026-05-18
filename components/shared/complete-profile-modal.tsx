"use client";

import { useState } from "react";
import { Loader2, UserRound } from "lucide-react";
import { motion } from "framer-motion";

import { useAuth } from "@/components/providers/auth-provider";
import { isProfileComplete, type PublicAuthUser } from "@/lib/auth-user";
import { cn } from "@/lib/utils";

export default function CompleteProfileModal() {
  const { user, setUser } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [closed, setClosed] = useState(false);

  const shouldShow =
    Boolean(user) && !closed && !isProfileComplete(user as PublicAuthUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const parsedAge = Number(age);

    try {
      setLoading(true);

      const res = await fetch("/api/auth/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstName: trimmedFirst,
          lastName: trimmedLast,
          age: parsedAge,
        }),
      });

      const data = (await res.json()) as {
        error?: string;
        user?: PublicAuthUser;
      };

      if (!res.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Ma’lumotlar saqlanmadi.",
        );
        return;
      }

      if (!data.user) {
        setError("Ma’lumotlar saqlandi, lekin javob olinmadi. Sahifani yangilang.");
        return;
      }

      setUser(data.user);
      setClosed(true);
    } catch {
      setError("Tarmoq xatolik. Qayta urinib ko‘ring.");
    } finally {
      setLoading(false);
    }
  };

  if (!shouldShow) {
    return null;
  }

  const canSubmit =
    firstName.trim().length >= 2 &&
    lastName.trim().length >= 2 &&
    /^\d+$/.test(age) &&
    Number(age) >= 10 &&
    Number(age) <= 100;

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="complete-profile-title"
    >
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/25 dark:bg-[#131a26] dark:ring-1 dark:ring-white/10"
      >
        <div className="border-b border-zinc-100 px-6 py-6 dark:border-white/10 sm:px-8">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <UserRound className="size-7" strokeWidth={1.75} />
          </div>
          <h2
            id="complete-profile-title"
            className="text-center text-xl font-bold text-zinc-900 dark:text-white"
          >
            Profilni to‘ldiring
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-500 dark:text-slate-400">
            Dashboardda shaxsiy tajriba uchun ism, familiya va yoshingizni
            kiriting.
          </p>
        </div>

        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="px-6 pb-8 pt-2 sm:px-8"
        >
          <div className="space-y-4">
            <label className="block text-left">
              <span className="text-xs font-medium text-zinc-500 dark:text-slate-400">
                Ism
              </span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Masalan: Madina"
                autoComplete="given-name"
                disabled={loading}
                className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-sm text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/15 disabled:opacity-60 dark:border-white/10 dark:bg-[#0a0e16] dark:text-white"
              />
            </label>

            <label className="block text-left">
              <span className="text-xs font-medium text-zinc-500 dark:text-slate-400">
                Familiya
              </span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Masalan: Karimova"
                autoComplete="family-name"
                disabled={loading}
                className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-sm text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/15 disabled:opacity-60 dark:border-white/10 dark:bg-[#0a0e16] dark:text-white"
              />
            </label>

            <label className="block text-left">
              <span className="text-xs font-medium text-zinc-500 dark:text-slate-400">
                Yosh
              </span>
              <input
                type="number"
                inputMode="numeric"
                min={10}
                max={100}
                value={age}
                onChange={(e) =>
                  setAge(e.target.value.replace(/\D/g, "").slice(0, 3))
                }
                placeholder="Masalan: 18"
                disabled={loading}
                className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-sm text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/15 disabled:opacity-60 dark:border-white/10 dark:bg-[#0a0e16] dark:text-white"
              />
            </label>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-left text-[13px] text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className={cn(
              "mt-6 flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition",
              canSubmit && !loading
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25 hover:bg-emerald-600"
                : "cursor-not-allowed bg-zinc-100 text-zinc-400 dark:bg-white/10 dark:text-slate-500",
            )}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saqlanmoqda…
              </>
            ) : (
              "Davom etish"
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

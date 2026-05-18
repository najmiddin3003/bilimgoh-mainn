"use client"

import Link from "next/link"
import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Award,
  BookOpen,
  Calendar,
  Crosshair,
  Flame,
  Gem,
  GraduationCap,
  Handshake,
  MapPin,
  Palette,
  Pencil,
  Share2,
  Sparkles,
  Star,
  Sun,
  Tag,
  Target,
  Trophy,
  UserPlus,
  Zap,
} from "lucide-react"

import ModeToggle from "@/components/shared/mode-toggle"
import Logo from "@/components/shared/logo"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Bosh sahifa", href: "/" },
  { label: "Kurslar", href: "/all-courses" },
  { label: "Tariflar", href: "/pricing" },
  { label: "Blog", href: "/" },
  { label: "Biz haqimizda", href: "/" },
]

const profileStats: {
  value: string
  label: string
  icon: LucideIcon
  iconClass: string
}[] = [
  {
    value: "2",
    label: "Tugatilgan kurslar",
    icon: GraduationCap,
    iconClass: "bg-sky-500/15 text-sky-400",
  },
  {
    value: "2",
    label: "Sertifikatlar",
    icon: Award,
    iconClass: "bg-emerald-500/15 text-emerald-400",
  },
  {
    value: "14",
    label: "Mukofotlar",
    icon: Trophy,
    iconClass: "bg-amber-500/15 text-amber-400",
  },
  {
    value: "650",
    label: "Bilim ballari",
    icon: Sparkles,
    iconClass: "bg-violet-500/15 text-violet-400",
  },
  {
    value: "2",
    label: "Taklif qildi",
    icon: UserPlus,
    iconClass: "bg-rose-500/15 text-rose-400",
  },
]

const tabs = [
  { id: "general", label: "Umumiy" },
  { id: "awards", label: "Mukofotlar", count: 14 },
  { id: "certificates", label: "Sertifikatlar", count: 2 },
  { id: "activity", label: "Faollik" },
]

type AwardItem = {
  label: string
  points: string
  highlighted?: boolean
  icon?: LucideIcon
  emoji?: string
  iconClass?: string
}

const allAwards: AwardItem[] = [
  {
    label: "Birinchi qadam",
    points: "+10 ball",
    icon: Target,
    iconClass: "text-rose-400",
  },
  {
    label: "O'qishga ishtiyoq",
    points: "+25 ball",
    icon: BookOpen,
    iconClass: "text-sky-400",
  },
  {
    label: "Bilim ovchisi",
    points: "+100 ball",
    icon: Crosshair,
    iconClass: "text-orange-400",
    highlighted: true,
  },
  {
    label: "Birinchi kurs",
    points: "+75 ball",
    icon: GraduationCap,
    iconClass: "text-violet-400",
    highlighted: true,
  },
  {
    label: "3 kunlik streak",
    points: "+15 ball",
    icon: Flame,
    iconClass: "text-orange-500",
  },
  {
    label: "Haftalik chempion",
    points: "+50 ball",
    icon: Zap,
    iconClass: "text-amber-400",
    highlighted: true,
  },
  {
    label: "Kitobxon",
    points: "+25 ball",
    emoji: "🐛",
  },
  {
    label: "Kolleksioner",
    points: "+15 ball",
    icon: Tag,
    iconClass: "text-slate-300",
  },
  {
    label: "Estet",
    points: "+5 ball",
    icon: Palette,
    iconClass: "text-pink-400",
  },
  {
    label: "Birinchi ulashish",
    points: "+20 ball",
    icon: Handshake,
    iconClass: "text-amber-300",
  },
  {
    label: "Influencer",
    points: "+100 ball",
    icon: Star,
    iconClass: "text-yellow-400",
    highlighted: true,
  },
  {
    label: "100% ball",
    points: "+50 ball",
    emoji: "💯",
    highlighted: true,
  },
  {
    label: "Pro a'zo",
    points: "+150 ball",
    icon: Gem,
    iconClass: "text-cyan-400",
    highlighted: true,
  },
  {
    label: "Erta turuvchi",
    points: "+10 ball",
    icon: Sun,
    iconClass: "text-yellow-300",
  },
]

function AwardCard({ award, compact }: { award: AwardItem; compact?: boolean }) {
  const Icon = award.icon
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-2xl border px-2 py-4 text-center sm:px-3 sm:py-5",
        award.highlighted
          ? "border-sky-500/40 bg-sky-500/5"
          : "border-transparent bg-transparent"
      )}
    >
      <div
        className={cn(
          "mb-2 flex items-center justify-center",
          compact ? "size-12 text-2xl" : "size-14 text-3xl sm:mb-3 sm:size-16"
        )}
      >
        {award.emoji ? (
          <span aria-hidden>{award.emoji}</span>
        ) : Icon ? (
          <Icon
            className={cn(compact ? "size-7" : "size-8 sm:size-9", award.iconClass)}
            aria-hidden
          />
        ) : null}
      </div>
      <p
        className={cn(
          "font-semibold leading-tight text-white",
          compact ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"
        )}
      >
        {award.label}
      </p>
      <p
        className={cn(
          "mt-1 text-sky-400/70",
          compact ? "text-[9px] sm:text-[10px]" : "text-[10px] sm:text-xs"
        )}
      >
        {award.points}
      </p>
    </div>
  )
}

function AwardsGrid({
  awards,
  compact,
}: {
  awards: AwardItem[]
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        "grid gap-2 sm:gap-3",
        compact
          ? "grid-cols-4"
          : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      )}
    >
      {awards.map((award) => (
        <AwardCard key={award.label} award={award} compact={compact} />
      ))}
    </div>
  )
}

const recentCertificates = [
  {
    title: "IELTS Intensive — 7.0+ tayyorgarlik",
    date: "17 aprel 2024",
  },
  {
    title: "Frontend dasturlash asoslari",
    date: "3 mart 2024",
  },
]

function CabinetNavbar({ onMukofotlarClick }: { onMukofotlarClick?: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b1117]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Logo white />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ModeToggle />
          <button
            type="button"
            onClick={onMukofotlarClick}
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-amber-300 sm:inline-flex"
          >
            <Trophy className="size-4 text-amber-400" />
            Mukofotlar
          </button>
          <Link
            href="/dashboard"
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/25 transition-colors hover:bg-emerald-600"
          >
            Kabinet
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Cabinet() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="dark min-h-screen bg-[#0a0e14] text-white">
      <CabinetNavbar onMukofotlarClick={() => setActiveTab("awards")} />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
        <article className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-2xl shadow-black/40">
          <div className="h-28 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 sm:h-32" />

          <div className="relative px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-14 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex size-24 shrink-0 items-center justify-center rounded-full border-4 border-[#111827] bg-gradient-to-br from-emerald-400 to-emerald-600 text-2xl font-bold text-white shadow-lg sm:size-28 sm:text-3xl">
                MK
              </div>
              <div className="flex gap-2 sm:mb-1">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
                >
                  <Pencil className="size-4" />
                  Tahrirlash
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <Share2 className="size-4" />
                  Ulashish
                </button>
              </div>
            </div>

            <div className="mt-5">
              <h1 className="text-2xl font-bold sm:text-3xl">Madina Karimova</h1>
              <p className="mt-1 text-sm font-medium text-emerald-400">
                IELTS talabasi
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                Bilim olishni yaxshi ko&apos;raman. 2026 yilda Buyuk Britaniyaga
                grant olish ustida ishlayapman.
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 sm:text-sm">
                <li className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0" />
                  Toshkent, O&apos;zbekiston
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Calendar className="size-3.5 shrink-0" />
                  Qo&apos;shilgan: noyabr 2025
                </li>
                <li>@madina_k</li>
              </ul>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
              {profileStats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/5 bg-[#0d1219] px-3 py-4 text-center"
                  >
                    <div
                      className={cn(
                        "mx-auto mb-2 flex size-9 items-center justify-center rounded-xl",
                        stat.iconClass
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                    </div>
                    <p className="text-xl font-bold sm:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-[10px] leading-tight text-slate-500 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex gap-1 overflow-x-auto border-b border-white/10 pb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative shrink-0 px-4 py-3 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? tab.id === "awards"
                        ? "text-emerald-400"
                        : "text-white"
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  {tab.label}
                  {tab.count != null && (
                    <span className="ml-1 text-slate-500">{tab.count}</span>
                  )}
                  {activeTab === tab.id && (
                    <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-emerald-500" />
                  )}
                </button>
              ))}
            </div>

            {activeTab === "general" && (
              <div
                id="cabinet-awards"
                className="mt-6 grid gap-6 lg:grid-cols-2"
              >
                <section>
                  <h2 className="mb-4 text-base font-bold">
                    Tanlangan mukofotlar
                  </h2>
                  <div className="grid grid-cols-4 gap-4 sm:gap-5">
                    {selectedAwards.map((award) => {
                      const Icon = award.icon
                      return (
                        <div
                          key={award.label}
                          className="flex flex-col items-center gap-2 text-center"
                        >
                          <div className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-[#0d1219] sm:size-16">
                            <Icon className="size-6 text-emerald-400 sm:size-7" />
                          </div>
                          <p className="text-[10px] leading-tight text-slate-400 sm:text-xs">
                            {award.label}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("awards")}
                    className="mt-5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
                  >
                    Hammasini ko&apos;rish →
                  </button>
                </section>

                <section>
                  <h2 className="mb-4 text-base font-bold">
                    So&apos;nggi sertifikatlar
                  </h2>
                  <ul className="space-y-3">
                    {recentCertificates.map((cert) => (
                      <li
                        key={cert.title}
                        className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#0d1219] p-4"
                      >
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                          <Award className="size-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-snug">
                            {cert.title}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {cert.date}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            )}

            {activeTab === "awards" && (
              <div className="mt-6 grid grid-cols-4 gap-4 sm:grid-cols-4 sm:gap-5">
                {selectedAwards.map((award) => {
                  const Icon = award.icon
                  return (
                    <div
                      key={award.label}
                      className="flex flex-col items-center gap-2 text-center"
                    >
                      <div className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-[#0d1219] sm:size-16">
                        <Icon className="size-6 text-emerald-400 sm:size-7" />
                      </div>
                      <p className="text-[10px] leading-tight text-slate-400 sm:text-xs">
                        {award.label}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}

            {activeTab === "certificates" && (
              <ul className="mt-6 space-y-3">
                {recentCertificates.map((cert) => (
                  <li
                    key={cert.title}
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#0d1219] p-4"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                      <Award className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{cert.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {cert.date}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "activity" && (
              <p className="mt-6 text-sm text-slate-500">
                Faollik tarixi tez orada qo&apos;shiladi.
              </p>
            )}
          </div>
        </article>
      </main>
    </div>
  )
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import type { PublicAuthUser } from "@/lib/auth-user";
import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  BookOpenText,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  CreditCard,
  Download,
  FileCheck,
  Flame,
  Home,
  Info,
  Link2,
  Medal,
  Moon,
  Play,
  Search,
  Settings,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { FaTelegram } from "react-icons/fa";

import { cn } from "@/lib/utils";
import LikedCoursesDropdown from "@/components/shared/liked-courses-dropdown";
import ModeToggle from "./mode-toggle";

const navItems = [
  {
    id: "home",
    label: "Bosh sahifa",
    icon: Home,
    href: "/dashboard",
    active: true,
  },
  { id: "courses", label: "Kurslarim", icon: BookOpen, href: "/dashboard" },
  { id: "teachers", label: "Ustozlarim", icon: Users, href: "/dashboard" },
  { id: "top", label: "Top 100", icon: BarChart3, href: "/dashboard" },
  { id: "blog", label: "Blog", icon: BookOpenText, href: "/dashboard" },
  { id: "tariflar", label: "Tariflar", icon: CreditCard, href: "/dashboard" },
  {
    id: "biz-haqimizda",
    label: "Biz haqimizda",
    icon: Info,
    href: "/dashboard",
  },
  { id: "settings", label: "Sozlamalar", icon: Settings, href: "/dashboard" },
];

const stats = [
  {
    icon: BookOpen,
    iconBg: "bg-amber-500/15 text-amber-400",
    value: "4",
    label: "Faol kurslar",
    trend: "+1 bu hafta",
  },
  {
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/15 text-emerald-400",
    value: "12",
    label: "Tugallangan",
    trend: "+3 bu oy",
  },
  {
    icon: Clock,
    iconBg: "bg-sky-500/15 text-sky-400",
    value: "86",
    label: "O'qilgan soatlar",
    trend: "+12 soat",
  },
  {
    icon: Medal,
    iconBg: "bg-violet-500/15 text-violet-400",
    value: "5",
    label: "Sertifikatlar",
    trend: "+1 bu oy",
  },
];

const myCourses = [
  {
    tag: "IELTS",
    tagBg: "bg-sky-600",
    title: "IELTS Intensive — 6.5+ kafolati",
    teacher: "Teacher Abdulloh • 3 oy",
    progress: 62,
    lessons: "54/87 dars",
    barColor: "bg-sky-500",
  },
  {
    tag: "MATH",
    tagBg: "bg-emerald-600",
    title: "Matematika — 9-sinf tayyorlov",
    teacher: "Teacher Sardor • 4 oy",
    progress: 28,
    lessons: "12/42 dars",
    barColor: "bg-emerald-500",
  },
  {
    tag: "UX",
    tagBg: "bg-orange-500",
    title: "Frontend UX — Figma + React",
    teacher: "Teacher Dilnoza • 2 oy",
    progress: 45,
    lessons: "18/40 dars",
    barColor: "bg-orange-500",
  },
  {
    tag: "RU",
    tagBg: "bg-violet-600",
    title: "Rus tili — 1-bosqich",
    teacher: "Teacher Madina • 3 oy",
    progress: 0,
    lessons: "0/25 dars",
    barColor: "bg-violet-500",
  },
];

const todayPlan = [
  {
    time: "09:00",
    duration: "15 daq",
    title: "IELTS Speaking — Part 2",
    subtitle: "Cue card mashqlari",
    badge: "Video dars",
    badgeClass: "bg-sky-500/20 text-sky-300",
  },
  {
    time: "14:00",
    duration: "45 daq",
    title: "Mock Test #4",
    subtitle: "Cambridge IELTS 17",
    badge: "Test",
    badgeClass: "bg-amber-500/20 text-amber-300",
  },
  {
    time: "19:00",
    duration: "60 daq",
    title: "Live Speaking sessiya",
    subtitle: "Teacher Abdulloh bilan",
    badge: "Jonli efir",
    badgeClass: "bg-rose-500/20 text-rose-300",
    live: true,
  },
];

const awards = [
  { icon: Target, name: "Birinchi qadam", points: "+10 ball" },
  { icon: BookOpen, name: "7 kun ketma-ket", points: "+25 ball" },
  { icon: Award, name: "Mock test g'olibi", points: "+50 ball" },
  { icon: Medal, name: "Pro o'quvchi", points: "+100 ball" },
];

const certificates = [
  {
    title: "IELTS Intensive — 7.0+ t...",
    meta: "17 aprel 2024 • A+",
  },
  {
    title: "Matematika — 9-sinf tayyor...",
    meta: "3 mart 2024 • A",
  },
];

const weekDays = ["D", "S", "Ch", "P", "J", "Sh", "Y"];
const completedDays = [0, 1, 2, 3, 4];

function SectionLink({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
    >
      {children}
    </button>
  );
}

function ProgressBar({
  value,
  className,
  trackClassName,
}: {
  value: number;
  className?: string;
  trackClassName?: string;
}) {
  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full",
        trackClassName,
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all", className)}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[220px] flex-col border-r border-white/5 bg-[#0a0e16] lg:flex">
      <div className="border-b border-white/5 px-5 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-500">
            <BookOpenText className="size-5 text-white" />
          </span>
          <span className="text-lg font-bold text-white">Bilimgoh</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                item.active
                  ? "bg-sky-500/15 text-sky-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="size-[18px] shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/5 p-4">
        <div className="rounded-2xl bg-[#131a26] p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>Umumiy progress</span>
            <span className="font-semibold text-white">75%</span>
          </div>
          <ProgressBar
            value={75}
            className="bg-sky-500"
            trackClassName="bg-white/10"
          />
        </div>
      </div>
    </aside>
  );
}

function DashboardHeader({ user }: { user: PublicAuthUser | null }) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center gap-4 border-b border-white/5 bg-[#0a0e16]/90 px-4 py-4 backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/8 bg-[#131a26] px-4 py-2.5">
        <Search className="size-5 shrink-0 text-slate-500" aria-hidden />
        <input
          type="search"
          placeholder="Kurs, ustoz yoki dars qidirish..."
          className="min-w-0 flex-1 border-0 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl border border-white/8 bg-[#131a26] text-slate-300 transition-colors hover:text-white">
          <ModeToggle />
        </div>
        <button
          type="button"
          className="relative flex size-10 items-center justify-center rounded-xl border border-white/8 bg-[#131a26] text-slate-300 transition-colors hover:text-white"
          aria-label="Bildirishnomalar"
        >
          <Bell className="size-[18px]" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
        </button>
        <LikedCoursesDropdown />

        <button
          type="button"
          onClick={() => void handleLogout()}
          className="flex size-10 items-center justify-center rounded-xl border border-white/8 bg-[#131a26] text-slate-300 transition-colors hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400"
          aria-label="Chiqish"
          title="Chiqish"
        >
          <LogOut className="size-[18px]" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2.5 rounded-2xl border border-white/8 bg-[#131a26] py-1.5 pl-1.5 pr-3"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-white">
            {user?.initials ?? "BG"}
          </span>
          {/* <span className="hidden text-sm font-medium text-white sm:inline">
            Madina K.
          </span> */}
          {/* <ChevronDown className="size-4 text-slate-500" /> */}
        </button>
      </div>
    </header>
  );
}

function CourseRow({
  tag,
  tagBg,
  title,
  teacher,
  progress,
  lessons,
  barColor,
}: (typeof myCourses)[number]) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/5 py-4 last:border-0 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold text-white",
            tagBg,
          )}
        >
          {tag}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{title}</p>
          <p className="mt-0.5 text-xs text-slate-500">{teacher}</p>
        </div>
      </div>
      <div className="w-full sm:w-44">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-semibold text-white">{progress}%</span>
          <span className="text-slate-500">{lessons}</span>
        </div>
        <ProgressBar
          value={progress}
          className={barColor}
          trackClassName="bg-white/10"
        />
      </div>
    </div>
  );
}

export default function Profile() {
  const { user, isLoading } = useAuth();

  const greetingName =
    user?.firstName?.trim() ||
    user?.displayName?.split(" ")[0] ||
    "O‘quvchi";

  if (isLoading) {
    return (
      <div className="dark flex min-h-screen items-center justify-center bg-[#0a0e16]">
        <Loader2 className="size-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-[#0a0e16] text-white">
      <DashboardSidebar />

      <div className="lg:pl-[220px]">
        <DashboardHeader user={user} />

        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
          {/* Salom */}
          <section className="relative mb-6 overflow-hidden rounded-3xl border border-white/5 bg-[#131a26] p-6 sm:p-8">
            <div className="relative z-10 max-w-xl">
              <h1 className="text-2xl font-bold sm:text-3xl">
                Salom,{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  {greetingName}!
                </span>{" "}
                👋
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                Bugungi maqsadingiz:{" "}
                <span className="text-slate-200">
                  2 ta yangi dars va 1 ta mock test.
                </span>{" "}
                Sen bunga albatta erishasan!
              </p>
            </div>
            <div className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 sm:block">
              <div className="relative flex size-28 items-center justify-center rounded-full bg-amber-500/10">
                <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-2xl" />
                <BookOpen className="relative size-12 text-amber-400" />
              </div>
            </div>
          </section>

          {/* Statistika */}
          <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/5 bg-[#131a26] p-4 sm:p-5"
                >
                  <div
                    className={cn(
                      "mb-3 flex size-10 items-center justify-center rounded-xl",
                      stat.iconBg,
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  <p className="text-2xl font-bold sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    {stat.label}
                  </p>
                  <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-400">
                    <TrendingUp className="size-3.5" />
                    {stat.trend}
                  </p>
                </div>
              );
            })}
          </section>

          {/* Referral */}
          <section className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                  🎁
                </div>
                <div>
                  <h2 className="text-base font-bold sm:text-lg">
                    Do&apos;stingizni taklif qiling,{" "}
                    <span className="text-amber-300">50 000 so&apos;m</span>{" "}
                    oling
                  </h2>
                  <p className="mt-1 text-sm text-white/80">
                    Har bir do&apos;stingiz uchun mukofot, 5 ta do&apos;st = 1
                    oy Pro tarif bepul.
                  </p>
                  <p className="mt-2 text-xs text-white/70 sm:text-sm">
                    2 ta xarid • 100 000 so&apos;m yig&apos;ilgan • 🎯 1 ta
                    qoldi → 💰 +25 000 so&apos;m
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  className="rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  Boshlash
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-violet-700 transition-colors hover:bg-white/90"
                >
                  <Link2 className="size-4" />
                  Havola
                  <Copy className="size-3.5 opacity-60" />
                </button>
              </div>
            </div>
          </section>

          {/* Asosiy grid */}
          <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              {/* Davom etish */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-bold">Davom etish</h2>
                  <SectionLink>Hammasi →</SectionLink>
                </div>
                <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-700 p-5 sm:p-6">
                  <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90">
                    Hozir o&apos;qilmoqda
                  </span>
                  <h3 className="mt-3 text-lg font-bold sm:text-xl">
                    IELTS Intensive — 6.5+ kafolati
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    Modul 3 · Reading: skimming va scanning usullari (12-dars)
                  </p>
                  <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex-1">
                      <ProgressBar
                        value={62}
                        className="bg-white"
                        trackClassName="bg-white/25"
                      />
                      <p className="mt-2 text-xs text-white/80">
                        62% tugadi · 18 dars qoldi
                      </p>
                    </div>
                    <button
                      type="button"
                      className="flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-[1.02]"
                    >
                      Davom etish
                      <Play className="size-4 fill-white" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Rus tili */}
              <section className="overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-rose-950/80 via-[#1a1228] to-violet-950/60 p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold">
                    <span className="mr-2 inline-flex size-7 items-center justify-center rounded-lg bg-violet-600 text-xs">
                      RU
                    </span>
                    Rus tili — 1-bosqich
                  </h3>
                  <SectionLink>Davom etish →</SectionLink>
                </div>
                <div className="grid grid-cols-3 gap-3 rounded-2xl bg-black/20 p-4">
                  {[
                    { value: "0 / 25", label: "dars" },
                    { value: "0", label: "so'z o'rganildi" },
                    { value: "0 / 10", label: "imtihon" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <p className="text-lg font-bold sm:text-xl">
                        {item.value}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-center text-sm text-slate-400">
                  Hali boshlanmadi — birinchi darsdan boshlang ✨
                </p>
              </section>

              {/* Mening kurslarim */}
              <section className="rounded-3xl border border-white/5 bg-[#131a26] p-5 sm:p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-lg font-bold">Mening kurslarim</h2>
                  <SectionLink>Barchasi →</SectionLink>
                </div>
                <div>
                  {myCourses.map((course) => (
                    <CourseRow key={course.title} {...course} />
                  ))}
                </div>
              </section>
            </div>

            {/* O'ng sidebar */}
            <aside className="space-y-5">
              {/* Streak */}
              <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-500 p-5 text-[#1a1400]">
                <div className="flex items-center gap-3">
                  <Flame className="size-10 fill-orange-600 text-orange-600" />
                  <div>
                    <p className="text-4xl font-black leading-none">12</p>
                    <p className="text-sm font-medium opacity-80">
                      kunlik o&apos;rganish ketma-ketligi
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between gap-1">
                  {weekDays.map((day, i) => (
                    <div key={day} className="flex flex-col items-center gap-1">
                      <div
                        className={cn(
                          "size-7 rounded-full text-[10px] font-bold flex items-center justify-center",
                          completedDays.includes(i)
                            ? "bg-orange-600 text-white"
                            : "bg-black/10 text-black/50",
                        )}
                      >
                        {day}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tavsiya */}
              <div className="rounded-3xl border border-white/5 bg-[#131a26] p-5">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-violet-600 text-xs font-bold">
                    RU
                  </span>
                  <div>
                    <h3 className="font-bold">Rus tili kursi</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      25 ta dars · 600+ so&apos;z
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Rus tilini noldan o&apos;rganishni boshlang. A1 → A2
                  darajasiga 12 hafta!
                </p>
                <button
                  type="button"
                  className="mt-4 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  Kursni boshlash →
                </button>
              </div>

              {/* Bugungi reja */}
              <div className="rounded-3xl border border-white/5 bg-[#131a26] p-5">
                <h3 className="mb-4 font-bold">Bugungi reja</h3>
                <ul className="space-y-4">
                  {todayPlan.map((item) => (
                    <li
                      key={item.title}
                      className="flex gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="w-12 shrink-0">
                        <p className="text-sm font-bold">{item.time}</p>
                        <p className="text-[10px] text-slate-500">
                          {item.duration}
                        </p>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {item.subtitle}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "h-fit shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                          item.badgeClass,
                        )}
                      >
                        {item.live && (
                          <span className="mr-1 inline-block size-1.5 rounded-full bg-rose-400" />
                        )}
                        {item.badge}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mukofotlar */}
              <div className="rounded-3xl border border-white/5 bg-[#131a26] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold">So&apos;nggi mukofotlar</h3>
                  <SectionLink>Barchasi →</SectionLink>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {awards.map((award) => {
                    const Icon = award.icon;
                    return (
                      <div
                        key={award.name}
                        className="flex flex-col items-center rounded-2xl border border-white/5 bg-[#0d1219] p-4 text-center"
                      >
                        <Icon className="mb-2 size-7 text-sky-400" />
                        <p className="text-xs font-semibold">{award.name}</p>
                        <p className="mt-1 text-[10px] text-sky-400/80">
                          {award.points}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sertifikatlar */}
              <div className="rounded-3xl border border-white/5 bg-[#131a26] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold">Mening sertifikatlarim</h3>
                  <SectionLink>Hammasi →</SectionLink>
                </div>
                <ul className="space-y-3">
                  {certificates.map((cert) => (
                    <li
                      key={cert.title}
                      className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#0d1219] p-3"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                        <Award className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {cert.title}
                        </p>
                        <p className="text-xs text-slate-500">{cert.meta}</p>
                      </div>
                      <button
                        type="button"
                        className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 transition-colors hover:bg-emerald-500/30"
                        aria-label="Yuklab olish"
                      >
                        <Download className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* Toast */}
      <div className="fixed bottom-6 left-4 z-50 max-w-xs rounded-2xl border border-white/10 bg-[#131a26]/95 p-3 shadow-xl backdrop-blur-md sm:left-6 lg:left-[244px]">
        <div className="flex gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-[#1a1400]">
            S
          </span>
          <div>
            <p className="text-sm leading-snug text-white">
              <span className="font-semibold">Sardor Y.</span> Namangandan
              Frontend kursini sotib oldi.
            </p>
            <p className="mt-1 text-xs text-slate-500">5 daqiqa oldin</p>
          </div>
        </div>
      </div>

      {/* Telegram FAB */}
      <a
        href="https://t.me/bilimgoh"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-lg shadow-sky-500/30 transition-transform hover:scale-105"
        aria-label="Telegram"
      >
        <FaTelegram className="size-7" />
      </a>
    </div>
  );
}

"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import Navbar from "@/components/shared/navbar"
import {
  AllCoursesSidebar,
  createInitialCourseFilters,
  filterCoursesWithSidebarState,
  type AllCoursesFilterState,
} from "@/components/shared/all-courses-sidebar"
import { CourseCard } from "@/components/shared/cards/courses-card"
import { Button } from "@/components/ui/button"
import courses from "@/constants"

function parseStudents(s: string) {
  const t = String(s).trim()
  const km = t.match(/^([\d.]+)\s*K$/i)
  if (km) return Math.round(parseFloat(km[1]) * 1000)
  const n = parseInt(t.replace(/\D/g, ""), 10)
  return Number.isFinite(n) ? n : 0
}

function parsePriceUz(price: string) {
  const p = String(price).toLowerCase()
  if (p.includes("bepul")) return 0
  const digits = p.replace(/\D/g, "")
  return parseInt(digits, 10) || 0
}

const page = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [sidebarFilters, setSidebarFilters] = useState<AllCoursesFilterState>(
    () => createInitialCourseFilters()
  )

  const list = useMemo(() => {
    let next = filterCoursesWithSidebarState([...courses], sidebarFilters)
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      next = next.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q)
      )
    }
    next.sort((a, b) => {
      if (sortBy === "popular") {
        return parseStudents(b.students) - parseStudents(a.students)
      }
      if (sortBy === "rating") {
        return parseFloat(b.rating) - parseFloat(a.rating)
      }
      if (sortBy === "price-asc") {
        return parsePriceUz(a.price) - parsePriceUz(b.price)
      }
      if (sortBy === "price-desc") {
        return parsePriceUz(b.price) - parsePriceUz(a.price)
      }
      return (b.id ?? 0) - (a.id ?? 0)
    })
    return next
  }, [searchQuery, sortBy, sidebarFilters])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto w-[96%] max-w-6xl px-2 pb-12 pt-24 sm:pt-28">
        <section className="mb-10 text-center sm:mb-12">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            200+ kursdan o&apos;zingizga mosini tanlang
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
            Til, IT, akademik tayyorgarlik va karyera ko&apos;nikmalari bo&apos;yicha
            sertifikatlangan kurslar. Maqsadingizni yozing — biz topib beramiz.
          </p>
          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-stretch">
            <div className="flex min-h-11 flex-1 items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
              <Search
                className="size-5 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <input
                type="search"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kurs nomi yoki yo'nalish bo'yicha qidiring..."
                className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>

						{/* // search button */}
            {/* <Button
              type="button"
              onClick={() => {
                const el = document.getElementById("courses-results")
                el?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className="h-11 shrink-0 rounded-full bg-green-500 px-6 font-medium text-white hover:bg-green-600"
            >
              Qidirish
            </Button> */}
          </div>
        </section>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
          <AllCoursesSidebar
            value={sidebarFilters}
            onChange={setSidebarFilters}
            onApply={() => {
              document
                .getElementById("courses-results")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }}
          />
          <main id="courses-results" className="min-w-0 flex-1 scroll-mt-28">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {list.length}
                </span>{" "}
                ta kurs topildi
              </p>
              <label className="flex items-center gap-2 text-sm">
                <span className="shrink-0 text-muted-foreground">Tartiblash</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 min-w-[10.5rem] rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="popular">Eng mashhur</option>
                  <option value="rating">Eng yuqori reyting</option>
                  <option value="price-asc">Narx: arzondan</option>
                  <option value="price-desc">Narx: qimmatdan</option>
                </select>
              </label>
            </div>

            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((course) => (
                <li key={course.id}>
                  <CourseCard course={course} />
                </li>
              ))}
            </ul>

            {list.length === 0 && (
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Filtr yoki qidiruv bo&apos;yicha kurs topilmadi.
              </p>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default page

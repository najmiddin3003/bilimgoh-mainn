"use client"

import * as React from "react"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FilterSet = Record<string, boolean>

const initialCategories: { id: string; label: string; count: number }[] = [
  { id: "lang", label: "Til kurslari", count: 12 },
  { id: "exact", label: "Aniq fanlar", count: 8 },
  { id: "exam", label: "Imtihon tayyorlov", count: 6 },
  { id: "it", label: "IT kurslari", count: 15 },
  { id: "career", label: "Kasbiy rivojlanish", count: 5 },
  { id: "kids", label: "Bolalar kurslari", count: 3 },
]

const initialLevels = ["beginner", "intermediate", "advanced"] as const
const levelLabels: Record<(typeof initialLevels)[number], string> = {
  beginner: "Boshlang'ich",
  intermediate: "O'rta",
  advanced: "Yuqori",
}

const initialDurations = ["1-3", "3-6", "6+"] as const
const durationLabels: Record<(typeof initialDurations)[number], string> = {
  "1-3": "1-3 oy",
  "3-6": "3-6 oy",
  "6+": "6+ oy",
}

const initialPrices = ["free", "0-200", "200-400", "400+"] as const
const priceLabels: Record<(typeof initialPrices)[number], string> = {
  free: "Bepul",
  "0-200": "0 - 200K so'm",
  "200-400": "200 - 400K so'm",
  "400+": "400K so'm +",
}

const initialRatings = ["5", "4.5-4.9", "4.0-4.4"] as const
const ratingLabels: Record<(typeof initialRatings)[number], string> = {
  "5": "5.0",
  "4.5-4.9": "4.5 - 4.9",
  "4.0-4.4": "4.0 - 4.4",
}

function idsToState<T extends string>(ids: readonly T[]): FilterSet {
  return Object.fromEntries(ids.map((id) => [id, true])) as FilterSet
}

function buildInitialState() {
  return {
    categories: Object.fromEntries(
      initialCategories.map((c) => [c.id, true])
    ) as FilterSet,
    levels: idsToState(initialLevels),
    durations: idsToState(initialDurations),
    prices: idsToState(initialPrices),
    ratings: idsToState(initialRatings),
  }
}

export type AllCoursesFilterState = ReturnType<typeof buildInitialState>

export function createInitialCourseFilters(): AllCoursesFilterState {
  return buildInitialState()
}

const CATEGORY_ID_TO_DB: Record<string, string> = {
  lang: "Til kurslari",
  exact: "Aniq fanlar",
  exam: "Imtihon tayyorlov",
  it: "IT kurslar",
  career: "Kasbiy rivojlanish",
  kids: "Bolalar kurslari",
}

function parseDurationMonths(duration: string) {
  const m = String(duration).match(/(\d+)/)
  return m ? parseInt(m[1], 10) : 0
}

function parsePriceNum(price: string) {
  const p = String(price).toLowerCase()
  if (p.includes("bepul")) return 0
  return parseInt(String(price).replace(/\D/g, ""), 10) || 0
}

function courseLevelKey(courseId: number): (typeof initialLevels)[number] {
  const i = Math.abs(courseId) % 3
  return i === 0 ? "beginner" : i === 1 ? "intermediate" : "advanced"
}

function allTrue(set: FilterSet, keys: readonly string[]) {
  return keys.every((k) => set[k])
}

/** `constants` dagi kurslar ro'yxatini sidebar holatiga qarab filtrlash */
export function filterCoursesWithSidebarState<
  T extends {
    id: number
    category: string
    duration: string
    price: string
    rating: string
  },
>(courses: T[], state: AllCoursesFilterState): T[] {
  const catKeys = initialCategories.map((c) => c.id)
  const categoryFilterActive = !allTrue(state.categories, catKeys)

  const allowedCategories = new Set<string>()
  if (!categoryFilterActive) {
    // Barcha tanlangan — barcha kategoriyalar (sidebarda yo'q bo'lganlar ham chiqadi)
  } else {
    for (const id of catKeys) {
      if (state.categories[id]) {
        const db = CATEGORY_ID_TO_DB[id]
        if (db) allowedCategories.add(db)
      }
    }
  }

  const levelKeys = [...initialLevels]
  const levelFilterActive = !allTrue(state.levels, levelKeys)

  const durKeys = [...initialDurations]
  const durationFilterActive = !allTrue(state.durations, durKeys)

  const priceKeys = [...initialPrices]
  const priceFilterActive = !allTrue(state.prices, priceKeys)

  const ratingKeys = [...initialRatings]
  const ratingFilterActive = !allTrue(state.ratings, ratingKeys)

  return courses.filter((c) => {
    if (categoryFilterActive) {
      if (!allowedCategories.has(c.category)) return false
    }

    if (levelFilterActive) {
      const lv = courseLevelKey(c.id)
      if (!state.levels[lv]) return false
    }

    if (durationFilterActive) {
      const months = parseDurationMonths(c.duration)
      const ok1 = state.durations["1-3"] && months >= 1 && months <= 3
      const ok2 = state.durations["3-6"] && months > 3 && months <= 6
      const ok3 = state.durations["6+"] && months > 6
      if (!ok1 && !ok2 && !ok3) return false
    }

    if (priceFilterActive) {
      const n = parsePriceNum(c.price)
      const okFree = state.prices.free && n === 0
      const ok0200 = state.prices["0-200"] && n > 0 && n <= 200_000
      const ok200400 =
        state.prices["200-400"] && n > 200_000 && n <= 400_000
      const ok400 = state.prices["400+"] && n > 400_000
      if (!okFree && !ok0200 && !ok200400 && !ok400) return false
    }

    if (ratingFilterActive) {
      const r = parseFloat(c.rating)
      const ok5 = state.ratings["5"] && r >= 4.95
      const okMid = state.ratings["4.5-4.9"] && r >= 4.5 && r < 4.95
      const okLow = state.ratings["4.0-4.4"] && r >= 4.0 && r < 4.5
      if (!ok5 && !okMid && !okLow) return false
    }

    return true
  })
}

function FilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  )
}

function FilterCheckbox({
  checked,
  onCheckedChange,
  label,
  suffix,
}: {
  checked: boolean
  onCheckedChange: (next: boolean) => void
  label: React.ReactNode
  suffix?: React.ReactNode
}) {
  const id = React.useId()
  return (
    <label
      htmlFor={id}
      className="flex w-full cursor-pointer items-start gap-3 text-sm leading-snug text-foreground select-none"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="peer sr-only"
      />
      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border border-foreground/80 bg-background transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:[&_svg]:opacity-100">
        <svg
          className="size-2.5 text-primary-foreground opacity-0"
          viewBox="0 0 12 10"
          fill="none"
          aria-hidden
        >
          <path
            d="M1 5l3.5 3.5L11 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <span className="min-w-0">{label}</span>
        {suffix != null ? (
          <span className="shrink-0 tabular-nums text-muted-foreground">
            {suffix}
          </span>
        ) : null}
      </span>
    </label>
  )
}

export type AllCoursesSidebarProps = {
  className?: string
  value: AllCoursesFilterState
  onChange: (next: AllCoursesFilterState) => void
  onApply?: () => void
  onClose?: () => void
}

export function AllCoursesSidebar({
  className,
  value: state,
  onChange,
  onApply,
  onClose,
}: AllCoursesSidebarProps) {
  const toggle =
    (group: keyof AllCoursesFilterState, id: string) => (next: boolean) => {
      onChange({
        ...state,
        [group]: { ...state[group], [id]: next },
      })
    }

  const handleClear = () => onChange(buildInitialState())

  const handleApply = () => {
    onApply?.()
  }

  return (
    <aside
      className={cn(
        "sticky top-28 z-40 max-h-[calc(100dvh-8rem)] w-full max-w-full shrink-0 self-start overflow-y-auto rounded-lg border border-border bg-card p-5 shadow-sm lg:max-w-[280px]",
        className
      )}
    >
      <div className="mb-6 flex items-center justify-between gap-2">
        <h2 className="text-base font-bold text-foreground">Filtrlar</h2>
        <button
          type="button"
          onClick={handleClear}
          className="text-sm font-medium text-[#2563eb] hover:underline"
        >
          Tozalash
        </button>
      </div>

      <div className="space-y-8">
        <FilterSection title="Kategoriya">
          {initialCategories.map((c) => (
            <FilterCheckbox
              key={c.id}
              checked={!!state.categories[c.id]}
              onCheckedChange={toggle("categories", c.id)}
              label={c.label}
              suffix={c.count}
            />
          ))}
        </FilterSection>

        <FilterSection title="Daraja">
          {initialLevels.map((id) => (
            <FilterCheckbox
              key={id}
              checked={!!state.levels[id]}
              onCheckedChange={toggle("levels", id)}
              label={levelLabels[id]}
            />
          ))}
        </FilterSection>

        <FilterSection title="Davomiyligi">
          {initialDurations.map((id) => (
            <FilterCheckbox
              key={id}
              checked={!!state.durations[id]}
              onCheckedChange={toggle("durations", id)}
              label={durationLabels[id]}
            />
          ))}
        </FilterSection>

        <FilterSection title="Narx">
          {initialPrices.map((id) => (
            <FilterCheckbox
              key={id}
              checked={!!state.prices[id]}
              onCheckedChange={toggle("prices", id)}
              label={priceLabels[id]}
            />
          ))}
        </FilterSection>

        <FilterSection title="Reyting">
          {initialRatings.map((id) => (
            <FilterCheckbox
              key={id}
              checked={!!state.ratings[id]}
              onCheckedChange={toggle("ratings", id)}
              label={
                <span className="inline-flex items-center gap-1">
                  {ratingLabels[id]}
                  <Star
                    className="size-3.5 fill-amber-400 text-amber-400"
                    aria-hidden
                  />
                </span>
              }
            />
          ))}
        </FilterSection>
      </div>

      <div className="mt-8 flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="h-10 flex-1 rounded-lg border-border"
          onClick={() => onClose?.()}
        >
          Yopish
        </Button>
        <Button
          type="button"
          className="h-10 flex-[1.35] rounded-lg border-0 bg-[#00A781] text-white hover:bg-[#009670]"
          onClick={handleApply}
        >
          Qo&apos;llash
        </Button>
      </div>
    </aside>
  )
}

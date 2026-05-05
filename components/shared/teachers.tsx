"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { teachers } from "@/constants"
import { TeacherCard } from "./cards/teachers-card"

export function TeachersCarousel() {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const itemsPerView = 2
  const maxIndex = Math.ceil(teachers.length / itemsPerView) - 1

  const nextSlide = () => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  useEffect(() => {
    if (isHovered) return undefined

    const interval = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 3500)

    return () => clearInterval(interval)
  }, [isHovered, maxIndex])

  return (
    <section className="relative overflow-hidden bg-white py-24 dark:bg-slate-950">
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-emerald-500">
            Jamoa
          </p>

          <h2 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl dark:text-white">
            Bilimgoh ortidagi{" "}
            <span className="text-emerald-500">g‘oya va jamoa</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-500">
            Bilimgoh platformasi ta’lim, biznes va texnologiyani birlashtirgan
            tajribali jamoa tomonidan yaratilgan.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="-mt-3 overflow-hidden pt-3">
            <motion.div
              animate={{ x: `-${current * 100}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex"
            >
              {Array.from({
                length: Math.ceil(teachers.length / itemsPerView),
              }).map((_, groupIndex) => (
                <div
                  key={groupIndex}
                  className="grid min-w-full grid-cols-1 gap-6 lg:grid-cols-2 bg-transparent"
                >
                  {teachers
                    .slice(
                      groupIndex * itemsPerView,
                      groupIndex * itemsPerView + itemsPerView
                    )
                    .map((teacher) => (
                      <TeacherCard key={teacher.id} teacher={teacher} />
                    ))}
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute -left-5 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg transition hover:bg-emerald-500 hover:text-white lg:flex"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-5 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg transition hover:bg-emerald-500 hover:text-white lg:flex"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all ${
                current === index
                  ? "w-8 bg-emerald-500"
                  : "w-2.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
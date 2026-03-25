"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  CircleCheck,
  Lock,
  PlayCircle,
  Sparkles,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const programContent = {
  "english-ielts": {
    title: "English IELTS Mastery",
    subtitle:
      "A focused English program for IELTS band improvement with speaking, writing, reading and listening practice.",
    accent: "bg-emerald-600",
    image: "/assets/courses/course-img-1.jpg",
  },
  "russian-cefr": {
    title: "Russian CEFR Track",
    subtitle:
      "Step-by-step Russian language development mapped to CEFR levels with grammar and communication modules.",
    accent: "bg-sky-600",
    image: "/assets/courses/course-img-3.jpg",
  },
  "online-lessons": {
    title: "Online Live Lessons",
    subtitle:
      "Interactive online classes with live teachers, homework feedback, and flexible weekly schedules.",
    accent: "bg-violet-600",
    image: "/assets/courses/course-img-4.jpg",
  },
  "my-progress": {
    title: "My Progress Dashboard",
    subtitle:
      "Track your milestones, completed modules, and performance trends to improve learning consistency.",
    accent: "bg-amber-600",
    image: "/assets/courses/course-img-2.jpg",
  },
  "ielts-intensive": {
    title: "IELTS Intensive Course",
    subtitle:
      "A comprehensive preparation program focusing on all four IELTS modules: Listening, Writing, and Speaking.",
    accent: "bg-emerald-600",
    image: "/assets/courses/course-img-2.jpg",
  },
  "cefr-alignment": {
    title: "CEFR Alignment Course",
    subtitle:
      "A structured language journey aligned with CEFR levels from A1 to C2 with practical milestones.",
    accent: "bg-sky-600",
    image: "/assets/courses/course-img-3.jpg",
  },
};

const lessons = [
  {
    id: "mod-1",
    title: "Comprehensive Curriculum",
    items: ["Modal Verbs", "Sentence Structure", "Verb/Noun Agreement"],
  },
  {
    id: "mod-2",
    title: "Exam Techniques",
    items: ["IELTS Reading Strategies", "Time Management", "Band Descriptors"],
  },
  {
    id: "mod-3",
    title: "Practice Library",
    items: ["Mock Tests", "Audio Drills", "Writing Templates"],
  },
];

function LessonAccordion({ purchased }) {
  const [openId, setOpenId] = useState("mod-1");

  return (
    <div className="mt-8 space-y-3">
      {lessons.map((lesson) => {
        const isOpen = openId === lesson.id;

        return (
          <div
            key={lesson.id}
            className="overflow-hidden rounded-xl bg-white shadow-sm"
          >
            <button
              onClick={() => setOpenId(isOpen ? "" : lesson.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="text-sm font-semibold text-gray-800">
                {lesson.title}
              </span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                <ChevronDown size={16} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 px-4 pb-4">
                    {lesson.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                      >
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <PlayCircle size={15} className="text-emerald-600" />
                          <span>{item}</span>
                        </div>
                        {!purchased && (
                          <Lock size={14} className="text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function CourseProgramDetail({ program = "english-ielts" }) {
  const data = useMemo(
    () => programContent[program] || programContent["english-ielts"],
    [program],
  );
  const [purchased, setPurchased] = useState(false);

  return (
    <section className="rounded-2xl bg-[#f2f7f5] p-4 md:p-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-gray-900">
            {data.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-gray-600">
            {data.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setPurchased(true)}
              className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
            >
              Enroll Now - $199
            </button>
            <button className="rounded-full bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
              Download Syllabus
            </button>
            {purchased && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                <CircleCheck size={14} />
                Purchased
              </span>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image
            src={data.image}
            alt={data.title}
            width={380}
            height={220}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <Sparkles size={15} className="mb-2 text-emerald-700" />
          <h3 className="text-sm font-semibold text-gray-800">
            Personalized Feedback
          </h3>
          <p className="mt-1 text-xs text-gray-600">
            Every writing assignment receives direct mentor review.
          </p>
        </div>
        <div className={`rounded-2xl p-4 text-white shadow-sm ${data.accent}`}>
          <Star size={15} className="mb-2" />
          <h3 className="text-sm font-semibold">12-Week Sprint</h3>
          <p className="mt-1 text-xs text-white/90">
            Intensive plan with weekly milestones and progress checks.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <Sparkles size={15} className="mb-2 text-emerald-700" />
          <h3 className="text-sm font-semibold text-gray-800">
            Adaptive Mock Tests
          </h3>
          <p className="mt-1 text-xs text-gray-600">
            Exam simulations tuned to your most recent results.
          </p>
        </div>
      </div>

      <LessonAccordion purchased={purchased} />
    </section>
  );
}

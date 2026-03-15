"use client";

import Image from "next/image";
import { Dot, Play } from "lucide-react";
import { useTranslation } from "react-i18next";

import Courses from "../shared/cards/courses-card";
import Mentors from "../shared/cards/mentors-card";
import Community from "../shared/cards/community-card";
import Testimonials from "../shared/cards/testimonials";
import Footer from "../shared/footer";
import Navbar from "./navbar";
import CursorFollower from './cursor-follower';
import AnimatedSection from "./cards/framer-card";

import { motion } from "framer-motion";

export default function Hero() {
  const { t } = useTranslation();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const zoomIn = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Navbar />

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full mt-10 md:mt-18 py-16 transition-colors duration-500"
      >
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div variants={fadeUp}>
            <div className="flex w-fit items-center border border-green-500/40 font-bold text-green-500 px-4 rounded-full text-sm mb-6 bg-green-500/5">
              <Dot size={40} /> {t("hero.badge")}
            </div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-[#E5E7EB]"
            >
              {t("hero.titleLine1")}
              <br />

              <span className="text-green-400">{t("hero.titleLine2")}</span>

              <br />

              {t("hero.titleLine3")}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 dark:text-[#9CA3AF] mt-6 max-w-lg"
            >
              {t("hero.description")}
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-8">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transition shadow-lg shadow-green-500/20">
                {t("buttons.start")}
              </button>

              <button className="border border-gray-300 dark:border-[#1F2937] px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-[#111827] transition text-gray-800 dark:text-[#E5E7EB]">
                {t("buttons.youtubeChanel")}
              </button>
            </motion.div>

            {/* Stats */}
            <div className="flex gap-8 mt-10 text-sm text-gray-700 dark:text-[#9CA3AF]">
              <span>👨‍🎓 {t("hero.stats.students")}</span>

              <span>📚 {t("hero.stats.courses")}</span>

              <span>⭐ {t("hero.stats.rating")}</span>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div variants={zoomIn} className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-gray-200 dark:border-[#1F2937]">
              <Image
                src="/assets/images/hero.jpg"
                width={600}
                height={400}
                alt="learning"
                className="w-full object-cover"
              />
            </div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 cursor-pointer hover:scale-110 transition">
                <Play color="white" size={28} />
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              variants={fadeUp}
              className="absolute -bottom-6 left-6 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-[#1F2937] shadow-lg rounded-xl px-4 py-3 text-sm backdrop-blur"
            >
              📚
              <span className="font-semibold text-gray-900 dark:text-[#E5E7EB]">
                {t("hero.badgeCourses")}
              </span>
              <p className="text-gray-500 dark:text-[#9CA3AF] text-xs">
                {t("hero.badgeText")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Courses />
      <Mentors />
      <Community />
      <Testimonials />
      <Footer />
    </>
  );
}

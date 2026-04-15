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
import CursorFollower from "./cursor-follower";
import AnimatedSection from "./cards/framer-card";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CompanyLogoSlider from "./our-partners";

export default function Hero() {
  const { t } = useTranslation();

  const [index, setIndex] = useState(0);

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

  const floating = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
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

  const images = [
    "/assets/images/hero1.jpg",
    "/assets/images/hero2.jpg",
    "/assets/images/hero3.jpg",
    "/assets/images/hero4.jpg",
    "/assets/images/hero5.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <motion.section
        id="#"
        variants={container}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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

              <Link href="/pricing">
                <button className="border border-gray-300 dark:border-[#1F2937] px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-[#111827] transition text-gray-800 dark:text-[#E5E7EB]">
                  {t("buttons.youtubeChanel")}
                </button>
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="flex gap-8 mt-10 text-sm text-gray-700 dark:text-[#9CA3AF]">
              <span>👨‍🎓 {t("hero.stats.students")}</span>

              <span>📚 {t("hero.stats.courses")}</span>

              <span>⭐ {t("hero.stats.rating")}</span>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={floating}
            animate="animate"
            className="relative"
          >
            {/* rotating glow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 opacity-20 blur-3xl"
            />

            {/* soft glow */}
            <div className="absolute -inset-8 -z-20">
              <div className="w-full h-full rounded-3xl bg-gradient-to-r from-green-400/30 via-emerald-400/20 to-teal-400/30 blur-3xl opacity-70 dark:opacity-40"></div>
            </div>

            {/* image */}
            <div className="relative z-20 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-gray-400 dark:border-[#1F2937] p-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={images[index]}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src={images[index]}
                    width={600}
                    height={400}
                    alt="learning"
                    className="w-full object-cover rounded-3xl"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Courses />
      <Mentors />
      <Community />
      <Testimonials />
      <CompanyLogoSlider />
      <Footer />
    </>
  );
}

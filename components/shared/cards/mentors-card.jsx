"use client";

import Image from "next/image";
import { Star, Twitter, Linkedin, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Mentors() {
  const { t } = useTranslation();

  const mentors = [
    {
      id: 1,
      name: t("mentors.items.0.name"),
      role: t("mentors.items.0.role"),
      image: "/assets/avatars/mentor-avatar-1-1.jpg",
      rating: 4.9,
      bio: t("mentors.items.0.bio"),
      primaryValue: t("mentors.items.0.primaryValue"),
      primaryLabel: t("mentors.items.0.primaryLabel"),
      secondaryValue: t("mentors.items.0.secondaryValue"),
      secondaryLabel: t("mentors.items.0.secondaryLabel"),
    },
    {
      id: 2,
      name: t("mentors.items.1.name"),
      role: t("mentors.items.1.role"),
      image: "/assets/avatars/mentor-avatar-2.jpg",
      rating: 4.8,
      bio: t("mentors.items.1.bio"),
      primaryValue: t("mentors.items.1.primaryValue"),
      primaryLabel: t("mentors.items.1.primaryLabel"),
      secondaryValue: t("mentors.items.1.secondaryValue"),
      secondaryLabel: t("mentors.items.1.secondaryLabel"),
    },
    {
      id: 3,
      name: t("mentors.items.2.name"),
      role: t("mentors.items.2.role"),
      image: "/assets/avatars/mentor-avatar-2.jpg",
      rating: 4.9,
      bio: t("mentors.items.2.bio"),
      primaryValue: t("mentors.items.2.primaryValue"),
      primaryLabel: t("mentors.items.2.primaryLabel"),
      secondaryValue: t("mentors.items.2.secondaryValue"),
      secondaryLabel: t("mentors.items.2.secondaryLabel"),
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 50,
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

  const cardAnimation = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section id="mentors"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 bg-white dark:bg-[#0B0F14] border-y border-gray-200 dark:border-[#1F2937]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-green-500 tracking-widest text-sm font-semibold">
            {t("mentors.badge")}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-[#E5E7EB] mt-3">
            {t("mentors.title")}
            <span className="text-green-500">
              {" "}
              {t("mentors.titleHighlight")}
            </span>
          </h2>

          <p className="text-gray-600 dark:text-[#9CA3AF] mt-4 max-w-xl mx-auto">
            {t("mentors.description")}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mentors.map((mentor) => (
            <motion.div
              key={mentor.id}
              variants={cardAnimation}
             
              className="group hover:scale-[1.02] bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-[#1F2937] rounded-2xl shadow-md dark:shadow-black/40 hover:shadow-xl transition duration-300 p-6 text-center"
            >
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative w-24 h-24 mx-auto mb-4"
              >
                <Image
                  src={mentor.image}
                  fill
                  alt={mentor.name}
                  className="rounded-full group-hover:scale-[1.1] transition duration-300 group-hover:rotate-10 object-cover border-4 border-green-400"
                />

                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                  {mentor.rating}
                  <Star size={12} fill="white" />
                </div>
              </motion.div>

              {/* Info */}
              <h3 className="font-semibold text-lg text-gray-900 dark:text-[#E5E7EB]">
                {mentor.name}
              </h3>

              <p className="text-sm text-gray-500 dark:text-[#9CA3AF] mb-3">
                {mentor.role}
              </p>

              <p className="text-sm text-gray-600 dark:text-[#9CA3AF] mb-5">
                {mentor.bio}
              </p>

              {/* Stats */}
              <div className="flex justify-center gap-6 text-sm text-gray-700 dark:text-[#9CA3AF] mb-5">
                <span>
                  <b>{mentor.primaryValue}</b> {mentor.primaryLabel}
                </span>

                <span>
                  <b>{mentor.secondaryValue}</b> {mentor.secondaryLabel}
                </span>
              </div>

              {/* Social */}
              <div className="flex justify-center gap-3 text-gray-500 dark:text-[#9CA3AF]">
                <Twitter
                  size={18}
                  className="hover:text-green-500 cursor-pointer transition"
                />

                <Linkedin
                  size={18}
                  className="hover:text-green-500 cursor-pointer transition"
                />

                <Github
                  size={18}
                  className="hover:text-green-500 cursor-pointer transition"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

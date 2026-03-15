"use client";

import Image from "next/image";
import { Clock, Users, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Courses() {
  const { t } = useTranslation();

  const courses = [
    {
      id: 1,
      category: t("courses.items.0.category"),
      color: "bg-yellow-400",
      title: t("courses.items.0.title"),
      instructor: "Trisha Leo",
      avatar: "/assets/avatars/avatar-1.jpg",
      image: "/assets/courses/course-img-1.jpg",
      duration: t("courses.items.0.duration"),
      students: "2.4K",
      rating: "4.9",
      price: "$49",
    },
    {
      id: 2,
      category: t("courses.items.1.category"),
      color: "bg-red-500",
      title: t("courses.items.1.title"),
      instructor: "Sarah Johnson",
      avatar: "/assets/avatars/avatar-2.jpg",
      image: "/assets/courses/course-img-2.jpg",
      duration: t("courses.items.1.duration"),
      students: "1.8K",
      rating: "4.8",
      price: "$79",
    },
    {
      id: 3,
      category: t("courses.items.2.category"),
      color: "bg-blue-500",
      title: t("courses.items.2.title"),
      instructor: "Mike Chen",
      avatar: "/assets/avatars/avatar-3.jpg",
      image: "/assets/courses/course-img-3.jpg",
      duration: t("courses.items.2.duration"),
      students: "3.2K",
      rating: "4.9",
      price: "$129",
    },
    {
      id: 4,
      category: t("courses.items.3.category"),
      color: "bg-green-500",
      title: t("courses.items.3.title"),
      instructor: "Emma Davis",
      avatar: "/assets/avatars/avatar-4.jpg",
      image: "/assets/courses/course-img-4.jpg",
      duration: t("courses.items.3.duration"),
      students: "1.5K",
      rating: "4.7",
      price: "$69",
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.7,
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
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 bg-white dark:bg-[#0B0F14]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div variants={fadeUp} className="text-center mb-14">
          <p className="text-green-500 font-semibold tracking-widest text-sm">
            {t("courses.badge")}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-[#E5E7EB] mt-3">
            {t("courses.title")}{" "}
            <span className="text-green-500">
              {t("courses.titleHighlight")}
            </span>
          </h2>

          <p className="text-gray-600 dark:text-[#9CA3AF] max-w-xl mx-auto mt-4">
            {t("courses.description")}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={cardAnimation}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-[#1F2937] rounded-2xl shadow-md dark:shadow-black/40 hover:shadow-xl transition overflow-hidden"
            >
              {/* Image */}
              <div className="relative">
                <Image
                  src={course.image}
                  width={400}
                  height={250}
                  alt={course.title}
                  className="w-full h-52 object-cover"
                />

                <span
                  className={`absolute top-4 left-4 text-white text-xs px-3 py-1 rounded-full ${course.color}`}
                >
                  {course.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 dark:text-[#E5E7EB] mb-4">
                  {course.title}
                </h3>

                {/* Instructor */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#9CA3AF] mb-4">
                  <Image
                    src={course.avatar}
                    width={30}
                    height={30}
                    alt=""
                    className="rounded-full"
                  />
                  {course.instructor}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-[#9CA3AF] mb-5">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {course.duration}
                  </div>

                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    {course.students}
                  </div>

                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    {course.rating}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-[#1F2937] pt-4">
                  <span className="font-bold text-lg text-gray-900 dark:text-[#E5E7EB]">
                    {course.price}
                  </span>

                  <button className="text-green-500 font-medium hover:text-green-400 transition">
                    {t("courses.enroll")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Button */}
        <motion.div variants={fadeUp} className="flex justify-center mt-14">
          <button className="border border-gray-300 dark:border-[#1F2937] px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-[#111827] dark:text-[#E5E7EB] transition">
            {t("courses.viewAll")}
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}

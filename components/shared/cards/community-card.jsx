"use client";

import Image from "next/image";
import {
  Users,
  MessageCircle,
  Calendar,
  Globe,
  Heart,
  Bell,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const avatars = [
  { id: 1, image: "/assets/avatars/community-avatar-1.jpg" },
  { id: 2, image: "/assets/avatars/community-avatar-2.jpg" },
  { id: 3, image: "/assets/avatars/community-avatar-3.jpg" },
  { id: 4, image: "/assets/avatars/community-avatar-4.jpg" },
  { id: 5, image: "/assets/avatars/community-avatar-5.jpg" },
  { id: 6, image: "/assets/avatars/community-avatar-6.jpg" },
  { id: 7, image: "/assets/avatars/community-avatar-7.jpg" },
  { id: 8, image: "/assets/avatars/community-avatar-8.jpg" },
  { id: 9, image: "/assets/avatars/community-avatar-9.jpg" },
];

export default function Community() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Users,
      title: t("community.features.studyGroupsTitle"),
      text: t("community.features.studyGroupsText"),
    },
    {
      icon: MessageCircle,
      title: t("community.features.discussionForumsTitle"),
      text: t("community.features.discussionForumsText"),
    },
    {
      icon: Calendar,
      title: t("community.features.liveSessionsTitle"),
      text: t("community.features.liveSessionsText"),
    },
    {
      icon: Bell,
      title: t("community.features.peerSupportTitle"),
      text: t("community.features.peerSupportText"),
    },
    {
      icon: Globe,
      title: t("community.features.globalCommunityTitle"),
      text: t("community.features.globalCommunityText"),
    },
    {
      icon: Heart,
      title: t("community.features.projectCollaborationTitle"),
      text: t("community.features.projectCollaborationText"),
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const avatarAnim = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section id="community"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="py-24 bg-white dark:bg-[#0B0F14] border-y border-gray-200 dark:border-[#1F2937]"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <motion.div variants={fadeUp}>
          <p className="text-green-500 text-sm font-semibold tracking-widest">
            {t("community.badge")}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3">
            {t("community.title")}{" "}
            <span className="text-green-500">
              {t("community.titleHighlight")}
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-lg">
            {t("community.description")}
          </p>

          {/* Features */}
          <motion.div
            variants={container}
            className="grid md:grid-cols-2 gap-6 mt-10"
          >
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="flex gap-4"
                >
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full h-fit">
                    <Icon className="text-green-500" size={20} />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.button
            variants={fadeUp}
            className="mt-10 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium"
          >
            {t("community.button")}
          </motion.button>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          variants={fadeUp}
          className="relative bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-lg"
        >
          {/* Avatar Grid */}
          <motion.div
            variants={container}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-3 justify-items-center"
          >
            {avatars.map((avatar) => (
              <motion.div
                key={avatar.id}
                variants={avatarAnim}
                className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-green-400"
              >
                <motion.div
                  whileHover={{ scale: 1.45 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <Image
                    src={avatar.image}
                    fill
                    alt="community member"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Floating Badge Top */}
          <motion.div
            variants={fadeUp}
            className="absolute -top-6 right-6 bg-white dark:bg-gray-800 shadow-md rounded-xl px-4 py-3 text-sm"
          >
            <p className="font-semibold text-gray-900 dark:text-white">
              {t("community.badges.supportTitle")}
            </p>
            <p className="text-gray-500 text-xs">
              {t("community.badges.supportText")}
            </p>
          </motion.div>

          {/* Floating Badge Bottom */}
          <motion.div
            variants={fadeUp}
            className="absolute -bottom-6 left-6 bg-white dark:bg-gray-800 shadow-md rounded-xl px-4 py-3 text-sm"
          >
            <p className="font-semibold text-gray-900 dark:text-white">
              {t("community.badges.countriesTitle")}
            </p>
            <p className="text-gray-500 text-xs">
              {t("community.badges.countriesText")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

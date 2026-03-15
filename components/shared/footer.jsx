"use client";

import {
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    product: t("footer.productLinks", { returnObjects: true }),
    company: t("footer.companyLinks", { returnObjects: true }),
    support: t("footer.supportLinks", { returnObjects: true }),
    helpCenter: t("footer.helpCenterLinks", { returnObjects: true }),
  };

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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white dark:bg-[#0B0F14] border-t border-gray-200 dark:border-[#1F2937]"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-5 gap-12">
        {/* Left Info */}
        <motion.div variants={fadeUp} className="lg:col-span-1">
          <div className="flex items-center gap-2 font-semibold text-xl text-gray-900 dark:text-[#E5E7EB]">
            <BookOpen className="text-green-500" />
            LearnHub
          </div>

          <p className="text-gray-600 dark:text-[#9CA3AF] mt-4 text-sm">
            {t("footer.description")}
          </p>

          <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-[#9CA3AF]">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              hello@learnhub.com
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              +1 (234) 567-890
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              {t("footer.location")}
            </div>
          </div>
        </motion.div>

        {/* Product */}
        <motion.div variants={fadeUp}>
          <h4 className="font-semibold text-gray-900 dark:text-[#E5E7EB] mb-4">
            {t("footer.product")}
          </h4>

          <ul className="space-y-2 text-gray-600 dark:text-[#9CA3AF] text-sm">
            {footerLinks.product.map((link, index) => (
              <li key={index}>
                <Link href="#" className="hover:text-green-500 transition">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Company */}
        <motion.div variants={fadeUp}>
          <h4 className="font-semibold text-gray-900 dark:text-[#E5E7EB] mb-4">
            {t("footer.company")}
          </h4>

          <ul className="space-y-2 text-gray-600 dark:text-[#9CA3AF] text-sm">
            {footerLinks.company.map((link, index) => (
              <li key={index}>
                <Link href="#" className="hover:text-green-500 transition">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Support */}
        <motion.div variants={fadeUp}>
          <h4 className="font-semibold text-gray-900 dark:text-[#E5E7EB] mb-4">
            {t("footer.support")}
          </h4>

          <ul className="space-y-2 text-gray-600 dark:text-[#9CA3AF] text-sm">
            {footerLinks.support.map((link, index) => (
              <li key={index}>
                <Link href="#" className="hover:text-green-500 transition">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Help Center */}
        <motion.div variants={fadeUp}>
          <h4 className="font-semibold text-gray-900 dark:text-[#E5E7EB] mb-4">
            {t("footer.helpCenter")}
          </h4>

          <ul className="space-y-2 text-gray-600 dark:text-[#9CA3AF] text-sm">
            {footerLinks.helpCenter.map((link, index) => (
              <li key={index}>
                <Link href="#" className="hover:text-green-500 transition">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div
        variants={fadeUp}
        className="border-t border-gray-200 dark:border-[#1F2937] py-6"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-[#9CA3AF]">
            {t("footer.copyright")}
          </p>

          <div className="flex gap-4 text-gray-500 dark:text-[#9CA3AF]">
            <Twitter
              size={18}
              className="hover:text-green-500 hover:scale-110 cursor-pointer transition"
            />
            <Linkedin
              size={18}
              className="hover:text-green-500 hover:scale-110 cursor-pointer transition"
            />
            <Github
              size={18}
              className="hover:text-green-500 hover:scale-110 cursor-pointer transition"
            />
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}

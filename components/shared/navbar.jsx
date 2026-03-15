"use client";

import { useState, useEffect } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import Link from "next/link";
import ModeToggle from "./mode-toggle";
import LanguageSwitcher from "./language-dropdown";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { t } = useTranslation();

  const menu = [
    { name: t("navbar.home"), link: "#" },
    { name: t("navbar.courses"), link: "#" },
    { name: t("navbar.mentor"), link: "#" },
    { name: t("navbar.group"), link: "#" },
    { name: t("navbar.testimonials"), link: "#" },
    { name: t("navbar.pricing"), link: "#" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full fixed top-0 z-50 transition-all duration-300 border-b
      ${
        scrolled
          ? "py-2 bg-white/80 backdrop-blur-md shadow-lg dark:bg-[#0b1117]/80 border-gray-200 dark:border-gray-800"
          : "py-4 bg-white dark:bg-[#0b1117] border-gray-200 dark:border-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
        <motion.div
          animate={{ scale: scrolled ? 0.9 : 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 font-semibold text-xl text-gray-900 dark:text-white"
        >
          <BookOpen className="text-green-500" />
          LearnHub
        </motion.div>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex gap-8 text-gray-700 dark:text-gray-200 font-medium">
          {menu.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className="hover:text-green-500 transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition"
          >
            Get Started
          </motion.button>

          <LanguageSwitcher />

          <div className="border rounded-md">
            <ModeToggle />
          </div>
        </div>

        {/* MOBILE ICON */}
        <div className="lg:hidden flex items-center gap-1 md:gap-3">
          <ModeToggle />
          <LanguageSwitcher />

          <button
            onClick={() => setOpen(!open)}
            className="text-gray-900 dark:text-white"
          >
            {open ? (
              <X className="size-5 md:size-7" />
            ) : (
              <Menu className="size-5 md:size-7" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden px-6 pb-6 bg-white dark:bg-black"
        >
          <ul className="flex flex-col gap-4 text-gray-700 dark:text-gray-200 font-medium">
            {menu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  onClick={() => setOpen(false)}
                  className="block hover:text-green-500 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full transition"
          >
            Get Started
          </motion.button>
        </motion.div>
      )}
    </motion.nav>
  );
}

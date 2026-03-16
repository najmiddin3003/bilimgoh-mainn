"use client";

import { useState, useEffect } from "react";
import { Menu, X, BookOpenText } from "lucide-react";
import Link from "next/link";
import ModeToggle from "./mode-toggle";
import LanguageSwitcher from "./language-dropdown";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { isSignedIn } = useUser();
  const { t } = useTranslation();

  const menu = [
    { name: t("navbar.home"), link: "#" },
    { name: t("navbar.courses"), link: "#courses" },
    { name: t("navbar.mentor"), link: "#mentors" },
    { name: t("navbar.group"), link: "#community" },
    { name: t("navbar.testimonials"), link: "#testimonial" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed w-full top-0 z-50 border-b transition-all duration-300
      ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow dark:bg-[#0b1117]/80"
          : "bg-white dark:bg-[#0b1117]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* LOGO */}
        <Link href="/">
          <div className="flex items-center gap-2 font-semibold text-lg text-gray-900 dark:text-white">
            <BookOpenText className="text-green-500" />
            Bilimgoh
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex gap-8 text-gray-700 dark:text-gray-200 font-medium">
          {menu.map((item, i) => (
            <li key={i}>
              <Link
                href={item.link}
                className="hover:text-green-500 transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* DESKTOP RIGHT */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <div className="border rounded-md">
          <ModeToggle />
          </div>

          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium transition shadow-md">
                {t("buttons.getStarted")}
              </button>
            </SignInButton>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>

        {/* MOBILE RIGHT */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <div className="border rounded-md">
          <ModeToggle />
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t bg-white dark:bg-[#0b1117]"
        >
          <div className="px-6 py-6 flex flex-col gap-6">
            {/* MENU LINKS */}
            {menu.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                onClick={() => setOpen(false)}
                className="text-gray-700 dark:text-gray-200 font-medium hover:text-green-500 transition"
              >
                {item.name}
              </Link>
            ))}

            {/* AUTH BUTTON */}
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-medium transition">
                  {t("buttons.getStarted")}
                </button>
              </SignInButton>
            ) : (
              <div className="flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

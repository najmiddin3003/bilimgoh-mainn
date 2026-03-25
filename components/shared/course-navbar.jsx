"use client";

import { Bell, BookOpenText, Search } from "lucide-react";

const links = ["Courses", "Certifications", "Library", "Community"];

export default function CourseNavbar() {
  return (
    <header className="mb-4 rounded-2xl bg-white px-4 py-3 shadow-sm md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-emerald-900">
          <BookOpenText size={20} />
          <span className="font-semibold">The Botanical Archive</span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a key={link} href="#" className="text-sm text-gray-500 hover:text-emerald-700">
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm text-gray-400">
            <Search size={14} />
            <span className="hidden sm:inline">Search archive...</span>
          </div>
          <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <Bell size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

"use client";

import { BookOpen, Globe, GraduationCap, BarChart3, Crown } from "lucide-react";

const menuItems = [
  { id: "all-lessons", label: "All Lessons", icon: Globe },
  { id: "til-kurslari", label: "Til kurslari", icon: BookOpen },
  { id: "aniq-fanlar", label: "Aniq fanlar", icon: GraduationCap },
  { id: "ijtimoiy-fanlar", label: "Ijtimoiy fanlar", icon: Globe },
  { id: "imtihon-tayyorlov", label: "Imtihon tayyorlov", icon: BookOpen },
  { id: "maktab-tayyorlov", label: "Maktab tayyorlov", icon: GraduationCap },
  { id: "kasbiy-rivojlanish", label: "Kasbiy rivojlanish", icon: BarChart3 },
  { id: "it-kurslar", label: "IT kurslar", icon: BookOpen },
  { id: "bolalar-kurslari", label: "Bolalar kurslari", icon: Globe },
];

export default function CourseSidebar({
  activeItem = "english-ielts",
  onSelectItem = () => {},
}) {
  return (
    <aside className="sticky top-20 self-start rounded-2xl bg-emerald-50 p-4 md:p-5">
      <div className="mb-6 flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
        <div className="h-9 w-9 rounded-full bg-emerald-100" />
        <div>
          <p className="text-xs text-gray-500">Learning Path</p>
          <p className="text-sm font-semibold text-gray-800">Academic Level 02</p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectItem(item.id)}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
                isActive
                  ? "bg-emerald-100 text-emerald-800"
                  : "text-gray-600 hover:bg-white"
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-800">
        <Crown size={16} />
        Upgrade to Premium
      </button>
    </aside>
  );
}

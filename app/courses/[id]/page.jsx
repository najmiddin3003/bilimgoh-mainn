"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams, useSearchParams } from "next/navigation";
import CourseProgramDetail from "@/components/shared/course-program-detail";
import CourseLearningContent from "@/components/shared/course-learning-content";
import CourseSidebar from "@/components/shared/course-sidebar";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function CourseDetail() {
  const params = useParams();
  const searchParams = useSearchParams();
  const program = searchParams.get("program");
  const defaultSidebar = useMemo(() => "all-lessons", []);
  const [activeSidebar, setActiveSidebar] = useState(defaultSidebar);
  const [contentMode, setContentMode] = useState(program ? "program" : "overview");

  const handleSidebarSelect = (itemId) => {
    setActiveSidebar(itemId);
    setContentMode("overview");
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl py-20 bg-white px-10">
        <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div className="">
          <CourseSidebar
            activeItem={activeSidebar}
            onSelectItem={handleSidebarSelect}
          />
          </div>
          <AnimatePresence mode="wait">
            {contentMode === "program" && program ? (
              <motion.div
                key={`program-${activeSidebar}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <CourseProgramDetail program={program || "english-ielts"} />
              </motion.div>
            ) : (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <CourseLearningContent
                  courseId={params?.id || "1"}
                  selectedMenuItem={activeSidebar}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </main>
  );
}

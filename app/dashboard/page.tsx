import type { Metadata } from "next"

import Profile from "@/components/shared/profile"

export const metadata: Metadata = {
  title: "Mening kabinetim — Bilimgoh",
  description: "Shaxsiy kabinet — kurslar, progress va reja",
}

export default function MePage() {
  return <Profile />
}

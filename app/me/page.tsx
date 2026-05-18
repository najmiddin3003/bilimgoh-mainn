import type { Metadata } from "next"

import Cabinet from "@/components/shared/cabinet"

export const metadata: Metadata = {
  title: "Profil — Bilimgoh",
  description: "Foydalanuvchi profili va mukofotlar",
}

export default function MePage() {
  return <Cabinet />
}

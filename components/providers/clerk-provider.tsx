"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { enUS, ruRU } from "@clerk/localizations";
import { useTranslation } from "react-i18next";

import { uz } from "@/localization/clerk-uz";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();


  console.log("LANG:", i18n.language);

  const localization =
    i18n.language === "ru" ? ruRU : i18n.language === "uz" ? uz : enUS;

  return (
    <ClerkProvider localization={localization} key={i18n.language}>
      {children}
    </ClerkProvider>
  );
}

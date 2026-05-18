import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "@/i18n/config";
import PremiumCursor from "@/components/shared/cursor-follower";

const montSerrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bilimgoh",
  description: "Bilimgoh education platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={`${montSerrat.className} antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PremiumCursor />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

'use client';

import { LanguageProvider } from "@/context/LanguageContext";

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}

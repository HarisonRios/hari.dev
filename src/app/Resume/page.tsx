import type { Metadata } from 'next';
import ResumeContent from "@/components/ResumeContent";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: 'Resume — Harison Rios',
  description: 'Curriculum vitae of Harison Rios — Data Engineering Intern, FullStack Developer. Skills: React, Node.js, Python, Docker, AWS.',
  openGraph: {
    title: 'Resume — Harison Rios',
    description: 'CV of Harison Rios — FullStack Developer & Data Engineer from São Paulo.',
  },
};

export default function Resume() {
  return <PageTransition><ResumeContent /></PageTransition>;
}

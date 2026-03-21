'use client';

import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiMongodb,
  SiMysql,
  SiGit,
  SiAmazon,
  SiNextdotjs,
  SiVite,
  SiDocker,
  SiSpring,
  SiAngular,
  SiPostgresql,
  SiTailwindcss,
} from 'react-icons/si';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const allTechItems = [
  // Linguagens
  { name: 'TypeScript', icon: <SiTypescript />, color: 'text-blue-400' },
  { name: 'Javascript', icon: <SiJavascript />, color: 'text-yellow-400' },
  { name: 'Python', icon: <SiPython />, color: 'text-blue-600' },
  // Frameworks & Libs
  { name: 'React', icon: <SiReact />, color: 'text-cyan-400' },
  { name: 'Next.js', icon: <SiNextdotjs />, color: 'text-white' },
  { name: 'Angular', icon: <SiAngular />, color: 'text-red-500' },
  { name: 'Spring Boot', icon: <SiSpring />, color: 'text-green-500' },
  { name: 'Node.js', icon: <SiNodedotjs />, color: 'text-green-600' },
  { name: 'Tailwind', icon: <SiTailwindcss />, color: 'text-cyan-400' },
  { name: 'Vite', icon: <SiVite />, color: 'text-purple-400' },
  // Banco de dados
  { name: 'MongoDB', icon: <SiMongodb />, color: 'text-green-500' },
  { name: 'MySQL', icon: <SiMysql />, color: 'text-blue-700' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'text-blue-400' },
  // Infra & DevOps
  { name: 'Docker', icon: <SiDocker />, color: 'text-blue-400' },
  { name: 'AWS', icon: <SiAmazon />, color: 'text-orange-500' },
  { name: 'Git', icon: <SiGit />, color: 'text-orange-600' },
];

export const TechStack = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm h-full">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-white">{t.techStack.title}</h2>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {allTechItems.map((tech) => (
          <div
            key={tech.name}
            className="group flex flex-col items-center justify-center"
            title={tech.name}
          >
            <div className="text-white text-4xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-2">
              {tech.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

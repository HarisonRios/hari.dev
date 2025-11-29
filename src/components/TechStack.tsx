'use client';

import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiSass,
  SiCss3,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiAmazon,
  SiPhp,
  SiNextdotjs,
  SiVite,
  SiDocker,
} from "react-icons/si";

const allTechItems = [
  { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-400" },
  { name: "Javascript", icon: <SiJavascript />, color: "text-yellow-400" },
  { name: "Python", icon: <SiPython />, color: "text-blue-600" },
  { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500" },
  { name: "Node.js", icon: <SiNodedotjs />, color: "text-green-600" },
  { name: "React", icon: <SiReact />, color: "text-cyan-400" },
  { name: "PHP", icon: <SiPhp />, color: "text-purple-500" },
  { name: "MySQL", icon: <SiMysql />, color: "text-blue-700" },
  { name: "Sass", icon: <SiSass />, color: "text-pink-400" },
  { name: "CSS3", icon: <SiCss3 />, color: "text-blue-500" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "text-white" },
  { name: "Vite", icon: <SiVite />, color: "text-purple-400" },
  { name: "Git", icon: <SiGit />, color: "text-orange-600" },
  { name: "GitHub", icon: <SiGithub />, color: "text-gray-300" },
  { name: "AWS", icon: <SiAmazon />, color: "text-orange-500" },
  { name: "Docker", icon: <SiDocker />, color: "text-blue-400" },
];

export const TechStack = () => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm h-full">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-white">Stack</h2>
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

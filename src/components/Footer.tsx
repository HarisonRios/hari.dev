'use client';

import { SiNextdotjs, SiTailwindcss } from 'react-icons/si';

export const Footer = () => {
  return (
    <footer className="w-full py-4 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 text-gray-400 text-xs md:text-sm">
        <span>Made by</span>
        <a 
          href="https://github.com/HarisonRios" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-purple-400 transition-colors"
        >
          @harisonrios
        </a>
        <span>with</span>
        <div className="flex items-center gap-1">
          <a 
            href="https://nextjs.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors flex items-center gap-0.5"
            title="Next.js"
          >
            <SiNextdotjs size={14} />
            <span className="hidden sm:inline">Next</span>
          </a>
          <span>and</span>
          <a 
            href="https://tailwindcss.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors flex items-center gap-0.5"
            title="Tailwind CSS"
          >
            <SiTailwindcss size={14} />
            <span className="hidden sm:inline">Tailwind</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

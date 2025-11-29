'use client';

import { SiNextdotjs, SiTailwindcss } from 'react-icons/si';

export const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 border-t border-white/10 bg-slate-900/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-400 text-sm md:text-base">
        <span>Made by</span>
        <a 
          href="https://github.com/HarisonRios" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white font-semibold hover:text-purple-400 transition-colors"
        >
          @harisonrios
        </a>
        <span>with</span>
        <div className="flex items-center gap-3">
          <a 
            href="https://nextjs.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors flex items-center gap-1"
            title="Next.js"
          >
            <SiNextdotjs size={20} />
            <span className="hidden sm:inline">Next</span>
          </a>
          <span>and</span>
          <a 
            href="https://tailwindcss.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors flex items-center gap-1"
            title="Tailwind CSS"
          >
            <SiTailwindcss size={20} />
            <span className="hidden sm:inline">Tailwind</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

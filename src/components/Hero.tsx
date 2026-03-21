'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-40 pb-4">
      <div className="text-left">

        {/* Name + title block */}
        <div className="mb-5">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            {t.name}
          </h1>
          <p className="text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-semibold">
            {t.title}
          </p>
        </div>

        {/* Meta pills row */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {/* Age chip */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-gray-300 text-xs font-medium">
            <span className="text-purple-400">✦</span>
            {t.subtitle}
          </span>

          {/* Location chip */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-gray-300 text-xs font-medium">
            <svg className="w-3 h-3 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {t.location}
          </span>

          {/* Flags */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg"
              alt="Brazil"
              className="w-4 h-3 rounded-[2px]"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Bandeira_do_estado_de_S%C3%A3o_Paulo.svg"
              alt="São Paulo"
              className="w-4 h-3 rounded-[2px]"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg"
              alt="SPFC"
              className="w-3.5 h-3.5"
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-8 max-w-xl border-l-2 border-purple-500/40 pl-4">
          {t.description}
          <span className="text-white font-semibold">{t.fullstack}</span>
          {t.solutions}
          <span className="text-white font-semibold"> {t.games}</span>,
          <span className="text-white font-semibold"> {t.rap}</span>
          {t.and}
          <span className="text-white font-semibold">{t.trap}</span>
          {t.always}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-semibold">
            {t.tech_creativity}
          </span>
          .
        </p>

      </div>
    </div>
  );
};

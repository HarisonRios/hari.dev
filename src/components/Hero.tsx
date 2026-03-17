'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-40 pb-4">
      <div className="text-left">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            {t.name}
          </h1>
          <p className="text-sm md:text-lg text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 font-semibold">
            {t.title}
          </p>
          <p className="text-xs md:text-sm text-gray-300 mt-2">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-2 mb-4 flex items-center gap-2">
          <span className="text-gray-300 text-sm">📍</span>
          <p className="text-gray-200 text-xs md:text-sm font-medium">{t.location}</p>
          <div className="flex items-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg"
              alt="Brazil flag"
              className="w-5 h-3"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Bandeira_do_estado_de_S%C3%A3o_Paulo.svg"
              alt="Sao Paulo state flag"
              className="w-5 h-3"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg"
              alt="Sao Paulo FC crest"
              className="w-4 h-4"
            />
          </div>
        </div>

        <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-8">
          {t.description}
          <span className="text-white font-semibold">{t.fullstack}</span>
          {t.solutions}
          <span className="text-white font-semibold"> {t.games}</span>,
          <span className="text-white font-semibold"> {t.rap}</span>
          {t.and}
          <span className="text-white font-semibold">{t.trap}</span>
          {t.always}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 font-semibold">
            {t.tech_creativity}
          </span>
          .
        </p>
      </div>
    </div>
  );
};

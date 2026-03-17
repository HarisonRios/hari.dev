'use client';

import { useLanguage } from '@/context/LanguageContext';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-6 right-6 lg:top-6 lg:bottom-auto z-50 p-2 md:p-3 bg-slate-900/90 border border-slate-700/60 text-white rounded-md hover:bg-slate-800 hover:text-purple-400 transition-all duration-300 flex items-center justify-center shadow-lg"
      title={language === 'pt' ? 'Mudar para ingles' : 'Switch to portuguese'}
      type="button"
    >
      <span className="text-2xl md:text-3xl">
        {language === 'pt' ? (
          <img
            src="https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg"
            alt="Brazil flag"
            className="w-6 h-4 md:w-8 md:h-6"
          />
        ) : (
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
            alt="USA flag"
            className="w-6 h-4 md:w-8 md:h-6"
          />
        )}
      </span>
    </button>
  );
};

'use client';

import { useState, useEffect } from 'react';

export const LanguageToggle = () => {
  const [language, setLanguage] = useState<'pt' | 'en'>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('selectedLanguage') as 'pt' | 'en' | null;
    if (saved && (saved === 'pt' || saved === 'en')) {
      setLanguage(saved);
    } else {
      localStorage.setItem('selectedLanguage', 'en');
      setLanguage('en');
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'pt' ? 'en' : 'pt';
    setLanguage(newLang);
    localStorage.setItem('selectedLanguage', newLang);
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'selectedLanguage',
      newValue: newLang,
      oldValue: language,
      storageArea: localStorage
    }));
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 p-2 md:p-3 bg-slate-900/90 border border-slate-700/60 text-white rounded-md hover:bg-slate-800 hover:text-purple-400 transition-all duration-300 flex items-center justify-center shadow-lg"
      title="Toggle between Brazil and USA"
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

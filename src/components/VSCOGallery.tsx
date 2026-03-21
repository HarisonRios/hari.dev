'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface VSCOPhoto {
  id: string;
  imageUrl: string;
  link: string;
}

const rotationClasses = ['-rotate-2', 'rotate-1', '-rotate-1'];

export const VSCOGallery = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [photos, setPhotos] = useState<VSCOPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchStarted, setFetchStarted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);


  const fetchVSCOPhotos = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/vsco');

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();

      if (data?.error) {
        setPhotos([]);
        setError(true);
        return;
      }

      if (data.photos && Array.isArray(data.photos)) {
        setPhotos(data.photos);
        setError(false);
      } else {
        setPhotos([]);
        setError(false);
      }
    } catch (err) {
      console.error('Error fetching VSCO photos:', err);
      setPhotos([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !fetchStarted) {
      setFetchStarted(true);
      fetchVSCOPhotos();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);


  useEffect(() => {
    if (photos.length > 0 && currentIndex >= photos.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, photos.length]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const scrollToIndex = (index: number) => {
    if (photos.length === 0) {
      return;
    }

    const safeIndex = (index + photos.length) % photos.length;
    setCurrentIndex(safeIndex);

    const target = itemRefs.current[safeIndex];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      return;
    }

    if (stripRef.current) {
      stripRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    scrollToIndex(currentIndex + 1);
  };

  const goToPrevious = () => {
    scrollToIndex(currentIndex - 1);
  };

  const handleCardClick = (index: number) => {
    if (index === currentIndex) {
      goToNext();
      return;
    }

    scrollToIndex(index);
  };

  const previewPhoto = photos[0];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-slate-200/70 flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-slate-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-white">{t.vsco.title}</h3>
        </div>
        <div className="flex items-center gap-3">
          {isOpen && (
            <button
              type="button"
              onClick={toggleOpen}
              className="inline-flex items-center gap-2 text-xs text-slate-200 bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 px-3 py-2 rounded-full transition-colors"
              aria-label={t.vsco.hide}
            >
              <EyeOff size={14} />
              <span>{t.vsco.hide}</span>
            </button>
          )}
          <a
            href="https://vsco.co/harisonrios"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2"
          >
            {t.vsco.viewMore} <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {!isOpen ? (
        <button
          type="button"
          onClick={toggleOpen}
          className="w-full rounded-2xl border border-slate-700/40 bg-slate-900/40 hover:bg-slate-900/60 transition-colors text-left group overflow-hidden"
          aria-label={t.vsco.reveal}
        >
          <div className="relative">
            <div className="absolute inset-0">
              {previewPhoto ? (
                <img
                  src={previewPhoto.imageUrl}
                  alt="VSCO preview"
                  className="w-full h-full object-cover blur-md scale-110 opacity-80"
                />
              ) : (
                <div className="w-full h-full bg-slate-800/70" />
              )}
            </div>
            <div className="absolute inset-0 bg-linear-to-br from-slate-950/70 via-slate-900/40 to-slate-950/80" />

            <div className="relative z-10 flex flex-col md:flex-row items-start gap-6 p-6">
              <div className="bg-slate-50 rounded-sm p-3 pb-5 shadow-[0_25px_50px_-35px_rgba(0,0,0,0.8)] ring-1 ring-black/5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-0 -rotate-1">
                <div className="w-28 h-28 rounded-sm overflow-hidden bg-slate-200/80 flex items-center justify-center">
                  {previewPhoto ? (
                    <img
                      src={previewPhoto.imageUrl}
                      alt="VSCO preview thumbnail"
                      className="w-full h-full object-cover blur-sm scale-110"
                    />
                  ) : (
                    <Eye size={34} className="text-slate-700" />
                  )}
                </div>
                <div className="mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-slate-600">
                  {t.vsco.reveal}
                </div>
              </div>

              <div>
                <p className="text-white text-lg font-semibold">{t.vsco.peekTitle}</p>
                <p className="text-slate-300 text-sm mt-1">{t.vsco.peekSubtitle}</p>
              </div>
            </div>
          </div>
        </button>
      ) : loading ? (
        <div className="rounded-2xl border border-slate-700/40 bg-slate-900/40 overflow-hidden">
          {/* Top blurred preview strip */}
          <div className="relative h-32 overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-20 scale-110 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-slate-600 h-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/60 to-slate-900/95" />
          </div>

          {/* Loading message */}
          <div className="flex flex-col items-center justify-center gap-4 py-8 px-6">
            {/* Film roll icon */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-slate-700/50 animate-ping opacity-30" />
              <div className="relative z-10 w-14 h-14 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            <div className="text-center">
              <p className="text-slate-200 text-sm font-medium mb-1">{t.vsco.loadingMessage}</p>
              <p className="text-slate-400 text-xs">{t.vsco.loadingSubtitle}</p>
            </div>

            {/* Animated dots */}
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

      ) : error ? (
        <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-8 text-center">
          <p className="text-gray-400 mb-4">{t.vsco.errorTitle}</p>
          <p className="text-gray-500 text-sm mb-4">{t.vsco.errorSubtitle}</p>
        </div>
      ) : photos.length === 0 ? (
        <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-8 text-center">
          <p className="text-gray-400 mb-4">{t.vsco.emptyTitle}</p>
          <p className="text-gray-500 text-sm mb-4">{t.vsco.emptySubtitle}</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-700/40 bg-slate-900/30 p-6">
          <div className="relative">
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-9 h-9 text-slate-200 bg-slate-900/70 hover:bg-slate-900/90 border border-slate-700/60 rounded-full transition-colors"
              aria-label={t.vsco.prevPhoto}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-9 h-9 text-slate-200 bg-slate-900/70 hover:bg-slate-900/90 border border-slate-700/60 rounded-full transition-colors"
              aria-label={t.vsco.nextPhoto}
            >
              <ChevronRight size={16} />
            </button>

            <div
              ref={stripRef}
              className="flex overflow-x-auto scroll-smooth pb-6 no-scrollbar px-4"
            >
              {photos.slice(0, 12).map((photo, index) => (
                <button
                  key={photo.id}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  type="button"
                  onClick={() => handleCardClick(index)}
                  className="shrink-0 w-44 sm:w-48 md:w-52 lg:w-56 text-left group focus-visible:outline-none -ml-10 first:ml-0"
                  aria-label={t.vsco.nextPhoto}
                >
                  <div
                    className={`relative bg-white rounded-sm p-3 pb-5 border border-slate-300 shadow-[0_22px_40px_-28px_rgba(0,0,0,0.9)] ring-1 ring-black/10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-0 ${
                      index === 0 ? 'rotate-0' : rotationClasses[index % rotationClasses.length]
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-sm bg-slate-200/80 aspect-square border border-slate-300/80">
                      <img
                        src={photo.imageUrl}
                        alt="VSCO photo"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                    <div className="mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-slate-600">
                      {t.vsco.photoLabel} {index + 1}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

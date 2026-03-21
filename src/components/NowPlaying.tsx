'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface NowPlayingData {
  song: string;
  artist: string;
  album: string;
  imageUrl: string;
  url: string;
}

export const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];

  const idleTitle =
    language === 'pt' ? 'Curtindo o silencio?' : 'Enjoying the silence?';
  const idleSubtitle =
    language === 'pt'
      ? 'Harison nao esta escutando nada agora'
      : 'Nothing scrobbling right now';

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/lastfm-now');
        const data = await response.json();
        setNowPlaying(data.nowPlaying ?? null);
      } catch (err) {
        console.error('Error fetching now playing:', err);
        setNowPlaying(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 shadow-xl backdrop-blur-sm animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-slate-700 rounded-full" />
          <div className="h-4 bg-slate-700 rounded w-24" />
        </div>
        <div className="flex gap-3">
          <div className="w-16 h-16 bg-slate-700 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-700 rounded w-3/4" />
            <div className="h-3 bg-slate-700 rounded w-1/2" />
            <div className="h-3 bg-slate-700 rounded w-1/3 mt-2" />
          </div>
        </div>
      </div>
    );
  }

  if (!nowPlaying) {
    return (
      <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          {/* Spotify icon */}
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.26.3-3.239-1.98-8.159-2.58-12.061-1.419-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.361 9.504 15.021 10.189 18.591 12.3c.41.24.479.86.301 1.38zm.12-3.36C15.149 9.29 8.659 8.968 5.028 10.387c-.529.205-1.083-.158-1.288-.703-.205-.547.158-1.083.703-1.288 4.248-1.612 11.285-1.261 15.738 1.528.539.341.922 1.08.579 1.621-.342.538-1.080.922-1.621.579z" />
          </svg>
          <h3 className="text-sm font-bold text-white">{t.nowPlaying.title}</h3>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 py-6">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-pink-500/20 rounded-full blur-lg animate-pulse" />
            <svg
              className="w-10 h-10 text-gray-500 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm font-medium">{idleTitle}</p>
            <p className="text-gray-500 text-xs mt-1">{idleSubtitle}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 shadow-xl backdrop-blur-sm">
      {/* Live dot — top right corner of the card */}
      <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
      </span>

      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.26.3-3.239-1.98-8.159-2.58-12.061-1.419-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.361 9.504 15.021 10.189 18.591 12.3c.41.24.479.86.301 1.38zm.12-3.36C15.149 9.29 8.659 8.968 5.028 10.387c-.529.205-1.083-.158-1.288-.703-.205-.547.158-1.083.703-1.288 4.248-1.612 11.285-1.261 15.738 1.528.539.341.922 1.08.579 1.621-.342.538-1.080.922-1.621.579z" />
        </svg>
        <h3 className="text-sm font-bold text-white">{t.nowPlaying.title}</h3>
      </div>

      <a
        href={nowPlaying.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-3 group"
      >
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-700">
          {nowPlaying.imageUrl ? (
            <img
              src={nowPlaying.imageUrl}
              alt={nowPlaying.album}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-7 h-7 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center min-w-0">
          <p className="text-white font-semibold text-xs line-clamp-1 group-hover:text-red-400 transition-colors">
            {nowPlaying.song}
          </p>
          <p className="text-gray-400 text-xs line-clamp-1 mt-0.5">{nowPlaying.artist}</p>
          <p className="text-gray-500 text-xs line-clamp-1 mt-0.5">{nowPlaying.album}</p>
        </div>
      </a>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface Album {
  name: string;
  artist: string;
  imageUrl: string;
  playcount: number;
  url: string;
}

export const SpotifyCard: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const fetchTopAlbums = async () => {
      try {
        const response = await fetch('/api/lastfm');
        const data = await response.json();

        if (data.error) {
          setError('load_error');
          return;
        }

        setAlbums(data.albums ?? []);
        setError(null);
      } catch (err) {
        console.error('Error loading Last.fm albums:', err);
        setError('load_error');
      } finally {
        setLoading(false);
      }
    };

    fetchTopAlbums();
    // Refresh every 5 minutes — top albums change slowly but still reflect recent plays
    const interval = setInterval(fetchTopAlbums, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4 animate-pulse">
          <div className="w-5 h-5 bg-slate-700 rounded-full" />
          <div className="h-4 bg-slate-700 rounded w-32" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="w-full aspect-square bg-slate-700 rounded-md" />
              <div className="h-3 bg-slate-700 rounded w-full" />
              <div className="h-3 bg-slate-700 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-900/20 border border-red-700/50 rounded-lg">
        <p className="text-red-400 text-sm">
          {language === 'pt'
            ? 'Erro ao carregar dados do Last.fm'
            : 'Error loading Last.fm data'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-green-500"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.26.3-3.239-1.98-8.159-2.58-12.061-1.419-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.361 9.504 15.021 10.189 18.591 12.3c.41.24.479.86.301 1.38zm.12-3.36C15.149 9.29 8.659 8.968 5.028 10.387c-.529.205-1.083-.158-1.288-.703-.205-.547.158-1.083.703-1.288 4.248-1.612 11.285-1.261 15.738 1.528.539.341.922 1.08.579 1.621-.342.538-1.080.922-1.621.579z" />
        </svg>
        <h3 className="text-sm font-bold text-white">{t.spotify.title}</h3>
      </div>

      {albums.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-400 text-xs">{t.spotify.noSongs}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {albums.map((album, index) => (
            <a
              key={`${album.name}-${index}`}
              href={album.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative overflow-hidden rounded-md mb-2 aspect-square bg-slate-700">
                {album.imageUrl ? (
                  <img
                    src={album.imageUrl}
                    alt={album.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                  <span className="text-white text-[0.6rem] font-medium">#{index + 1}</span>
                </div>
              </div>

              <div className="space-y-0.5">
                <p className="text-white font-semibold text-xs line-clamp-1 group-hover:text-red-400 transition-colors">
                  {album.name}
                </p>
                <p className="text-gray-400 text-xs line-clamp-1">{album.artist}</p>
                <p className="text-gray-500 text-[0.6rem]">
                  {album.playcount.toLocaleString()} plays
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

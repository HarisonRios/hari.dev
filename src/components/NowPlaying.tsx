'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SpotifyNow {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: {
    start: number;
    end: number;
  };
}

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export const NowPlaying = () => {
  const [spotify, setSpotify] = useState<SpotifyNow | null>(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const lanyardUserId = process.env.NEXT_PUBLIC_LANYARD_USER_ID;
        const lanyardApi = process.env.NEXT_PUBLIC_LANYARD_API;

        if (!lanyardUserId || !lanyardApi) {
          throw new Error('Environment variables not configured');
        }

        const response = await axios.get(
          `${lanyardApi}${lanyardUserId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const lanyardData = response.data.data;

        if (lanyardData?.spotify) {
          setSpotify({
            song: lanyardData.spotify.song,
            artist: lanyardData.spotify.artist,
            album: lanyardData.spotify.album,
            album_art_url: lanyardData.spotify.album_art_url,
            timestamps: {
              start: lanyardData.spotify.timestamps.start,
              end: lanyardData.spotify.timestamps.end,
            },
          });
        } else {
          setSpotify(null);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching Spotify data:', err);
        setLoading(false);
      }
    };

    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 5000);

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
            <div className="space-y-1 mt-2">
              <div className="h-1 bg-slate-700 rounded-full" />
              <div className="flex justify-between">
                <div className="h-3 bg-slate-700 rounded w-8" />
                <div className="h-3 bg-slate-700 rounded w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!spotify) {
    return (
      <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.26.3-3.239-1.98-8.159-2.58-12.061-1.419-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.361 9.504 15.021 10.189 18.591 12.3c.41.24.479.86.301 1.38zm.12-3.36C15.149 9.29 8.659 8.968 5.028 10.387c-.529.205-1.083-.158-1.288-.703-.205-.547.158-1.083.703-1.288 4.248-1.612 11.285-1.261 15.738 1.528.539.341.922 1.08.579 1.621-.342.538-1.080.922-1.621.579z" />
          </svg>
          <h3 className="text-sm font-bold text-white">Now Playing</h3>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-4 py-6">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 bg-linear-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-lg animate-pulse"></div>
            <svg className="w-10 h-10 text-gray-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 9v6m0-6L2 5m4 4l4-4m8 0v6m0-6l4-4m-4 4l-4-4m8 16H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 text-sm font-medium">Enjoying the silence?</p>
            <p className="text-gray-500 text-xs mt-1">Play something on Spotify to see it here</p>
          </div>
        </div>
      </div>
    );
  }

  const duration = spotify.timestamps.end - spotify.timestamps.start;
  const progress = Math.min(now - spotify.timestamps.start, duration);
  const percentage = Math.min((progress / duration) * 100, 100);

  return (
    <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-green-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.26.3-3.239-1.98-8.159-2.58-12.061-1.419-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.361 9.504 15.021 10.189 18.591 12.3c.41.24.479.86.301 1.38zm.12-3.36C15.149 9.29 8.659 8.968 5.028 10.387c-.529.205-1.083-.158-1.288-.703-.205-.547.158-1.083.703-1.288 4.248-1.612 11.285-1.261 15.738 1.528.539.341.922 1.08.579 1.621-.342.538-1.080.922-1.621.579z" />
        </svg>
        <h3 className="text-sm font-bold text-white">Now Playing</h3>
      </div>

      <div className="flex gap-3">
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
          <img
            src={spotify.album_art_url}
            alt={spotify.album}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-white font-semibold text-xs line-clamp-1">
              {spotify.song}
            </p>
            <p className="text-gray-400 text-xs line-clamp-1">
              {spotify.artist}
            </p>
          </div>

          <div className="space-y-1">
            <div className="bg-slate-700/50 rounded-full h-1 overflow-hidden">
              <div
                className="bg-linear-to-r from-purple-400 to-pink-500 h-full transition-all duration-100"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Album {
  name: string;
  artist: string;
  album: string;
  image_url: string;
  timestamp: number;
}

export const SpotifyCard: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          const currentAlbum: Album = {
            name: lanyardData.spotify.song,
            artist: lanyardData.spotify.artist,
            album: lanyardData.spotify.album,
            image_url: lanyardData.spotify.album_art_url,
            timestamp: Date.now(),
          };

          const storedAlbums = JSON.parse(
            localStorage.getItem('spotify_albums') || '[]'
          ) as Album[];

          const lastAlbum = storedAlbums[0];
          const isNewAlbum =
            !lastAlbum || lastAlbum.album !== currentAlbum.album;

          if (isNewAlbum) {
            const updated = [currentAlbum, ...storedAlbums].slice(0, 6);
            localStorage.setItem('spotify_albums', JSON.stringify(updated));
            setAlbums(updated);
          } else {
            setAlbums(storedAlbums.slice(0, 6));
          }
        } else {
          const storedAlbums = JSON.parse(
            localStorage.getItem('spotify_albums') || '[]'
          ) as Album[];
          setAlbums(storedAlbums);
        }

        setError(null);
      } catch (err) {
        console.error('Error loading Spotify data:', err);
        const storedAlbums = JSON.parse(
          localStorage.getItem('spotify_albums') || '[]'
        ) as Album[];
        if (storedAlbums.length > 0) {
          setAlbums(storedAlbums);
          setError(null);
        } else {
          setError('Error loading Spotify data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4 animate-pulse">
          <div className="w-5 h-5 bg-slate-700 rounded-full" />
          <div className="h-4 bg-slate-700 rounded w-24" />
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
        <p className="text-red-400 text-sm">{error}</p>
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
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.26.3-3.239-1.98-8.159-2.58-12.061-1.419-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.361 9.504 15.021 10.189 18.591 12.3c.41.24.479.86.301 1.38zm.12-3.36C15.149 9.29 8.659 8.968 5.028 10.387c-.529.205-1.083-.158-1.288-.703-.205-.547.158-1.083.703-1.288 4.248-1.612 11.285-1.261 15.738 1.528.539.341.922 1.08.579 1.621-.342.538-1.080.922-1.621.579z" />
        </svg>
        <h3 className="text-sm font-bold text-white">Last songs</h3>
      </div>

      {albums.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-400 text-xs">No songs found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {albums.slice(0, 6).map((album, index) => (
            <div key={`${album.album}-${index}`} className="group">
              <div className="relative overflow-hidden rounded-md mb-2 aspect-square">
                {album.image_url && (
                  <img
                    src={album.image_url}
                    alt={album.album}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>

              <div className="space-y-0.5">
                <p className="text-white font-semibold text-xs line-clamp-1 group-hover:text-green-400 transition-colors">
                  {album.name}
                </p>
                <p className="text-gray-400 text-xs line-clamp-1">
                  {album.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

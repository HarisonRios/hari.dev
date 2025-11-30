'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface VSCOPhoto {
  id: string;
  imageUrl: string;
  link: string;
}

export const VSCOGallery = () => {
  const [photos, setPhotos] = useState<VSCOPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchVSCOPhotos = async () => {
      try {
        const response = await fetch('/api/vsco');
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        
        if (data.photos && Array.isArray(data.photos)) {
          setPhotos(data.photos);
        }
      } catch (err) {
        console.error('Error fetching VSCO photos:', err);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVSCOPhotos();
  }, []);

  useEffect(() => {
    if (photos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [photos.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  if (loading) {
    return (
      <div className="w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">My Photography</h2>
        <div className="aspect-square md:aspect-auto md:h-96 bg-slate-700 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">My Photography</h2>
        <a
          href="https://vsco.co/harisonrios"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2"
        >
          View more <ExternalLink size={16} />
        </a>
      </div>

      {photos.length === 0 ? (
        <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-8 text-center">
          <p className="text-gray-400 mb-4">Gallery setup needed</p>
          <p className="text-gray-500 text-sm mb-4">Add NEXT_PUBLIC_VSCO_PHOTOS to .env</p>
          <a
            href="https://vsco.co/harisonrios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-purple-400 hover:text-purple-300 transition-colors"
          >
            Visit my VSCO profile
          </a>
        </div>
      ) : (
        <div className="relative">
          <a
            href={photos[currentIndex].link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="relative aspect-square md:aspect-auto md:h-96 overflow-hidden rounded-lg shadow-xl">
              <img
                src={photos[currentIndex].imageUrl}
                alt="VSCO photo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3C/svg%3E';
                }}
              />
              
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-end p-6">
                <div className="text-white text-sm">
                  <p className="font-semibold">Open on VSCO</p>
                </div>
              </div>
            </div>
          </a>

          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex items-center justify-center gap-2 mt-6">
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-purple-500 w-8'
                    : 'bg-slate-600 hover:bg-slate-500 w-2'
                }`}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-4">
            {currentIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </div>
  );
};

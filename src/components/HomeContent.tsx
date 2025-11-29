'use client';

import NavigationMenuDemo from '@/components/NavigationMenuDemo';
import { Hero } from '@/components/Hero';
import { TechStack } from '@/components/TechStack';
import { SpotifyCard } from '@/components/SpotifyCard';
import { NowPlaying } from '@/components/NowPlaying';
import { WeatherCard } from '@/components/WeatherCard';
import { LanguageToggle } from '@/components/LanguageToggle';

export const HomeContent = () => {
  return (
    <>
      <LanguageToggle />
      
      <div className="fixed top-6 md:top-10 lg:top-16 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-slate-900/90 px-6 md:px-8 py-2 md:py-3 rounded-md shadow-lg ring-1 ring-white/10">
          <NavigationMenuDemo />
        </div>
      </div>
      
      <Hero />
      
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <WeatherCard />
          
          <TechStack />
        </div>

        <NowPlaying />

        <div className="mt-12">
          <SpotifyCard />
        </div>
      </div>
    </>
  );
};

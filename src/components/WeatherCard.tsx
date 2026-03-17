'use client';

import { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface WeatherData {
  temperature: number;
  weatherCode: number;
  city: string;
}

const getWeatherDescription = (code: number, language: 'en' | 'pt') => {
  const dict = {
    en: {
      sunny: 'Sunny',
      partlyCloudy: 'Partly Cloudy',
      cloudy: 'Cloudy',
      foggy: 'Foggy',
      lightRain: 'Light Rain',
      snow: 'Snow',
      heavyRain: 'Heavy Rain',
      heavySnow: 'Heavy Snow',
      unknown: 'Unknown',
    },
    pt: {
      sunny: 'Ensolarado',
      partlyCloudy: 'Parcialmente nublado',
      cloudy: 'Nublado',
      foggy: 'Neblina',
      lightRain: 'Chuva fraca',
      snow: 'Neve',
      heavyRain: 'Chuva forte',
      heavySnow: 'Neve forte',
      unknown: 'Desconhecido',
    },
  } as const;

  const t = dict[language];

  if (code === 0) return t.sunny;
  if (code === 1 || code === 2) return t.partlyCloudy;
  if (code === 3) return t.cloudy;
  if (code === 45 || code === 48) return t.foggy;
  if (code >= 51 && code <= 67) return t.lightRain;
  if (code >= 71 && code <= 77) return t.snow;
  if (code >= 80 && code <= 82) return t.heavyRain;
  if (code >= 85 && code <= 86) return t.heavySnow;

  return t.unknown;
};

const isRainCode = (code: number) => (code >= 51 && code <= 67) || (code >= 80 && code <= 82);
const isCloudCode = (code: number) =>
  code === 1 || code === 2 || code === 3 || code === 45 || code === 48;

export const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-23.5505&longitude=-46.6333&current=temperature_2m,weather_code&timezone=America/Sao_Paulo'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather');
        }

        const data = await response.json();
        const current = data.current;

        setWeather({
          temperature: Math.round(current.temperature_2m),
          weatherCode: current.weather_code,
          city: 'Sao Paulo',
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('fetch_error');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm h-full animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-24 mb-4" />
        <div className="space-y-4">
          <div className="h-4 bg-slate-700 rounded w-32" />
          <div className="flex items-end gap-4">
            <div className="h-20 bg-slate-700 rounded w-24" />
            <div className="w-10 h-10 bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm h-full flex items-center justify-center">
        <div className="text-gray-400 text-sm">
          {language === 'pt' ? 'Nao foi possivel carregar o clima' : 'Unable to fetch weather'}
        </div>
      </div>
    );
  }

  const weatherDescription = getWeatherDescription(weather.weatherCode, language);

  return (
    <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 backdrop-blur-sm h-full flex flex-col justify-between">
      <div>
        <p className="text-gray-400 text-xs mb-2">{weather.city}</p>
        <p className="text-gray-300 text-xs">{weatherDescription}</p>
      </div>

      <div className="flex items-end gap-4">
        <div>
          <div className="text-9xl font-bold text-white leading-none">{weather.temperature}°</div>
          <p className="text-lg text-gray-400 mt-2">°C</p>
        </div>

        <div className="text-5xl mb-4 ml-auto">
          {isRainCode(weather.weatherCode) ? (
            <CloudRain className="text-purple-400" />
          ) : isCloudCode(weather.weatherCode) ? (
            <Cloud className="text-gray-400" />
          ) : (
            <Sun className="text-yellow-400" />
          )}
        </div>
      </div>
    </div>
  );
};

'use client';

import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun } from 'lucide-react';

interface WeatherData {
  temperature: number;
  description: string;
  city: string;
}

export const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-23.5505&longitude=-46.6333&current=temperature_2m,weather_code&timezone=America/Sao_Paulo'
        );
        
        if (!response.ok) throw new Error('Failed to fetch weather');
        
        const data = await response.json();
        const current = data.current;
        
        setWeather({
          temperature: Math.round(current.temperature_2m),
          description: getWeatherDescription(current.weather_code),
          city: 'São Paulo',
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Unable to fetch weather');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getWeatherDescription = (code: number): string => {
    if (code === 0) return 'Ensolarado';
    if (code === 1 || code === 2) return 'Parcialmente nublado';
    if (code === 3) return 'Nublado';
    if (code === 45 || code === 48) return 'Névoa';
    if (code >= 51 && code <= 67) return 'Chuva leve';
    if (code >= 71 && code <= 77) return 'Neve';
    if (code >= 80 && code <= 82) return 'Chuva forte';
    if (code >= 85 && code <= 86) return 'Neve forte';
    return 'Desconhecido';
  };

  if (loading) {
    return (
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm h-full flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Carregando...</div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm h-full flex items-center justify-center">
        <div className="text-gray-400 text-sm">{error || 'Dados indisponíveis'}</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm h-full flex flex-col justify-between">
      <div>
        <p className="text-gray-400 text-xs mb-2">{weather.city}</p>
        <p className="text-gray-300 text-xs">{weather.description}</p>
      </div>
      
      <div className="flex items-end gap-4">
        <div>
          <div className="text-7xl font-bold text-white leading-none">
            {weather.temperature}°
          </div>
          <p className="text-gray-400 text-xs mt-2">Celsius</p>
        </div>
        
        <div className="text-4xl mb-2">
          {weather.description.includes('Chuva') ? (
            <CloudRain className="text-purple-400" />
          ) : weather.description.includes('nublado') ? (
            <Cloud className="text-gray-400" />
          ) : (
            <Sun className="text-yellow-400" />
          )}
        </div>
      </div>
    </div>
  );
};

"use client";

import { useEffect, useState } from "react";
import { WiDaySunny, WiCloudy, WiNightClear, WiSunrise } from "react-icons/wi";
import { MdLocationOff } from "react-icons/md";
import { TemperatureProps } from "../../hooks/types";
import "./temperature.scss";

export default function Temperature({ locationData }: TemperatureProps) {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [localTime, setLocalTime] = useState<string | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<string>("day");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [timezone, setTimezone] = useState<string>(
    process.env.NEXT_PUBLIC_DEFAULT_TIMEZONE || "America/Sao_Paulo"
  );

  useEffect(() => {
    async function fetchWeather() {
      if (!locationData.location) {
        setError("Localização não disponível");
        setLoading(false);
        return;
      }

      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            locationData.location
          )}&count=1&language=pt&format=json`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
          setError("Localização não encontrada");
          setLoading(false);
          return;
        }

        const { latitude, longitude, timezone } = geoData.results[0];
        setTimezone(timezone);

        
        const baseUrl = process.env.NEXT_PUBLIC_WEATHER_API || "https://api.open-meteo.com";

        const weatherRes = await fetch(
          `${baseUrl}/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=${timezone}`
        );
        const weatherData = await weatherRes.json();

        const temp = weatherData.current_weather.temperature;
        const time = weatherData.current_weather.time;
        const date = new Date(time);
        const hour = date.getHours();

        setTemperature(temp);

        if (hour >= 5 && hour < 12) setTimeOfDay("morning");
        else if (hour >= 12 && hour < 18) setTimeOfDay("afternoon");
        else if (hour >= 18 && hour < 22) setTimeOfDay("evening");
        else setTimeOfDay("night");
      } catch (err) {
        setError("Erro ao buscar temperatura");
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [locationData]);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString("pt-BR", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        setLocalTime(formattedTime);
      } catch (e) {
        setLocalTime("Erro no horário");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  if (loading) {
    return (
      <div className="temperature-card loading">
        <div className="loading-content">
          <div className="weather-spinner">
            <WiDaySunny className="spin-icon" />
          </div>
          <p className="loading-text">Buscando clima...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="temperature-card error">
        <div className="error-content">
          <MdLocationOff className="error-icon" />
          <h3 className="error-title">Localização Indisponível</h3>
          <p className="error-message">
            Permita o acesso à sua localização para ver o clima local
          </p>
        </div>
      </div>
    );
  }

  const getWeatherIcon = () => {
    switch (timeOfDay) {
      case "morning":
        return <WiSunrise />;
      case "afternoon":
        return <WiDaySunny />;
      case "evening":
        return <WiCloudy />;
      case "night":
        return <WiNightClear />;
      default:
        return <WiDaySunny />;
    }
  };

  return (
    <div className={`temperature-card ${timeOfDay}`}>
      <div className="weather-icon">{getWeatherIcon()}</div>
      <div className="temperature">{temperature?.toFixed(1)}°C</div>

      <div className="center-info">
        <div className="location">{locationData.location}</div>
        <div className="local-time">{localTime}</div>
      </div>
    </div>
  );
}

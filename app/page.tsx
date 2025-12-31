"use client";

import { useState, useEffect, useRef } from "react";
import SearchBox from "@/components/SearchBox";
import CurrentWeather from "@/components/current-weather";
import ForecastCards from "@/components/forecast-cards";
import AIGuideSection from "@/components/ai-guide-section";
import TwentyFourHourChart from "@/components/twenty-four-hour-chart";
import WeatherPersonalityCard from "@/components/weather-personality-card";
import Image from "next/image";

const WEATHER_CACHE_KEY = "climocast_last_weather";

// ⭐ Emoji converter
function getEmoji(desc: string) {
  const d = desc.toLowerCase();

  if (d.includes("clear")) return "☀️";
  if (d.includes("few clouds")) return "🌤️";
  if (d.includes("scattered clouds")) return "⛅";
  if (d.includes("broken clouds")) return "🌥️";
  if (d.includes("overcast") || d.includes("cloud")) return "☁️";

  if (d.includes("light rain")) return "🌦️";
  if (d.includes("moderate rain") || d.includes("heavy rain") || d.includes("rain")) return "🌧️";

  if (d.includes("thunder")) return "⛈️";

  if (d.includes("light snow")) return "🌨️";
  if (d.includes("snow")) return "❄️";

  if (d.includes("fog") || d.includes("mist") || d.includes("haze")) return "🌫️";

  return "🌡️";
}

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<any>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(WEATHER_CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState("New York");
  const [suggestions, setSuggestions] = useState<string[] | null>(null);

  const isInitialLoad = useRef(true);

  async function fetchWeather(city: string) {
    try {
      if (!isInitialLoad.current) {
        setLoading(true);
      }

      setSuggestions(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/weather?city=${encodeURIComponent(city)}`
      );

      const data = await res.json();

      if (data.error === "city_not_found") {
        setWeatherData(null);
        setSuggestions(data.suggestions);
        setLoading(false);
        isInitialLoad.current = false;
        return;
      }

      const fixedForecast = data.forecast.map((f: any) => ({
        day: f.day,
        temp: f.temp,
        desc: f.description,
        emoji: getEmoji(f.description),
      }));

      const finalData = { ...data, forecast: fixedForecast };

      setWeatherData(finalData);
      localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(finalData));

      setCurrentCity(city);
      setLoading(false);
      isInitialLoad.current = false;
    } catch (err) {
      console.error("Weather API failed:", err);
      setLoading(false);
      isInitialLoad.current = false;
    }
  }

  useEffect(() => {
    fetchWeather(currentCity);
  }, []);

  const hourlyData =
    weatherData?.hourly
      ?.slice()
      .sort((a: any, b: any) => {
        const t1 = parseInt(a.time.replace(":", ""));
        const t2 = parseInt(b.time.replace(":", ""));
        return t1 - t2;
      }) || [];

  const guideForUI = weatherData
    ? {
        summary: weatherData.ai_guide.summary,
        safety: weatherData.ai_guide.safety,
        insight: weatherData.ai_guide.insight,
      }
    : null;

  const getBackgroundImage = () => {
    if (!weatherData) return "/images/default.jpg";

    const desc = weatherData.description.toLowerCase();

    if (desc.includes("clear")) return "/images/clear.jpg";
    if (desc.includes("few clouds")) return "/images/few_clouds.jpg";
    if (desc.includes("scattered clouds")) return "/images/scattered_clouds.jpg";
    if (desc.includes("broken clouds")) return "/images/broken_clouds.jpg";
    if (desc.includes("overcast")) return "/images/overcast.jpg";

    if (desc.includes("freezing rain")) return "/images/freezing_rain.jpg";
    if (desc.includes("light rain")) return "/images/light_rain.jpg";
    if (desc.includes("moderate rain")) return "/images/moderate_rain.jpg";
    if (desc.includes("heavy rain")) return "/images/heavy_rain.jpg";
    if (desc.includes("rain")) return "/images/rainy.jpg";

    if (desc.includes("drizzle")) return "/images/drizzle.jpg";
    if (desc.includes("thunderstorm")) return "/images/thunderstorm.jpg";

    if (desc.includes("light snow")) return "/images/light_snow.jpg";
    if (desc.includes("heavy snow")) return "/images/heavy_snow.jpg";
    if (desc.includes("snow")) return "/images/snow.jpg";

    if (
      desc.includes("fog") ||
      desc.includes("mist") ||
      desc.includes("haze") ||
      desc.includes("smoke") ||
      desc.includes("dust") ||
      desc.includes("sand")
    )
      return "/images/fog.jpg";

    if (desc.includes("tornado") || desc.includes("squall"))
      return "/images/extreme.jpg";

    return "/images/default.jpg";
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000 p-6"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/climocast-icon.png"
            width={50}
            height={50}
            alt="Climocast Logo"
            className="rounded-xl"
          />
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Climocast
          </h1>
        </div>

        <SearchBox onSearch={fetchWeather} />
      </div>

      {suggestions && (
        <div className="max-w-7xl mx-auto text-white mb-6">
          <p className="text-lg mb-2">Did you mean:</p>
          <div className="flex gap-3 flex-wrap">
            {suggestions.map((city) => (
              <button
                key={city}
                onClick={() => fetchWeather(city)}
                className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur hover:bg-white/30"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className="max-w-7xl mx-auto animate-pulse space-y-6">
          <div className="h-64 bg-white/20 rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-40 bg-white/20 rounded-2xl" />
            <div className="h-40 bg-white/20 rounded-2xl" />
            <div className="h-40 bg-white/20 rounded-2xl" />
          </div>
        </div>
      ) : weatherData ? (
        <>
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <CurrentWeather data={weatherData} />
              </div>

              <div className="lg:col-span-2 flex flex-col gap-8">
                <ForecastCards forecast={weatherData.forecast} />

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="h-72">
                    <TwentyFourHourChart data={hourlyData} />
                  </div>
                </div>

                <WeatherPersonalityCard
                  city={currentCity}
                  temp={weatherData.temp}
                  category={weatherData.description}
                  wind={weatherData.wind_speed}
                  humidity={weatherData.humidity}
                  aqi={weatherData.air_quality?.aqi ?? null}
                  aqi_label={weatherData.air_quality?.label ?? null}
                />
              </div>
            </div>

            {guideForUI && <AIGuideSection guide={guideForUI} />}
          </div>
        </>
      ) : (
        <div className="max-w-7xl mx-auto animate-pulse space-y-6">
          <div className="h-64 bg-white/20 rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-40 bg-white/20 rounded-2xl" />
            <div className="h-40 bg-white/20 rounded-2xl" />
            <div className="h-40 bg-white/20 rounded-2xl" />
          </div>
        </div>
      )}
    </main>
  );
}

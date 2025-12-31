"use client";

import { useState, useEffect, useRef } from "react";
import SearchBox from "@/components/SearchBox";
import CurrentWeather from "@/components/current-weather";
import ForecastCards from "@/components/forecast-cards";
import AIGuideSection from "@/components/ai-guide-section";
import TwentyFourHourChart from "@/components/twenty-four-hour-chart";
import WeatherPersonalityCard from "@/components/weather-personality-card";
import Image from "next/image";

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState("New York");
  const isInitialLoad = useRef(true);

  async function fetchWeather(city: string) {
    try {
      if (!isInitialLoad.current) setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/weather?city=${encodeURIComponent(city)}`
      );
      const data = await res.json();

      setWeatherData(data);
      setCurrentCity(city);
      setLoading(false);
      isInitialLoad.current = false;
    } catch (e) {
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

  // ⭐ ONLY CHANGE STARTS HERE
  const getNearest3Hour = () => {
    if (!weatherData?.hourly) return null;

    const now = new Date();
    const hourNow = now.getHours();

    return weatherData.hourly.reduce((closest: any, item: any) => {
      const h = parseInt(item.time.split(":")[0]);
      const c = parseInt(closest.time.split(":")[0]);
      return Math.abs(h - hourNow) < Math.abs(c - hourNow) ? item : closest;
    });
  };

  const nearestHourly = getNearest3Hour();
  // ⭐ ONLY CHANGE ENDS HERE

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/climocast-icon.png"
            width={50}
            height={50}
            alt="Climocast Logo"
            className="rounded-xl"
          />
          <h1 className="text-4xl font-bold text-white">Climocast</h1>
        </div>

        <SearchBox onSearch={fetchWeather} />
      </div>

      {loading ? (
        <div className="text-white">Loading...</div>
      ) : weatherData ? (
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ⭐ ONLY CHANGE IS IN THE DATA PASSED BELOW */}
            <CurrentWeather
              data={{
                ...weatherData,
                temp: nearestHourly?.temp ?? weatherData.temp,
                feels_like: nearestHourly?.temp ?? weatherData.feels_like,
                local_time: nearestHourly?.time
                  ? new Date(
                      weatherData.local_time.replace(
                        /\d{2}:\d{2}/,
                        nearestHourly.time
                      )
                    ).toISOString()
                  : weatherData.local_time,
              }}
            />

            <div className="lg:col-span-2 flex flex-col gap-8">
              <ForecastCards forecast={weatherData.forecast} />

              <div className="h-72">
                <TwentyFourHourChart data={hourlyData} />
              </div>

              <WeatherPersonalityCard
                city={currentCity}
                temp={nearestHourly?.temp ?? weatherData.temp}
                category={weatherData.description}
                wind={weatherData.wind_speed}
                humidity={weatherData.humidity}
                aqi={weatherData.air_quality?.aqi ?? null}
                aqi_label={weatherData.air_quality?.label ?? null}
              />
            </div>
          </div>

          {weatherData.ai_guide && (
            <AIGuideSection guide={weatherData.ai_guide} />
          )}
        </div>
      ) : null}
    </main>
  );
}

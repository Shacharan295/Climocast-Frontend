"use client"

import { useState, useEffect } from "react"
import { getWeather, type WeatherData } from "@/utils/getWeather"

import SearchBar from "@/components/search-bar"
import CurrentWeather from "@/components/current-weather"
import ForecastCards from "@/components/forecast-cards"
import AIGuideSection from "@/components/ai-guide-section"
import TwentyFourHourChart from "@/components/twenty-four-hour-chart"
import WeatherPersonalityCard from "@/components/weather-personality-card"

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentCity, setCurrentCity] = useState("New York")

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      const data = await getWeather(currentCity)
      if (data) setWeatherData(data)
      setLoading(false)
    }

    fetchWeather()
  }, [currentCity])

  // Background selection
  const getBackgroundImage = () => {
    if (!weatherData) return "/images/sunny.jpg"
    const desc = weatherData.description.toLowerCase()

    if (desc.includes("sun") || desc.includes("clear")) return "/images/sunny.jpg"
    if (desc.includes("cloud")) return "/images/cloudy.jpg"
    if (desc.includes("rain")) return "/images/rainy.jpg"
    if (desc.includes("storm") || desc.includes("thunder")) return "/images/storm.jpg"
    if (desc.includes("snow")) return "/images/snow.jpg"
    if (desc.includes("fog") || desc.includes("mist") || desc.includes("haze"))
      return "/images/partly_cloudy.jpg"

    return "/images/sunny.jpg"
  }

  // Temporary 24-hour temperature generator
  const generate24HourData = () => {
    const list = []
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, "0") + ":00"
      const temp = Math.floor(15 + Math.sin(i / 4) * 8 + Math.random() * 3)
      list.push({ time: hour, temp })
    }
    return list
  }

  const hourlyData = generate24HourData()

  const guideForUI = weatherData
    ? {
        summary: weatherData.ai_guide.summary,
        safety: weatherData.ai_guide.safety,
        insight: weatherData.ai_guide.insight,
      }
    : null

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000 p-6"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-6">🌍 Climocast</h1>
        <SearchBar onSearch={setCurrentCity} />
      </div>

      {/* LOADING */}
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
        <div className="max-w-7xl mx-auto space-y-10">

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT COLUMN */}
            <div>
              <CurrentWeather data={weatherData} />
            </div>

            {/* RIGHT COLUMN (FIXED SPACING, NO OVERLAP) */}
            <div className="lg:col-span-2 flex flex-col gap-8">

              {/* FORECAST ROW */}
              <div className="w-full">
                <ForecastCards forecast={weatherData.forecast} />
              </div>

              {/* 24-HOUR TEMP CHART */}
              <div className="w-full">
                <TwentyFourHourChart data={hourlyData} />
              </div>

              {/* PERSONALITY CARD */}
              <div className="w-full">
                <WeatherPersonalityCard
                  city={currentCity}
                  temp={weatherData.temp}
                  category={weatherData.description}
                  wind={weatherData.wind_speed}
                  humidity={weatherData.humidity}
                />
              </div>

            </div>
          </div>

          {/* AI GUIDE (FULL WIDTH) */}
          {guideForUI && <AIGuideSection guide={guideForUI} />}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto text-white text-center text-xl">
          Could not load weather data.
        </div>
      )}
    </main>
  )
}

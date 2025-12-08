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

  // 🌈 BACKGROUND IMAGE PICKER
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

  // 24-HOUR CHART DATA (TEMPORARY RANDOM GENERATOR)
  const generate24HourData = () => {
    const result = []
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, "0") + ":00"
      const temp = Math.floor(15 + Math.sin(i / 4) * 8 + Math.random() * 3)
      result.push({ time: hour, temp })
    }
    return result
  }

  const hourlyData = generate24HourData()

  const guideForUI = weatherData
    ? {
        morning: weatherData.ai_guide.morning,
        afternoon: weatherData.ai_guide.afternoon,
        evening: weatherData.ai_guide.evening,
        safety: weatherData.ai_guide.safety,
        activity: weatherData.ai_guide.activity,
        summary: weatherData.ai_guide.summary,
        clothing: weatherData.ai_guide.clothing,
      }
    : null

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000 p-6"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-6">
          🌍 AI Weather System
        </h1>

        <SearchBar onSearch={setCurrentCity} />
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-black/20 rounded-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-40 bg-black/20 rounded-2xl" />
              <div className="h-40 bg-black/20 rounded-2xl" />
              <div className="h-40 bg-black/20 rounded-2xl" />
            </div>
          </div>
        </div>
      ) : weatherData ? (
        <div className="max-w-7xl mx-auto space-y-10">

          {/* MAIN CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT SIDE — CURRENT WEATHER */}
            <CurrentWeather data={weatherData} />

            {/* RIGHT SIDE — FORECAST + CHART + PERSONALITY */}
            <div className="flex flex-col gap-6">

              {/* Forecast */}
              <ForecastCards forecast={weatherData.forecast} />

              {/* 24-Hour Chart */}
              <TwentyFourHourChart data={hourlyData} />

              {/* Personality Card */}
              <WeatherPersonalityCard
                city={currentCity}
                temp={weatherData.temp}
                category={weatherData.description}
                wind={weatherData.wind_speed}
                humidity={weatherData.humidity}
              />
            </div>
          </div>

          {/* AI GUIDE SECTION */}
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

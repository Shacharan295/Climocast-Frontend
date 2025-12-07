"use client"

import { useState, useEffect } from "react"
import { getWeather, type WeatherData } from "@/utils/getWeather"
import SearchBar from "@/components/search-bar"
import CurrentWeather from "@/components/current-weather"
import ForecastCards from "@/components/forecast-cards"
import AIGuideSection from "@/components/ai-guide-section"

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentCity, setCurrentCity] = useState("New York") // default city

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      const data = await getWeather(currentCity)

      if (data) {
        setWeatherData(data)
      } else {
        setWeatherData(null)
      }

      setLoading(false)
    }

    fetchWeather()
  }, [currentCity])

  // 🌈 DYNAMIC BACKGROUND IMAGE LOGIC
  const getBackgroundImage = () => {
    if (!weatherData) return "/images/sunny.jpg"

    const desc = weatherData.description.toLowerCase()

    if (desc.includes("sun") || desc.includes("clear"))
      return "/images/sunny.jpg"

    if (desc.includes("cloud"))
      return "/images/cloudy.jpg"

    if (desc.includes("rain"))
      return "/images/rainy.jpg"

    if (desc.includes("storm") || desc.includes("thunder"))
      return "/images/storm.jpg"

    if (desc.includes("snow"))
      return "/images/snow.jpg"

    if (desc.includes("fog") || desc.includes("mist") || desc.includes("haze"))
      return "/images/fog.jpg"

    return "/images/sunny.jpg"
  }

  // AI Guide mapping
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
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-[1200ms] p-6"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
      }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
          🌍 AI Weather System
        </h1>

        <SearchBar onSearch={setCurrentCity} />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-white/20 rounded-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-40 bg-white/20 rounded-2xl" />
              <div className="h-40 bg-white/20 rounded-2xl" />
              <div className="h-40 bg-white/20 rounded-2xl" />
            </div>
          </div>
        </div>
      ) : weatherData ? (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Weather */}
            <div className="lg:col-span-1">
              <CurrentWeather data={weatherData} />
            </div>

            {/* Forecast Cards */}
            <div className="lg:col-span-2">
              <ForecastCards forecast={weatherData.forecast} />
            </div>
          </div>

          {/* AI Weather Guide */}
          {guideForUI && <AIGuideSection guide={guideForUI} />}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto text-center text-white">
          <p className="text-xl">
            Unable to fetch weather data. Please try again.
          </p>
        </div>
      )}
    </main>
  )
}

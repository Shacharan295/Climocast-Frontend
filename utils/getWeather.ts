// Mock weather data for demonstration
const mockWeatherData: Record<string, any> = {
  "new york": {
    city: "New York",
    country: "USA",
    temp: 42,
    feels_like: 38,
    description: "Cloudy",
    humidity: 65,
    wind_speed: 12,
    pressure: 1013,
    wind_mood: "Gentle breeze",
    local_time: "3:45 PM",
    forecast: [
      { day: "Tomorrow", temp: 44, desc: "Partly Cloudy", emoji: "⛅" },
      { day: "Wednesday", temp: 48, desc: "Sunny", emoji: "☀️" },
      { day: "Thursday", temp: 40, desc: "Rainy", emoji: "🌧️" },
    ],
    ai_guide: {
      morning: "Perfect morning for a jog! The temperature is cool and refreshing.",
      afternoon: "Great day for outdoor activities. Remember to wear sunscreen!",
      evening: "Cozy evening ahead. Light jacket recommended for walks.",
      safety: "Wind gusts up to 15 mph. Secure any loose outdoor items.",
      activity: "Ideal conditions for hiking, cycling, or outdoor sports.",
    },
  },
  // … your other mock cities
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://weather-backend-e8cz.onrender.com"

// Convert backend description → emoji
function getEmoji(desc: string) {
  const d = desc.toLowerCase()
  if (d.includes("sun") || d.includes("clear")) return "☀️"
  if (d.includes("cloud")) return "☁️"
  if (d.includes("rain")) return "🌧️"
  if (d.includes("storm")) return "⛈️"
  if (d.includes("snow")) return "❄️"
  if (d.includes("fog") || d.includes("mist") || d.includes("haze")) return "🌫️"
  return "🌡️"
}

export async function getWeather(city: string) {
  try {
    const normalizedCity = city.toLowerCase()

    // ⭐ 1 — TRY REAL BACKEND FIRST
    const backendRes = await fetch(
      `${BACKEND_URL}/weather?city=${encodeURIComponent(city)}`
    )

    if (backendRes.ok) {
      const data = await backendRes.json()

      // ⭐ Map backend → your expected frontend structure
      return {
        city: data.city,
        country: data.country,
        temp: data.temp,
        feels_like: data.feels_like,
        description: data.description,
        humidity: data.humidity,
        wind_speed: data.wind_speed,
        pressure: data.pressure,
        wind_mood: data.wind_mood,
        local_time: data.local_time,

        forecast: (data.forecast || []).map((f: any) => ({
          day: f.day,
          temp: f.temp,
          desc: f.description, // your UI expects "desc"
          emoji: getEmoji(f.description),
        })),

        ai_guide: {
          morning: data.ai_guide.morning,
          afternoon: data.ai_guide.afternoon,
          evening: data.ai_guide.evening,
          safety: data.ai_guide.safety,
          activity: data.ai_guide.activities, // BACKEND: activities → your UI: activity
        },
      }
    }

    // ⭐ 2 — If backend fails, check mock data
    if (normalizedCity in mockWeatherData) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockWeatherData[normalizedCity]
    }

    // ⭐ 3 — Fallback generic (your original code)
    const genericData = {
      city: city,
      country: "Unknown",
      temp: Math.floor(Math.random() * 30 + 40),
      feels_like: Math.floor(Math.random() * 30 + 38),
      description: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
      humidity: Math.floor(Math.random() * 40 + 40),
      wind_speed: Math.floor(Math.random() * 20 + 5),
      pressure: Math.floor(Math.random() * 20 + 1005),
      wind_mood: "Variable",
      local_time: new Date().toLocaleTimeString(),
      forecast: [
        { day: "Tomorrow", temp: Math.floor(Math.random() * 30 + 40), desc: "Partly Cloudy", emoji: "⛅" },
        { day: "Wednesday", temp: Math.floor(Math.random() * 30 + 40), desc: "Sunny", emoji: "☀️" },
        { day: "Thursday", temp: Math.floor(Math.random() * 30 + 40), desc: "Cloudy", emoji: "☁️" },
      ],
      ai_guide: {
        morning: "Good morning! Have a productive day ahead.",
        afternoon: "Afternoon is perfect for outdoor activities.",
        evening: "Evening is ideal for relaxation and reflection.",
        safety: "General weather conditions are normal.",
        activity: "Any outdoor activity should be enjoyable today.",
      },
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
    return genericData
  } catch (error) {
    console.error("[getWeather] Failed:", error)
    return null
  }
}

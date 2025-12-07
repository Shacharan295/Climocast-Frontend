"use client"

interface WeatherDataType {
  city: string
  country: string
  temp: number
  feels_like: number
  description: string
  humidity: number
  wind_speed: number
  pressure: number
  wind_mood: string
  local_time: string
}

interface CurrentWeatherProps {
  data: WeatherDataType
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const getWeatherEmoji = () => {
    const desc = data.description.toLowerCase()
    if (desc.includes("sunny") || desc.includes("clear")) return "☀️"
    if (desc.includes("cloud")) return "☁️"
    if (desc.includes("rain")) return "🌧️"
    if (desc.includes("snow")) return "❄️"
    if (desc.includes("wind")) return "💨"
    if (desc.includes("mist") || desc.includes("fog")) return "🌫️"
    return "🌤️"
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/30 hover:bg-white/15 transition-all duration-300 h-full flex flex-col justify-between">
      <div className="space-y-4">
        <div>
          <h2 className="text-white/60 text-sm uppercase tracking-wide">Location</h2>
          <p className="text-3xl font-bold text-white">{data.city}</p>
          <p className="text-white/70">{data.country}</p>
        </div>

        <div>
          <h2 className="text-white/60 text-sm uppercase tracking-wide">Time</h2>
          <p className="text-white text-lg">{data.local_time}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Large Temperature Display */}
        <div className="text-center py-8">
          <div className="text-7xl mb-4">{getWeatherEmoji()}</div>
          <div className="text-6xl font-bold text-white">{data.temp}°</div>
          <p className="text-white/80 text-lg mt-2">{data.description}</p>
        </div>

        {/* Weather Details */}
        <div className="space-y-3 border-t border-white/20 pt-6">
          <DetailRow label="Feels Like" value={`${data.feels_like}°`} />
          <DetailRow label="Humidity" value={`${data.humidity}%`} />
          <DetailRow label="Wind Speed" value={`${data.wind_speed} km/h`} />
          <DetailRow label="Pressure" value={`${data.pressure} mb`} />
        </div>

        {/* Wind Mood Badge */}
        <div className="mt-4 inline-block bg-white/20 px-4 py-2 rounded-full">
          <p className="text-white text-sm font-medium">{data.wind_mood}</p>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-white/60 text-sm">{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  )
}

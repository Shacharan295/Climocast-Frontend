"use client"

interface ForecastItem {
  day: string
  temp: number
  desc: string
  emoji: string
}

interface ForecastCardsProps {
  forecast: ForecastItem[]
}

export default function ForecastCards({ forecast }: ForecastCardsProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg">
        3-Day Forecast
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 rounded-xl p-4 text-center border border-white/20 
                       hover:bg-white/20 transition-all duration-300"
          >
            {/* DAY */}
            <p className="text-white/80 text-sm font-semibold mb-2">
              {item.day}
            </p>

            {/* ⭐ EMOJI (FIX ADDED HERE) */}
            <div className="text-4xl mb-2">
              {item.emoji}
            </div>

            {/* TEMP */}
            <p className="text-white text-lg font-bold mb-1">
              {item.temp}°
            </p>

            {/* DESCRIPTION */}
            <p className="text-white/70 text-sm leading-tight">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

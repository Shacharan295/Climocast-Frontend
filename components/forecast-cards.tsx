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
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">3-Day Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {forecast.map((day, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-white/80 text-sm font-semibold uppercase mb-3">{day.day}</h3>
              <div className="text-5xl mb-4">{day.emoji}</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-white/70 text-sm">Temp</span>
                <span className="text-3xl font-bold text-white">{day.temp}°</span>
              </div>
              <p className="text-white/80 text-sm">{day.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

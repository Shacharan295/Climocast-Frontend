"use client";

interface WeatherPersonalityCardProps {
  city: string;
  temp: number;
  category: string;
  wind: number;
  humidity: number;
  mood: string;
  aqi?: number;
  aqi_label?: string;
}

export default function WeatherPersonalityCard({
  city,
  temp,
  category,
  wind,
  humidity,
  mood,
  aqi,
  aqi_label,
}: WeatherPersonalityCardProps) {
  return (
    <div className="
      bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20
      p-6 text-white space-y-2 transition-all duration-300
      hover:bg-white/20 hover:translate-y-[-4px]
    ">
      {/* Heading */}
      <h4 className="
        text-white font-bold text-xl tracking-wide mb-3
        bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent
        drop-shadow-lg
      ">
        {city}'s Mood
      </h4>

      {/* Mood Text */}
      <p className="text-sm leading-relaxed text-white/90 italic font-light">
        {mood}
      </p>

      {/* Bottom Stats Row */}
      <div className="pt-2 flex flex-wrap gap-4 text-xs text-white/70 items-center">
        <span>🌡️ {temp}°C</span>
        <span>💨 {wind} km/h</span>
        <span>💧 {humidity}%</span>

        {aqi !== undefined && (
          <span>🌫️ AQI: {aqi} — {aqi_label}</span>
        )}
      </div>
    </div>
  );
}

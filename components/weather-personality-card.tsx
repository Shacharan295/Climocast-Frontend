"use client"

interface WeatherPersonalityCardProps {
  city: string
  temp: number
  category: string
  wind: number
  humidity: number
}

export default function WeatherPersonalityCard({
  city,
  temp,
  category,
  wind,
  humidity,
}: WeatherPersonalityCardProps) {
  const getPersonality = (): string => {
    const cat = category.toLowerCase()

    const isSunny = cat.includes("sunny") || cat.includes("clear")
    const isRainy = cat.includes("rain")
    const isSnowy = cat.includes("snow")
    const isWindy = wind > 20
    const isHumid = humidity > 70
    const isCold = temp < 0
    const isHot = temp > 30

    if (isSunny && isHot)
      return `${city} feels like a bold fire spirit today — bright, confident, and impossible to ignore.`
    if (isSunny)
      return `${city} radiates cheerful energy — clear-minded, luminous, and ready for adventure.`

    if (isRainy && isHumid)
      return `${city} gives soft introvert vibes — calm, thoughtful, wrapped in quiet raindrops and moisture.`
    if (isRainy)
      return `${city} whispers gentle stories — contemplative, peaceful, and washed clean by rainfall.`

    if (isSnowy)
      return `${city} feels dreamy and peaceful, like it's wrapped in a soft winter blanket of silence.`

    if (isWindy && isHot)
      return `${city} has restless, heated energy — full of movement, unpredictable gusts, and wild passion.`
    if (isWindy)
      return `${city} dances with invisible forces — spirited, unpredictable, and full of boundless motion.`

    if (isHumid && isHot)
      return `${city} feels extra clingy and warm, like the air wants a hug and won’t let go.`
    if (isHumid)
      return `${city} clings softly with moisture — intimate, thick with feeling, and wrapped in vapor.`

    if (isCold)
      return `${city} is in a cold but dramatic mood — crisp, sharp, and cinematically crystalline.`

    return `${city} hums with balanced energy — moderate, genuine, and simply being itself today.`
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-white space-y-2 transition-all duration-300 hover:bg-white/20 hover:translate-y-[-4px]">
      <h4 className="text-white font-bold text-xl tracking-wide mb-3 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent drop-shadow-lg">
        {city}'s Mood
      </h4>

      <p className="text-sm leading-relaxed text-white/90 italic font-light">
        {getPersonality()}
      </p>

      <div className="pt-2 flex gap-4 text-xs text-white/70">
        <span>🌡️ {temp}°C</span>
        <span>💨 {wind} km/h</span>
        <span>💧 {humidity}%</span>
      </div>
    </div>
  )
}

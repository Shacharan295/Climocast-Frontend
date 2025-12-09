interface WeatherPersonalityCardProps {
  city: string;
  temp: number;
  category: string;
  wind: number;
  humidity: number;
  aqi?: number | null;
  aqi_label?: string | null;
}

export default function WeatherPersonalityCard({
  city,
  temp,
  category,
  wind,
  humidity,
  aqi = null,
  aqi_label = null,
}: WeatherPersonalityCardProps) {

  const getPersonality = (): string => {
    const City = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

    const cat = category.toLowerCase();
    const isSunny = cat.includes("sun") || cat.includes("clear");
    const isCloudy = cat.includes("cloud");
    const isRainy = cat.includes("rain") || cat.includes("drizzle");
    const isStormy = cat.includes("thunder") || cat.includes("storm");
    const isSnowy = cat.includes("snow");
    const isFoggy = cat.includes("fog") || cat.includes("haze") || cat.includes("mist");
    const isWindy = wind > 20;
    const isHumid = humidity > 70;
    const isCold = temp < 4;
    const isWarm = temp > 20;
    const isHot = temp > 32;

    const sunnyCold = [
      `${City} feels calm and luminous today, the cold air sharpening every detail.`,
      `A quiet winter clarity settles over ${City}, bright skies opening the day.`,
      `${City} carries a serene glow in the cold, sunlight moving gently across the sky.`,
      `A crisp brightness fills ${City}, the chill giving the day a clean stillness.`,
    ];

    const sunnyWarm = [
      `${City} feels open and radiant today, warm light easing the rhythm of the day.`,
      `Golden warmth softens ${City}, the sunlight giving the city a gentle glow.`,
      `${City} carries an uplifting brightness, the warm sky opening softly overhead.`,
      `A pleasant warmth settles around ${City}, the light moving gracefully through the day.`,
    ];

    const sunnyHot = [
      `${City} glows with strong summer light, the air moving in slow shimmering waves.`,
      `A vivid brightness settles over ${City}, the heat giving the day a deep intensity.`,
      `${City} feels vibrant and alive, the warm sun filling every space.`,
    ];

    const cloudy = [
      `${City} carries a thoughtful calm today, the sky wrapped in soft drifting grey.`,
      `A gentle quiet moves through ${City}, the clouds smoothing the day’s pace.`,
      `${City} feels reflective under a muted sky, the light settling softly across the city.`,
      `A peaceful stillness rests over ${City}, shaped by calm layers of cloud.`,
    ];

    const rainy = [
      `A slow soothing rhythm moves through ${City} today as the rain softens the air.`,
      `${City} feels quiet and contemplative, the city washed in gentle shifting rain.`,
      `A tender calm settles over ${City}, raindrops easing the edges of the day.`,
      `${City} moves in a softened mood, the rain bringing a peaceful steady flow.`,
      `${City} glows faintly under the rain, the light diffused into gentle tones.`,
    ];

    const rainyHumid = [
      `${City} feels warm and heavy in the rain, the air settling in a slow embracing calm.`,
      `A dense softness hangs over ${City}, the rain blending with warm humid air.`,
      `The rain deepens the mood in ${City}, warm moisture carrying a reflective quiet.`,
    ];

    const stormy = [
      `${City} carries a quiet tension today, the sky pulsing softly with shifting energy.`,
      `A strong atmospheric mood moves through ${City}, the storm shaping the day with depth.`,
      `${City} feels powerful and restless, the air full of changing weather.`,
    ];

    const snowy = [
      `${City} rests in a peaceful winter hush, snow softening every sound.`,
      `${City} feels calm and cinematic, the snowfall giving the day a gentle dreamlike quality.`,
      `A quiet white stillness wraps around ${City}, the cold air carrying a serene beauty.`,
      `${City} glows softly under the snow, the world settling into a tranquil winter tone.`,
    ];

    const foggy = [
      `${City} feels muted and serene today, the air wrapped in a delicate haze.`,
      `A gentle veil settles over ${City}, softening the light and easing the day into calm.`,
      `${City} moves through quiet diffused light, the fog lending a dreamy tone.`,
      `${City} carries a subdued beauty today, softened by mist and fading edges.`,
    ];

    const windyMood = [
      `${City} moves with a lively shifting rhythm today, carried by the breeze.`,
      `A spirited motion flows through ${City}, the wind giving the day subtle energy.`,
      `${City} feels expressive, shaped gently by wandering currents of air.`,
    ];

    const humidMood = [
      `${City} feels close and warm today, the air holding everything in a soft embrace.`,
      `A gentle heaviness settles over ${City}, slowing the rhythm of the day.`,
      `The air wraps around ${City}, creating a quiet intimate mood.`,
    ];

    const coldMood = [
      `${City} feels crisp and refreshing, the cold air bringing clean clarity to the day.`,
      `A bright sharpness fills ${City}, every breath carrying a cool gentle stillness.`,
      `${City} rests under a cold calm today, the air clear and softly invigorating.`,
    ];

    const neutralMood = [
      `${City} carries a balanced gentle mood today, the light and air moving with calm ease.`,
      `${City} feels steady and centered, the day unfolding in a soft quiet rhythm.`,
      `A grounded stillness moves through ${City}, everything feeling naturally in place.`,
    ];

    if (aqi !== null && aqi >= 4) {
      const polluted = [
        `${City} feels muted today, the air carrying a noticeable heaviness.`,
        `A subdued atmosphere settles over ${City}, the light softened by the air.`,
        `${City} moves in quieter tones today, the air giving the day a gentle restraint.`,
      ];
      return polluted[Math.floor(Math.random() * polluted.length)];
    }

    if (isSunny) {
      if (isCold) return sunnyCold[Math.floor(Math.random() * sunnyCold.length)];
      if (isWarm) return sunnyWarm[Math.floor(Math.random() * sunnyWarm.length)];
      if (isHot) return sunnyHot[Math.floor(Math.random() * sunnyHot.length)];
      return sunnyWarm[Math.floor(Math.random() * sunnyWarm.length)];
    }

    if (isCloudy) return cloudy[Math.floor(Math.random() * cloudy.length)];
    if (isRainy)
      return isHumid
        ? rainyHumid[Math.floor(Math.random() * rainyHumid.length)]
        : rainy[Math.floor(Math.random() * rainy.length)];
    if (isStormy) return stormy[Math.floor(Math.random() * stormy.length)];
    if (isSnowy) return snowy[Math.floor(Math.random() * snowy.length)];
    if (isFoggy) return foggy[Math.floor(Math.random() * foggy.length)];
    if (isWindy) return windyMood[Math.floor(Math.random() * windyMood.length)];
    if (isHumid) return humidMood[Math.floor(Math.random() * humidMood.length)];
    if (isCold) return coldMood[Math.floor(Math.random() * coldMood.length)];

    return neutralMood[Math.floor(Math.random() * neutralMood.length)];
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-white space-y-2">
      <h4 className="text-white font-bold text-xl tracking-wide mb-3">
        {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}'s Mood
      </h4>

      <p className="text-sm leading-relaxed text-white/90 italic font-light">
        {getPersonality()}
      </p>

      <div className="pt-2 flex gap-4 text-xs text-white/70">
        <span>🌡️ {temp}°C</span>
        <span>💨 {wind} km/h</span>
        <span>💧 {humidity}%</span>

        {aqi !== null && (
          <span>🌫️ AQI: {aqi} {aqi_label ? `— ${aqi_label}` : ""}</span>
        )}
      </div>
    </div>
  );
}

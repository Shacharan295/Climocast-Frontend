const getPersonality = (): string => {
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

  // -----------------------------
  // CINEMATIC + AESTHETIC MOOD POOLS
  // -----------------------------

  const sunnyCold = [
    `${city} feels calm and luminous today, the cold air sharpening every detail.`,
    `A quiet winter clarity settles over ${city}, bright skies opening the day.`,
    `${city} carries a serene glow in the cold, sunlight moving gently across the sky.`,
    `A crisp brightness fills ${city}, clear light meeting chilled air.`,
    `${city} shines softly today, the cold giving the light a clean stillness.`,
  ];

  const sunnyWarm = [
    `${city} feels open and radiant today, warm light giving the city a gentle ease.`,
    `A bright, spacious energy fills ${city}, the warmth softening the day.`,
    `${city} carries an uplifting glow, sunlight stretching wide across the sky.`,
    `Warm skies brighten ${city}, giving everything a soft and inviting tone.`,
  ];

  const sunnyHot = [
    `${city} glows with bold summer light, warm air moving slowly through the day.`,
    `A vivid brightness settles over ${city}, the heat giving everything a rich intensity.`,
    `${city} feels vibrant under the warm sun, the air full of slow-moving energy.`,
  ];

  const cloudy = [
    `${city} feels quiet and reflective under a soft clouded sky.`,
    `A muted calm settles over ${city}, the clouds giving the day a gentle ease.`,
    `${city} moves in a peaceful tone today, softened by drifting clouds.`,
    `A calm stillness rests on ${city}, the sky wrapped in gentle grey.`,
  ];

  const rainy = [
    `${city} moves with a soft rhythm today, the rain slowing everything into a gentle flow.`,
    `${city} feels thoughtful in the rain, the air washed clean and calm.`,
    `A quiet beauty settles over ${city}, raindrops softening every corner.`,
    `Rain brings a peaceful mood to ${city}, the day unfolding in quiet tones.`,
    `${city} feels poetic under the rain, softened light shaping the atmosphere.`,
  ];

  const rainyHumid = [
    `${city} feels warm and heavy in the rain, the air thick with moisture and soft movement.`,
    `A slow, dense calm settles over ${city}, rain mixing with humid air.`,
    `The rain deepens the mood in ${city}, warm air carrying a reflective stillness.`,
  ];

  const stormy = [
    `${city} carries an electric tension today, the sky alive with shifting power.`,
    `A dramatic energy moves through ${city}, the atmosphere pulsing with stormlight.`,
    `${city} feels charged and intense, the air thick with approaching weather.`,
    `Storm winds shape the mood in ${city}, giving the day a bold cinematic tone.`,
  ];

  const snowy = [
    `${city} rests under a soft winter hush, snow giving the day a peaceful glow.`,
    `${city} feels calm and cinematic, the snow turning every moment quiet and still.`,
    `A gentle white stillness settles over ${city}, the cold softening the world.`,
    `${city} glows under winter light, the snow bringing a serene beauty.`,
  ];

  const foggy = [
    `${city} feels softened today, the air wrapped in a gentle haze.`,
    `A quiet veil settles over ${city}, giving the day a muted and dreamy tone.`,
    `${city} moves through softened light, the atmosphere carrying a tranquil calm.`,
    `${city} feels subdued and peaceful, the haze lending a slow and thoughtful mood.`,
  ];

  const windyMood = [
    `${city} carries a lively motion today, the breeze shaping the mood with subtle energy.`,
    `A spirited airflow moves through ${city}, giving the day a sense of movement.`,
    `${city} feels expressive, the wind adding texture and rhythm to the atmosphere.`,
  ];

  const humidMood = [
    `${city} feels warm and close today, the air holding everything in a soft embrace.`,
    `${city} moves at a slower pace, the humidity giving the day a gentle heaviness.`,
    `The air clings softly around ${city}, creating a warm and intimate atmosphere.`,
  ];

  const coldMood = [
    `${city} feels sharp and bright, the cold air giving the day a clean sense of clarity.`,
    `A crisp calm fills ${city}, every breath carrying a quiet winter light.`,
    `${city} rests in a bright cold stillness, the air clear and refreshing.`,
  ];

  const neutralMood = [
    `${city} feels steady and balanced today, calm air and soft light shaping the atmosphere.`,
    `${city} carries a gentle presence, the day unfolding with quiet simplicity.`,
    `A grounded calm moves through ${city}, everything feeling quietly centered.`,
  ];

  // -----------------------------
  // AQI OVERRIDES (Optional but cinematic)
  // -----------------------------
  if (aqi >= 4) {
    const polluted = [
      `${city} feels muted today, the air carrying a noticeable heaviness.`,
      `A subdued atmosphere settles over ${city}, the light softened by the air.`,
      `${city} moves in quieter tones today, the air giving the day a gentle restraint.`,
    ];
    return polluted[Math.floor(Math.random() * polluted.length)];
  }

  // -----------------------------
  // CONDITION-BASED SELECTION
  // -----------------------------
  if (isSunny) {
    if (isCold) return sunnyCold[Math.floor(Math.random() * sunnyCold.length)];
    if (isWarm) return sunnyWarm[Math.floor(Math.random() * sunnyWarm.length)];
    if (isHot) return sunnyHot[Math.floor(Math.random() * sunnyHot.length)];
    return sunnyWarm[Math.floor(Math.random() * sunnyWarm.length)];
  }

  if (isCloudy) {
    return cloudy[Math.floor(Math.random() * cloudy.length)];
  }

  if (isRainy) {
    if (isHumid) return rainyHumid[Math.floor(Math.random() * rainyHumid.length)];
    return rainy[Math.floor(Math.random() * rainy.length)];
  }

  if (isStormy) {
    return stormy[Math.floor(Math.random() * stormy.length)];
  }

  if (isSnowy) {
    return snowy[Math.floor(Math.random() * snowy.length)];
  }

  if (isFoggy) {
    return foggy[Math.floor(Math.random() * foggy.length)];
  }

  if (isWindy) {
    return windyMood[Math.floor(Math.random() * windyMood.length)];
  }

  if (isHumid) {
    return humidMood[Math.floor(Math.random() * humidMood.length)];
  }

  if (isCold) {
    return coldMood[Math.floor(Math.random() * coldMood.length)];
  }

  // Final fallback
  return neutralMood[Math.floor(Math.random() * neutralMood.length)];
};

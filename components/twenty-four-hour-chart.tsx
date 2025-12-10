"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  data: { time: string; temp: number }[];
}

export default function TwentyFourHourChart({ data }: ChartProps) {
  if (!data || data.length === 0) return null;

  // -------------------------------
  // ⭐ ALWAYS FIX X-AXIS HOURS (UI CLEAN)
  // -------------------------------
  const fixedHours = [
    "00:00",
    "03:00",
    "06:00",
    "09:00",
    "12:00",
    "15:00",
    "18:00",
    "21:00",
  ];

  // map backend values into fixed UI hours
  const lookup = Object.fromEntries(data.map((d) => [d.time, d.temp]));

  const alignedData = fixedHours.map((h) => ({
    time: h,
    temp: lookup[h] ?? null, // filled later
  }));

  // -------------------------------
  // ⭐ FILL MISSING TEMPS (fallback)
  // -------------------------------
  for (let i = 0; i < alignedData.length; i++) {
    if (alignedData[i].temp === null) {
      alignedData[i].temp =
        alignedData[i - 1]?.temp ??
        alignedData.find((d) => d.temp !== null)?.temp ??
        0;
    }
  }

  // -------------------------------
  // ⭐ CLEAN Y-axis
  // -------------------------------
  const temps = alignedData.map((d) => d.temp);
  const min = Math.min(...temps) - 2;
  const max = Math.max(...temps) + 2;

  return (
    <div className="w-full h-72 flex flex-col">
      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        24-Hour Temperature Trend
      </h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={alignedData}
            margin={{ top: 10, right: 15, left: 0, bottom: 10 }} // ⭐ FIX PANEL FIT
          >
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4DBBFF" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#1A6FFF" stopOpacity={0.15} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.25)"
            />

            <XAxis
              dataKey="time"
              tick={{ fill: "white", fontSize: 13 }}
              interval={0}      // ⭐ show all hours
              minTickGap={5}
              padding={{ left: 5, right: 5 }}
            />

            <YAxis
              domain={[min, max]}     // ⭐ nice padding
              allowDecimals={false}
              tick={{ fill: "white", fontSize: 13 }}
              tickCount={7}           // ⭐ clean labels
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(20,40,80,0.6)",
                backdropFilter: "blur(12px)",
                borderRadius: "12px",
                color: "white",
              }}
            />

            <Area
              type="monotone"
              dataKey="temp"
              stroke="#4DBBFF"
              strokeWidth={3}
              fill="url(#grad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

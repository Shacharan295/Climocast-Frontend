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
  // ⭐ CLEAN Y-AXIS RANGES
  // -------------------------------
  const temps = data.map((d) => d.temp);
  const tMin = Math.min(...temps);
  const tMax = Math.max(...temps);

  // Add padding so chart doesn't touch edges
  const buffer = 2;

  const minY = Math.floor((tMin - buffer) / 2) * 2;
  const maxY = Math.ceil((tMax + buffer) / 2) * 2;

  return (
    <div className="w-full h-80 flex flex-col">
      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        24-Hour Temperature Trend
      </h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            // ⭐ FIX 1: Proper padding inside chart (prevents overflow)
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          >
            <defs>
              <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4DBBFF" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#1A6FFF" stopOpacity={0.15} />
              </linearGradient>
            </defs>

            {/* ⭐ Clean, readable grid like your reference */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.25)"
              vertical={true}
              horizontal={true}
            />

            {/* ⭐ PERFECT X-axis */}
            <XAxis
              dataKey="time"
              tick={{ fill: "white", fontSize: 13 }}
              interval={0} // shows all 8 labels: 00,03,...21
              minTickGap={20}
              padding={{ left: 10, right: 10 }}
            />

            {/* ⭐ CLEAN Y-axis like the screenshot */}
            <YAxis
              domain={[minY, maxY]}
              tick={{ fill: "white", fontSize: 13 }}
              allowDecimals={false}
              tickCount={7} // forces clean steps: -4, -2, 0, 2, 4, 6, 8
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(25,40,70,0.7)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "12px",
                color: "white",
              }}
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
            />

            {/* ⭐ Smooth line */}
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#4DBBFF"
              strokeWidth={3}
              fill="url(#gradientFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

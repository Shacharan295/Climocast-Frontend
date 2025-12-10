"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface ChartProps {
  data: { time: string; temp: number }[];
}

export default function TwentyFourHourChart({ data }: ChartProps) {
  // ⭐ Auto-scale Y-axis nicely (rounded values)
  const temps = data.map((d) => d.temp);
  const minTemp = Math.floor(Math.min(...temps) / 2) * 2 - 2; // ex: -1 → -4
  const maxTemp = Math.ceil(Math.max(...temps) / 2) * 2 + 2; // ex: 7 → 10

  return (
    <div className="w-full h-80 flex flex-col">
      {/* ⭐ Title */}
      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        24-Hour Temperature Trend
      </h2>

      {/* ⭐ Chart Container */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: -10, bottom: 10 }} // ⭐ FIX SPACING
          >
            <defs>
              <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4DBBFF" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#1A6FFF" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.15)"
            />

            {/* ⭐ CLEAN X-axis */}
            <XAxis
              dataKey="time"
              tick={{ fill: "white", fontSize: 12 }}
              interval={0}            // ⭐ Always show all 8 time labels
              minTickGap={15}         // ⭐ Prevent overlapping
              padding={{ left: 10, right: 10 }}
            />

            {/* ⭐ CLEAN Y-axis */}
            <YAxis
              domain={[minTemp, maxTemp]} // ⭐ Always rounded & clean
              tick={{ fill: "white", fontSize: 12 }}
              allowDecimals={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(10,20,40,0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "12px",
                color: "white",
              }}
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
            />

            <Area
              type="monotone"
              dataKey="temp"
              stroke="#4DBBFF"
              strokeWidth={3}
              fill="url(#gradientFill)"
              isAnimationActive={true}
              animationDuration={900}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

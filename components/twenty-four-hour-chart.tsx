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

// ⭐ Clean Y-axis → NO EMPTY SPACE
function getYAxisRange(data: { temp: number }[]) {
  const temps = data.map(d => d.temp);
  const min = Math.min(...temps);
  const max = Math.max(...temps);

  return {
    min: min,           // EXACT lowest temp → NO EMPTY SPACE
    max: max + 2        // small top padding for readability
  };
}

export default function TwentyFourHourChart({ data }: ChartProps) {
  const { min, max } = getYAxisRange(data);

  return (
    <div className="w-full h-72">

      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        24-Hour Temperature Trend
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}  // ⭐ NO EXTRA SPACE
        >
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4DBBFF" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#1A6FFF" stopOpacity={0.25} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.25)"
          />

          {/* ⭐ Clean X-axis */}
          <XAxis
            dataKey="time"
            stroke="rgba(255,255,255,0.9)"
            style={{ fontSize: "12px" }}
            interval={0}
            tickMargin={6}
          />

          {/* ⭐ Y-axis starts at EXACT lowest temp → no empty gap */}
          <YAxis
            domain={[min, max]}
            stroke="rgba(255,255,255,0.9)"
            style={{ fontSize: "12px" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(20,40,80,0.6)",
              backdropFilter: "blur(12px)",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "white",
            }}
          />

          <Area
            type="monotone"
            dataKey="temp"
            stroke="#4DBBFF"
            strokeWidth={3}
            fill="url(#tempGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

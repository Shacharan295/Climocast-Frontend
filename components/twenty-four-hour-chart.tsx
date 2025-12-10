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

  const temps = data.map((d) => d.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  // ⭐ Perfect bottom domain (never clamp to 0)
  const minY = Math.floor(minTemp - 0.5);
  const maxY = Math.ceil(maxTemp + 1);

  // ⭐ Perfect even spacing (5 ticks)
  const ticks = [
    minY,
    minY + (maxY - minY) * 0.25,
    minY + (maxY - minY) * 0.5,
    minY + (maxY - minY) * 0.75,
    maxY,
  ].map((v) => Math.round(v));

  return (
    <div className="w-full h-72 flex flex-col">
      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        24-Hour Temperature Trend
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 5, left: 5, bottom: 10 }}
        >
          <defs>
            {/* 🔥 Fill gradient */}
            <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3EA8FF" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3EA8FF" stopOpacity={0.5} />
            </linearGradient>

            {/* 🔥 MASK fixes the fill problem permanently */}
            <mask id="curveMask">
              <Area
                type="monotone"
                dataKey="temp"
                stroke="#ffffff"
                strokeWidth={3}
                fill="white"
              />
            </mask>
          </defs>

          {/* Minimal elegant grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.15)"
            vertical={false}  // ⭐ only horizontal grid lines
          />

          <XAxis
            dataKey="time"
            stroke="rgba(255,255,255,0.9)"
            style={{ fontSize: "13px" }}
            interval={0}
            tickMargin={10}
          />

          <YAxis
            stroke="rgba(255,255,255,0.9)"
            domain={[minY, maxY]}
            ticks={ticks}
            style={{ fontSize: "13px" }}
            tickMargin={10}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(20,40,80,0.65)",
              backdropFilter: "blur(10px)",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
            }}
            cursor={{ stroke: "white", strokeWidth: 1 }}
          />

          {/* ⭐ Actual fill (MASKED to perfect curve shape) */}
          <rect
            width="100%"
            height="100%"
            fill="url(#tempFill)"
            mask="url(#curveMask)"
          />

          {/* ⭐ Smooth curve on top */}
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#3EA8FF"
            strokeWidth={3}
            fill="transparent"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

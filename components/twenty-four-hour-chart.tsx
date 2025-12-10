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
  return (
    <div className="w-full h-80 flex flex-col">
      
      {/* ⭐ Chart Title */}
      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        24-Hour Temperature
      </h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>

            {/* ⭐ Gradient Fill */}
            <defs>
              <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4DBBFF" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#1A6FFF" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.25)"
            />

            {/* ⭐ Show ALL labels (00:00 → 21:00) */}
            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.9)"
              style={{ fontSize: "12px" }}
              padding={{ left: 10, right: 10 }}
              interval={0}                     // ✅ show all ticks
              tick={{ fill: "white" }}
            />

            {/* ⭐ Keep Y clean + dynamic (no negative dips) */}
            <YAxis
              stroke="rgba(255,255,255,0.9)"
              style={{ fontSize: "12px" }}
              domain={["dataMin - 1", "dataMax + 1"]} // ⭐ prevents weird scaling
              tick={{ fill: "white" }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(20,40,80,0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "12px",
                color: "white",
              }}
              cursor={{ fill: "rgba(255,255,255,0.15)" }}
            />

            <Area
              type="monotone"
              dataKey="temp"
              stroke="#3EA8FF"
              strokeWidth={3}
              fill="url(#gradientFill)"
              isAnimationActive={true}
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface TwentyFourHourChartProps {
  data: { time: string; temp: number }[]
}

export default function TwentyFourHourChart({ data }: TwentyFourHourChartProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 h-80">
      <h3 className="text-white font-bold text-xl tracking-wide mb-3 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent drop-shadow-lg">
        24-Hour Temperature Trend
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />

          <XAxis
            dataKey="time"
            stroke="rgba(255,255,255,0.7)"
            style={{ fontSize: "12px" }}
          />

          <YAxis
            stroke="rgba(255,255,255,0.7)"
            style={{ fontSize: "12px" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "12px",
              color: "white",
            }}
            cursor={{ fill: "rgba(255,255,255,0.1)" }}
          />

          <Area
            type="monotone"
            dataKey="temp"
            stroke="#60a5fa"
            strokeWidth={2}
            fill="url(#gradientFill)"
            isAnimationActive={true}
            animationDuration={1200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

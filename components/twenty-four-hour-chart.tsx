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
    <div className="w-full h-64 flex flex-col px-4 py-2">

      {/* Title */}
      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        24-Hour Temperature Trend
      </h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>

            <defs>
              <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4DBBFF" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#1A6FFF" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.25)" />

            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.9)"
              style={{ fontSize: "12px" }}
              interval={1}
              tick={{ fill: "white" }}
            />

            <YAxis
              stroke="rgba(255,255,255,0.9)"
              style={{ fontSize: "12px" }}
              domain={[0, "dataMax + 5"]}
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

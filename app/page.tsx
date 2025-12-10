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
  // 1) CLEAN EVEN Y-AXIS DOMAIN
  // -------------------------------
  const temps = data.map((d) => d.temp);
  const min = Math.min(...temps);
  const max = Math.max(...temps);

  // Round nice values
  const minY = Math.floor(min) - 1; // buffer = 1
  const maxY = Math.ceil(max) + 1;

  // Y-axis ticks (even spacing)
  const ticks = [
    minY,
    Math.floor((minY + maxY) / 2),
    maxY,
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        24-Hour Temperature Trend
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 25, left: 0, bottom: 10 }}
        >
          {/* Full gradient that reaches the bottom */}
          <defs>
            <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3EA8FF" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3EA8FF" stopOpacity={0.25} />
            </linearGradient>
          </defs>

          {/* Clean even grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.25)"
            horizontal={true}
            vertical={true}
          />

          {/* X-Axis */}
          <XAxis
            dataKey="time"
            stroke="rgba(255,255,255,0.9)"
            style={{ fontSize: "13px" }}
            interval={0}
            tickMargin={10}
          />

          {/* PERFECT EVEN Y-AXIS */}
          <YAxis
            stroke="rgba(255,255,255,0.9)"
            domain={[minY, maxY]}
            ticks={ticks}
            tickMargin={10}
            style={{ fontSize: "13px" }}
            allowDecimals={false}
            axisLine={true}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(20,40,80,0.7)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "10px",
              color: "white",
            }}
            cursor={{ stroke: "white", strokeWidth: 1 }}
          />

          {/* Area Line */}
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#3EA8FF"
            strokeWidth={3}
            fill="url(#tempFill)"
            fillOpacity={1}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

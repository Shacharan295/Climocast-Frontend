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

  // ⭐ Always fill down to the chart bottom (0°C baseline)
  let minY = 0;

  let maxY = Math.ceil(Math.max(...temps)) + 1;

  // Keep at least 6-degree vertical spacing
  if (maxY - minY < 6) {
    maxY = minY + 6;
  }

  // Even 5 ticks
  const step = (maxY - minY) / 4;
  const ticks = Array.from({ length: 5 }, (_, i) =>
    Math.round(minY + step * i)
  );

  return (
    <div className="w-full h-72 flex flex-col">
      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        24-Hour Temperature Trend
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
        >
          {/* BLUE gradient */}
          <defs>
            <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3EA8FF" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3EA8FF" stopOpacity={0.25} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.25)"
          />

          {/* X-axis */}
          <XAxis
            dataKey="time"
            stroke="rgba(255,255,255,0.9)"
            style={{ fontSize: "13px" }}
            interval={0}
            tickMargin={10}
          />

          {/* ⭐ Y-axis now starts at 0 → fill touches bottom */}
          <YAxis
            stroke="rgba(255,255,255,0.9)"
            domain={[minY, maxY]}
            ticks={ticks}
            allowDecimals={false}
            style={{ fontSize: "13px" }}
            tickMargin={10}
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

          {/* Line + Filled Area */}
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#3EA8FF"
            strokeWidth={3}
            fill="url(#tempFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

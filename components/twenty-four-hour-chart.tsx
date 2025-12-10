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

// Generate clean Y-axis ticks
function getTicks(min: number, max: number) {
  const ticks = [];

  // Force min
  ticks.push(min);

  // Add 0 only if data crosses below and above
  if (min < 0 && max > 0) {
    ticks.push(0);
  }

  // Middle
  const mid = Math.round((min + max) / 2);
  if (!ticks.includes(mid)) ticks.push(mid);

  // Force max
  ticks.push(max);

  return ticks.sort((a, b) => a - b);
}

export default function TwentyFourHourChart({ data }: ChartProps) {
  if (!data || data.length === 0) return null;

  const temps = data.map(d => d.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  // Expand slightly for breathing room
  const safeMin = Math.floor(minTemp);
  const safeMax = Math.ceil(maxTemp);

  const ticks = getTicks(safeMin, safeMax);

  return (
    <div className="w-full h-72 flex flex-col">
      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        24-Hour Temperature Trend
      </h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 20, bottom: 10, left: 20 }}>
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
              style={{ fontSize: "13px" }}
              tickMargin={10}
            />

            <YAxis
              stroke="rgba(255,255,255,0.9)"
              style={{ fontSize: "13px" }}
              domain={[safeMin, safeMax]}
              ticks={ticks}
              tickMargin={10}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(20,40,80,0.75)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "12px",
                color: "white",
              }}
            />

            <Area
              type="monotone"
              dataKey="temp"
              stroke="#3EA8FF"
              strokeWidth={3}
              fill="url(#gradientFill)"
              isAnimationActive={true}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

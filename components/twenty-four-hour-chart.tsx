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
  // Compute nice clean Y axis values
  const temps = data.map(d => d.temp);

  const minY = Math.floor(Math.min(...temps) / 2) * 2 - 2;  // round down
  const maxY = Math.ceil(Math.max(...temps) / 2) * 2 + 2;   // round up

  // Clean tick marks: -2, 0, 2, 4, 6, 8...
  const ticks: number[] = [];
  for (let v = minY; v <= maxY; v += 2) ticks.push(v);

  return (
    <div className="w-full h-72 flex flex-col">
      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        24-Hour Temperature Trend
      </h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            
            <defs>
              <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4DBBFF" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#1A6FFF" stopOpacity={0.3} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.25)" />

            <YAxis
              ticks={ticks}
              domain={[minY, maxY]}
              stroke="rgba(255,255,255,0.9)"
              style={{ fontSize: "12px" }}
            />

            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.9)"
              style={{ fontSize: "12px" }}
              interval={0}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(20,40,80,0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "12px",
                color: "white",
              }}
              cursor={{ stroke: "rgba(255,255,255,0.4)", strokeWidth: 1 }}
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

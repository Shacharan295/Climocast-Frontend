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

  // Compute clean Y-axis min & max → rounded nicely
  const temps = data.map(d => d.temp);
  const minTemp = Math.floor(Math.min(...temps) - 1);
  const maxTemp = Math.ceil(Math.max(...temps) + 1);

  return (
    <div className="w-full h-72 flex flex-col">

      {/* ⭐ Title stays untouched */}
      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        24-Hour Temperature Trend
      </h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            {/* ⭐ Soft grid lines for X + Y axis */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={true}
              stroke="rgba(255,255,255,0.25)"
            />

            {/* ⭐ Clean X-axis spacing */}
            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.9)"
              style={{ fontSize: "12px" }}
              interval={0}
              tickMargin={10}
            />

            {/* ⭐ Clean Y-axis with equal spacing */}
            <YAxis
              domain={[minTemp, maxTemp]}
              tickCount={6}
              stroke="rgba(255,255,255,0.9)"
              style={{ fontSize: "12px" }}
              tickMargin={10}
            />

            {/* ⭐ Better tooltip */}
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

            {/* ⭐ Pretty gradient fill */}
            <defs>
              <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4DBBFF" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#1A6FFF" stopOpacity={0.25} />
              </linearGradient>
            </defs>

            {/* ⭐ Final line curve (smooth, same as before) */}
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#3EA8FF"
              strokeWidth={3}
              fill="url(#gradientFill)"
              dot={{ r: 3, stroke: "#fff", strokeWidth: 1 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

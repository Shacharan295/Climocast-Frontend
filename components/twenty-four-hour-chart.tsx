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

  const minY = Math.floor(minTemp - 0.5);
  const maxY = Math.ceil(maxTemp + 1);

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
          margin={{ top: 10, right: 30, left: 30, bottom: 10 }} // ⭐ centered layout
        >
          <defs>
            <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3EA8FF" stopOpacity={0.85} />
              <stop offset="100%" stopColor="#3EA8FF" stopOpacity={0.35} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.15)"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            stroke="rgba(255,255,255,0.9)"
            style={{ fontSize: "13px" }}
            interval={0}
            tickMargin={8}
          />

          <YAxis
            domain={[minY, maxY]}
            ticks={ticks}
            stroke="rgba(255,255,255,0.9)"
            allowDecimals={false}
            style={{ fontSize: "13px" }}
            tickMargin={8}
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

          <Area
            type="monotone"
            dataKey="temp"
            stroke="#3EA8FF"
            strokeWidth={3}
            fill="url(#tempFill)"
            baseValue={minY} // ⭐ full bottom fill
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

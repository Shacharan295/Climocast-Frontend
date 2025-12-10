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

// ⭐ Utility: compute clean rounded Y-axis range
function getYAxisRange(data: { temp: number }[]) {
  if (!data || data.length === 0) return { min: -5, max: 5 };

  const temps = data.map((d) => d.temp);
  const min = Math.min(...temps);
  const max = Math.max(...temps);

  // round down to nearest multiple of 2
  const cleanMin = Math.floor((min - 1) / 2) * 2;
  // round up to nearest multiple of 2
  const cleanMax = Math.ceil((max + 1) / 2) * 2;

  return { min: cleanMin, max: cleanMax };
}

export default function TwentyFourHourChart({ data }: ChartProps) {
  const { min, max } = getYAxisRange(data);

  return (
    <div className="w-full h-72">
      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        24-Hour Temperature Trend
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          {/* Gradient fill */}
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4DBBFF" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#1A6FFF" stopOpacity={0.25} />
            </linearGradient>
          </defs>

          {/* Clean dashed grid */}
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="rgba(255,255,255,0.25)"
          />

          {/* Clean X-axis */}
          <XAxis
            dataKey="time"
            stroke="rgba(255,255,255,0.9)"
            style={{ fontSize: "12px", fontWeight: 500 }}
            tickMargin={8}
            interval={0} // show all times, evenly spaced
          />

          {/* Smart Y-axis */}
          <YAxis
            stroke="rgba(255,255,255,0.9)"
            domain={[min, max]} // auto-cleaned range
            tickCount={6}
            style={{ fontSize: "12px", fontWeight: 500 }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(20,40,80,0.6)",
              backdropFilter: "blur(12px)",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "white",
            }}
            cursor={{ stroke: "#ffffff", strokeWidth: 1 }}
          />

          {/* Area line */}
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#4DBBFF"
            strokeWidth={3}
            fill="url(#tempGradient)"
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

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

// ⭐ Clean Y-axis → NO EMPTY SPACE
function getYAxisRange(data: { temp: number }[]) {
  const temps = data.map((d) => d.temp);
  const min = Math.floor(Math.min(...temps));
  const max = Math.ceil(Math.max(...temps)) + 2;
  return { min, max };
}

export default function TwentyFourHourChart({ data }: ChartProps) {
  const { min, max } = getYAxisRange(data);

  return (
    <div className="w-full h-full">
      {/* ⭐ TITLE FIX: Add the chart title back */}
      <h2 className="text-white text-lg font-semibold mb-2">
        24-Hour Temperature Trend
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 20,   // ⭐ extra right margin → fixes last label cutoff
            left: 0,
            bottom: 10,
          }}
        >
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4DBBFF" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#1A6FFF" stopOpacity={0.25} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.25)"
          />

          <XAxis
            dataKey="time"
            interval={0}
            tickMargin={10}
            padding={{ left: 5, right: 10 }} // ⭐ increase right padding → fixes cutoff
            axisLine={false}
            tickLine={false}
            stroke="rgba(255,255,255,0.9)"
            style={{ fontSize: "12px" }}
          />

          <YAxis
            domain={[min, max]}
            tickMargin={8}
            padding={{ top: 5 }}
            axisLine={false}
            tickLine={false}
            stroke="rgba(255,255,255,0.9)"
            style={{ fontSize: "12px" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(20,40,80,0.6)",
              backdropFilter: "blur(12px)",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "white",
            }}
          />

          <Area
            type="monotone"
            dataKey="temp"
            stroke="#4DBBFF"
            strokeWidth={3}
            fill="url(#tempGradient)"
            dot={{ r: 4, fill: "white" }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

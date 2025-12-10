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
  const min = Math.floor(Math.min(...temps)); // round down to avoid bottom gap
  const max = Math.ceil(Math.max(...temps)) + 2; // small top padding

  return { min, max };
}

export default function TwentyFourHourChart({ data }: ChartProps) {
  const { min, max } = getYAxisRange(data);

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 10, // ⭐ ensures X-axis labels stay inside
          }}
        >
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4DBBFF" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#1A6FFF" stopOpacity={0.25} />
            </linearGradient>
          </defs>

          {/* ⭐ Soft grid like your reference image */}
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.25)" />

          {/* ⭐ X-axis FIXED: all labels visible + last label inside panel */}
          <XAxis
            dataKey="time"
            interval={0} // show all labels
            tickMargin={10} // spacing from axis
            padding={{ left: 5, right: 5 }} // ⭐ prevents clipping
            axisLine={false}
            tickLine={false}
            stroke="rgba(255,255,255,0.9)"
            style={{ fontSize: "12px" }}
          />

          {/* ⭐ Y-axis FIXED: clean spacing and fully inside panel */}
          <YAxis
            domain={[min, max]}
            tickMargin={8}
            padding={{ top: 5 }} // prevents tick touching top border
            axisLine={false}
            tickLine={false}
            stroke="rgba(255,255,255,0.9)"
            style={{ fontSize: "12px" }}
          />

          {/* Tooltip kept same */}
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(20,40,80,0.6)",
              backdropFilter: "blur(12px)",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "white",
            }}
          />

          {/* ⭐ Final polished curve */}
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

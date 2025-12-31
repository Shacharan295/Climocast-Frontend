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

  const smoothTemps = (data: { time: string; temp: number }[]) => {
    return data.map((d, i, arr) => {
      if (i === 0 || i === arr.length - 1) return d;
      return {
        ...d,
        temp: Number(
          ((arr[i - 1].temp + d.temp + arr[i + 1].temp) / 3).toFixed(1)
        ),
      };
    });
  };

  const smoothData = smoothTemps(data);

  const temps = smoothData.map((d) => d.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  const minY = Math.floor(minTemp - 1);
  let maxY = Math.ceil(maxTemp + 1);

  const range = maxY - minY;
  const step = Math.max(1, Math.round(range / 4));
  maxY = minY + step * 4;

  const ticks = [
    minY,
    minY + step,
    minY + step * 2,
    minY + step * 3,
    maxY,
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        Temperature Trend
      </h2>

      {/* ✅ ONLY FIX: chart takes remaining height */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={smoothData}
            margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
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
              ticks={[
                "00:00",
                "03:00",
                "06:00",
                "09:00",
                "12:00",
                "15:00",
                "18:00",
                "21:00",
              ]}
              tickMargin={8}
            />

            <YAxis
              domain={[minY, maxY]}
              ticks={ticks}
              stroke="rgba(255,255,255,0.9)"
              allowDecimals={false}
              style={{ fontSize: "13px" }}
              tickMargin={8}
              width={40}
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
              baseValue={minY}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

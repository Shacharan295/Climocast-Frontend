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
  data: { dt: number; temp: number }[];
  timezoneOffset: number;
}

export default function TwentyFourHourChart({
  data,
  timezoneOffset,
}: ChartProps) {
  if (!data || data.length === 0) return null;

  // ---------------------------------------------------------
  // ⭐ ONLY CHANGE: build exactly 8 points
  // (today first, fill rest from yesterday)
  // ---------------------------------------------------------
  const localData = data.map((d) => {
    const localDate = new Date((d.dt + timezoneOffset) * 1000);
    return {
      ...d,
      hour: localDate.getHours(),
      dateStr: localDate.toDateString(),
    };
  });

  const todayStr = new Date(
    (Date.now() + timezoneOffset * 1000)
  ).toDateString();

  const todayPoints = localData.filter(
    (d) => d.dateStr === todayStr
  );

  const pastPoints = localData.filter(
    (d) => d.dateStr !== todayStr
  );

  let chartBase: typeof localData = [];

  if (todayPoints.length >= 8) {
    chartBase = todayPoints.slice(0, 8);
  } else {
    const needed = 8 - todayPoints.length;
    const filler = pastPoints.slice(-needed);
    chartBase = [...filler, ...todayPoints];
  }

  const chartData = chartBase.slice(-8);

  // ---------------------------------------------------------
  // ⭐ Smoothing (unchanged)
  // ---------------------------------------------------------
  const smoothData = chartData.map((d, i, arr) => {
    if (i === 0 || i === arr.length - 1) return d;
    return {
      ...d,
      temp: Number(
        ((arr[i - 1].temp + d.temp + arr[i + 1].temp) / 3).toFixed(1)
      ),
    };
  });

  const temps = smoothData.map((d) => d.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  const minY = Math.floor(minTemp - 1);
  const maxY = Math.ceil(maxTemp + 1);

  return (
    <div className="w-full h-72 flex flex-col">
      <h2 className="text-white text-xl font-semibold mb-3 tracking-wide">
        Temperature Trend (Today)
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={smoothData}>
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
            dataKey="hour"
            stroke="rgba(255,255,255,0.9)"
            interval={0}
            tickFormatter={(h) =>
              `${String(h).padStart(2, "0")}:00`
            }
          />

          <YAxis
            domain={[minY, maxY]}
            stroke="rgba(255,255,255,0.9)"
            allowDecimals={false}
          />

          <Tooltip
            labelFormatter={(h) => `${h}:00`}
            formatter={(v) => [`${v}°C`, "Temp"]}
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
  );
}

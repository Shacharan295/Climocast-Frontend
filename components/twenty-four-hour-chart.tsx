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

  // --------------------------------------------------
  // 1️⃣ Convert forecast to local time
  // --------------------------------------------------
  const localData = data.map((d) => {
    const local = new Date((d.dt + timezoneOffset) * 1000);
    return {
      ...d,
      hour: local.getHours(),
      dateStr: local.toDateString(),
    };
  });

  const nowLocal = new Date(Date.now() + timezoneOffset * 1000);
  const todayStr = nowLocal.toDateString();
  const nowHour = nowLocal.getHours();

  // --------------------------------------------------
  // 2️⃣ Split today vs past
  // --------------------------------------------------
  const todayPoints = localData.filter(
    (d) => d.dateStr === todayStr && d.hour >= nowHour
  );

  const pastPoints = localData.filter(
    (d) => d.dateStr !== todayStr || d.hour < nowHour
  );

  // --------------------------------------------------
  // 3️⃣ Build EXACTLY 8 points
  // --------------------------------------------------
  let base: typeof localData = [];

  if (todayPoints.length >= 8) {
    base = todayPoints.slice(0, 8);
  } else {
    const needed = 8 - todayPoints.length;
    const filler = pastPoints.slice(-needed);
    base = [...filler, ...todayPoints];
  }

  const chartData = base.slice(-8);

  // --------------------------------------------------
  // 4️⃣ Smooth curve (visual only)
  // --------------------------------------------------
  const smoothData = chartData.map((d, i, arr) => {
    if (i === 0 || i === arr.length - 1) return d;
    return {
      ...d,
      temp: Number(
        ((arr[i - 1].temp + d.temp + arr[i + 1].temp) / 3).toFixed(1)
      ),
    };
  });

  // --------------------------------------------------
  // 5️⃣ Y-axis: 5 ticks, dynamic
  // --------------------------------------------------
  const temps = smoothData.map((d) => d.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  const minY = Math.floor(minTemp - 1);
  const maxY = Math.ceil(maxTemp + 1);

  const steps = 4; // → 5 ticks total
  const step = Math.max(1, Math.round((maxY - minY) / steps));
  const yTicks = Array.from({ length: steps + 1 }, (_, i) => minY + i * step);

  return (
    <div className="w-full h-72 flex flex-col">
      <h2 className="text-white text-xl font-semibold mb-3">
        Temperature Trend (Today)
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={smoothData}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <defs>
            <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4FC3FF" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#4FC3FF" stopOpacity={0.4} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="rgba(255,255,255,0.15)"
            vertical={false}
          />

          {/* X AXIS */}
          <XAxis
            dataKey="hour"
            interval="preserveStartEnd"
            tickMargin={8}
            stroke="rgba(255,255,255,0.85)"
            style={{ fontSize: "12px" }}
            tickFormatter={(h) => {
              const hour12 = h % 12 || 12;
              const ampm = h < 12 ? "AM" : "PM";
              return `${hour12} ${ampm}`;
            }}
          />

          {/* Y AXIS */}
          <YAxis
            domain={[minY, maxY]}
            ticks={yTicks}
            allowDecimals={false}
            stroke="rgba(255,255,255,0.85)"
            width={40}
          />

          <Tooltip
            labelFormatter={(h) => {
              const hour12 = h % 12 || 12;
              const ampm = h < 12 ? "AM" : "PM";
              return `${hour12} ${ampm}`;
            }}
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
            stroke="#4FC3FF"
            strokeWidth={3}
            fill="url(#tempFill)"
            baseValue={minY}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

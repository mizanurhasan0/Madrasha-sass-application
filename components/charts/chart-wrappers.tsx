"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const areaConfig = {
  value: { label: "Value", color: "var(--chart-1)" },
  count: { label: "Count", color: "var(--chart-1)" },
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  collected: { label: "Collected", color: "var(--chart-1)" },
  present: { label: "Present", color: "var(--chart-2)" },
} satisfies ChartConfig;

type ChartData = Record<string, string | number>;

export function AreaTrendChart({
  data,
  dataKey,
  xKey = "month",
  height = 250,
}: {
  data: ChartData[];
  dataKey: string;
  xKey?: string;
  height?: number;
}) {
  return (
    <ChartContainer config={areaConfig} className="w-full" style={{ height }}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} width={40} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="var(--color-value)"
          fill="var(--color-value)"
          fillOpacity={0.15}
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}

export function BarSeriesChart({
  data,
  dataKey,
  xKey = "day",
  height = 250,
}: {
  data: ChartData[];
  dataKey: string;
  xKey?: string;
  height?: number;
}) {
  return (
    <ChartContainer config={areaConfig} className="w-full" style={{ height }}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} width={40} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={dataKey} fill="var(--color-value)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

export function DonutSplitChart({
  data,
  height = 250,
}: {
  data: { name: string; value: number }[];
  height?: number;
}) {
  const config = Object.fromEntries(
    data.map((d, i) => [d.name, { label: d.name, color: COLORS[i % COLORS.length] }])
  ) satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="w-full" style={{ height }}>
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

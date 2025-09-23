"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useLocale } from "@/hooks/use-locale";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

export function DashboardChart() {
  const { t } = useLocale();

  const chartConfig = {
    desktop: {
      label: t("dashboard.chart.label"),
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;
  
  const translatedChartData = chartData.map(item => ({...item, month: t(`months.${item.month.toLowerCase()}`)}));

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{t("dashboard.chart.title")}</CardTitle>
        <CardDescription>{t("dashboard.chart.description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={translatedChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

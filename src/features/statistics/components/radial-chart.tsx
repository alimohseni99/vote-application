"use client";

import { PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type RadialChartProps = {
  agreed: number;
  disagreed: number;
};

const chartConfig: ChartConfig = {
  agreed: {
    label: "Agreed",
    color: "hsl(var(--chart-2))",
  },
  disagreed: {
    label: "Disagreed",
    color: "hsl(var(--chart-1))",
  },
};

export function RadialChart({ agreed, disagreed }: RadialChartProps) {
  const totalVotes = agreed + disagreed;
  const agreement = (agreed / totalVotes) * 100;

  console.log({ totalVotes, agreement });

  const chartData = [
    { name: "Disagreed", disagreed: disagreed },
    { name: "Agreed", agreed: agreed },
  ];

  return (
    <Card className="w-[350px] flex flex-col justify-center">
      <CardHeader className="items-center pb-0">
        <CardTitle>Agreement</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
            barSize={10}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} axisLine={false} />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-center"
            >
              <tspan className="text-2xl font-bold">
                {totalVotes.toLocaleString()}
              </tspan>
              <tspan
                x="50%"
                dy="1.5em"
                className="fill-muted-foreground text-sm"
              >
                Agreement of {agreement.toFixed(2)}%
              </tspan>
            </text>
            <RadialBar
              dataKey="disagreed"
              name="Disagreed"
              fill={chartConfig.disagreed.color}
              stackId="a"
              cornerRadius={5}
            />
            <RadialBar
              dataKey="agreed"
              name="Agreed"
              fill={chartConfig.agreed.color}
              stackId="a"
              cornerRadius={5}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

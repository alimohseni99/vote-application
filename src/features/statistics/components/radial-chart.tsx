"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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

const chartData = [{ agreed: 570, disagreed: 1260 }];

const chartConfig = {
  agreed: {
    label: "Agreed",
    color: "hsl(var(--chart-2))",
  },
  disagreed: {
    label: "Disagreed",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RadialChart({ agreed, disagreed }: RadialChartProps) {
  const totalVotes = agreed + disagreed;
  const agreement = (agreed / totalVotes) * 100;

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
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVotes.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 15}
                          className="fill-muted-foreground"
                        >
                          Agreement of {agreement.toFixed(2)}%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>

            <RadialBar
              dataKey="disagreed"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-disagreed)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="agreed"
              fill="var(--color-agreed)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

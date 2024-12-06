"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Props = {
  appleVotes: number;
  bananaVotes: number;
  orangeVotes: number;
};

export function ElectionOptions({
  appleVotes,
  bananaVotes,
  orangeVotes,
}: Props) {
  const chartData = [
    { option: "Apple", votes: appleVotes, fill: "hsl(var(--chart-1))" },
    { option: "Banana", votes: bananaVotes, fill: "hsl(var(--chart-2))" },
    { option: "Orange", votes: orangeVotes, fill: "hsl(var(--chart-3))" },
  ];

  const chartConfig = {
    options: {
      label: "Votes",
    },
    Apple: {
      label: "Apple",
      color: "hsl(var(--chart-1))",
    },
    Banana: {
      label: "Banana",
      color: "hsl(var(--chart-2))",
    },
    Orange: {
      label: "Orange",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-[350px] flex flex-col justify-center">
      <CardHeader className="items-center pb-0">
        <CardTitle>Vote Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0"
        >
          <PieChart width={250} height={250}>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="option" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="votes"
              nameKey="option"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {payload.votes}
                  </text>
                );
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

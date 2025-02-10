import React from "react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

export interface RadialChartProps {
  data: { name: string; value: number; fill: string }[];
  centerLabel?: string;
  centerValue?: number | null; // Allow null
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}

const RadialChart: React.FC<RadialChartProps> = ({
  data,
  centerLabel,
  centerValue,
  width = 300,
  height = 300,
  innerRadius = 50,
  outerRadius = 110,
}) => {
  return (
    <RadialBarChart
      data={data}
      width={width}
      height={height}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      endAngle={360}
    >
      <PolarGrid
        gridType="circle"
        radialLines={false}
        stroke="none"
        className="first:fill-muted last:fill-background"
        polarRadius={[86, 74]}
      />
      <RadialBar dataKey="value" background />
      <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
        <Label
          content={({ viewBox }) => {
            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
              return (
                <text
                  x={viewBox.cx}
                  y={viewBox.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan className="fill-foreground text-4xl font-bold">
                    {(centerValue ?? 0).toLocaleString()}
                  </tspan>
                  {centerLabel && (
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      {centerLabel}
                    </tspan>
                  )}
                </text>
              );
            }
          }}
        />
      </PolarRadiusAxis>
    </RadialBarChart>
  );
};

export default RadialChart;

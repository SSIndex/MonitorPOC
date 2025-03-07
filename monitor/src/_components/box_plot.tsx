'use client'

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  RectangleProps,
  Scatter,
  Tooltip,
} from "recharts";

const DotBar = (props: RectangleProps) => {
  const { x, y, width, height } = props;

  if (x == null || y == null || width == null || height == null) {
    return null;
  }

  return (
    <line
      x1={x + width / 2}
      y1={y + height}
      x2={x + width / 2}
      y2={y}
      stroke={"#000"}
      strokeWidth={2}
    //   strokeDasharray={"5"}
    />
  );
};

const HorizonBar = (props: RectangleProps) => {
  const { x, y, width, height } = props;

  if (x == null || y == null || width == null || height == null) {
    return null;
  }

  return (
    <line x1={x+40} y1={y} x2={x + width - 40} y2={y} stroke={"#000"} strokeWidth={2} />
  );
};

type BoxPlot = {
  min: number;
  lowerQuartile: number;
  median: number;
  upperQuartile: number;
  max: number;
  average?: number;
};

type BoxPlotData = {
  min: number;
  bottomWhisker: number;
  bottomBox: number;
  topBox: number;
  topWhisker: number;
  average?: number;
  size: number; // for average dot size
};

const useBoxPlot = (boxPlots: BoxPlot[]): BoxPlotData[] => {
  const data = useMemo(
    () =>
      boxPlots.map((v) => {
        return {
          min: v.min,
          bottomWhisker: v.lowerQuartile - v.min,
          bottomBox: v.median - v.lowerQuartile,
          topBox: v.upperQuartile - v.median,
          topWhisker: v.max - v.upperQuartile,
        //   average: v.average,
          size: 500,
        };
      }),
    [boxPlots],
  );

  return data;
};

const boxPlots = [
  {
    min: 100,
    lowerQuartile: 200,
    median: 250,
    upperQuartile: 450,
    max: 650,
    average: 150,
  },
  {
    min: 200,
    lowerQuartile: 400,
    median: 600,
    upperQuartile: 700,
    max: 800,
    average: 550,
  },
  {
    min: 0,
    lowerQuartile: 200,
    median: 400,
    upperQuartile: 600,
    max: 800,
    average: 400,
  },
];

const BoxPlotChart = () => {
  const data = useBoxPlot(boxPlots);

  return (
    <ResponsiveContainer width={"100%"} minHeight={"100px"}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Bar stackId={"a"} dataKey={"min"} fill={"none"} />
        <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />} />
        <Bar stackId={"a"} dataKey={"bottomWhisker"} shape={<DotBar />} />
        <Bar stackId={"a"} dataKey={"bottomBox"} fill={"#8884d8"} />
        <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />} />
        <Bar stackId={"a"} dataKey={"topBox"} fill={"#8884d8"} />
        <Bar stackId={"a"} dataKey={"topWhisker"} shape={<DotBar />} />
        <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />} />
        <Tooltip />
        <ZAxis type="number" dataKey="size" range={[0, 250]} />

        <Scatter dataKey="average" fill={"red"} stroke={"#FFF"} />
        <XAxis />
        <YAxis />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export { BoxPlotChart };

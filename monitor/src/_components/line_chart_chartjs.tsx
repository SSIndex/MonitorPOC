"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartEvent,
  LegendItem,
  LegendElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { hexToRgba } from "@/_utils/cssUtils";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

// Data from your example
const data = [
  {
    date: "2021-01-01",
    totalScore: 32,
    socialCapital: 20,
    environment: 12,
    humanCapital: 10,
    leadershipAndGovernance: 15,
    businessModelAndInnovation: 18,
    others: 10,
  },
  {
    date: "2021-02-01",
    totalScore: 35,
    socialCapital: 22,
    environment: 15,
    humanCapital: 12,
    leadershipAndGovernance: 18,
    businessModelAndInnovation: 20,
    others: 10,
  },
  {
    date: "2021-03-01",
    totalScore: 30,
    socialCapital: 19,
    environment: 14,
    humanCapital: 11,
    leadershipAndGovernance: 17,
    businessModelAndInnovation: 18,
    others: 9,
  },
  {
    date: "2021-04-01",
    totalScore: 40,
    socialCapital: 25,
    environment: 18,
    humanCapital: 15,
    leadershipAndGovernance: 20,
    businessModelAndInnovation: 22,
    others: 10,
  },
  {
    date: "2021-05-01",
    totalScore: 38,
    socialCapital: 24,
    environment: 17,
    humanCapital: 14,
    leadershipAndGovernance: 19,
    businessModelAndInnovation: 21,
    others: 9,
  },
  {
    date: "2021-06-01",
    totalScore: 42,
    socialCapital: 26,
    environment: 19,
    humanCapital: 16,
    leadershipAndGovernance: 21,
    businessModelAndInnovation: 23,
    others: 10,
  },
  {
    date: "2021-07-01",
    totalScore: 37,
    socialCapital: 22,
    environment: 16,
    humanCapital: 14,
    leadershipAndGovernance: 18,
    businessModelAndInnovation: 20,
    others: 9,
  },
  {
    date: "2021-08-01",
    totalScore: 45,
    socialCapital: 28,
    environment: 21,
    humanCapital: 18,
    leadershipAndGovernance: 23,
    businessModelAndInnovation: 26,
    others: 11,
  },
  {
    date: "2021-09-01",
    totalScore: 41,
    socialCapital: 25,
    environment: 20,
    humanCapital: 17,
    leadershipAndGovernance: 21,
    businessModelAndInnovation: 23,
    others: 10,
  },
  {
    date: "2021-10-01",
    totalScore: 46,
    socialCapital: 27,
    environment: 22,
    humanCapital: 19,
    leadershipAndGovernance: 24,
    businessModelAndInnovation: 27,
    others: 11,
  },
  {
    date: "2021-11-01",
    totalScore: 43,
    socialCapital: 26,
    environment: 21,
    humanCapital: 18,
    leadershipAndGovernance: 22,
    businessModelAndInnovation: 25,
    others: 10,
  },
  {
    date: "2021-12-01",
    totalScore: 48,
    socialCapital: 30,
    environment: 24,
    humanCapital: 20,
    leadershipAndGovernance: 26,
    businessModelAndInnovation: 29,
    others: 12,
  },
];

// Line definitions
const lines = [
  { dataKey: "totalScore", stroke: "#8884d8", name: "Total Score" },
  { dataKey: "socialCapital", stroke: "#82ca9d", name: "Social Capital" },
  { dataKey: "environment", stroke: "#ff7300", name: "Environment" },
  { dataKey: "humanCapital", stroke: "#ff0000", name: "Human Capital" },
  {
    dataKey: "leadershipAndGovernance",
    stroke: "#00ff00",
    name: "Leadership & Governance",
  },
  {
    dataKey: "businessModelAndInnovation",
    stroke: "#0000ff",
    name: "Business Model & Innovation",
  },
  { dataKey: "others", stroke: "#ff00ff", name: "Others" },
];

const chartData = {
  labels: data.map((d) => d.date),
  datasets: lines.map((line) => ({
    label: line.name,
    data: data.map((d) => d[line.dataKey as keyof (typeof data)[0]]),
    borderColor:
      line.dataKey !== "totalScore" ? hexToRgba(line.stroke, 0.3) : line.stroke,
    backgroundColor:
      line.dataKey !== "totalScore" ? hexToRgba(line.stroke, 0.3) : line.stroke,
    borderWidth: 2,
    fill: false,
    tension: 0.4,
    pointRadius: 3,
    hidden: line.dataKey !== "totalScore",
  })),
};

export default function TimeTrendsLineChart() {
  return (
    <div className="h-96">
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right" as const,
              align: "start",
              labels: {
                boxWidth: 10,
                font: { size: 12, weight: 300, family: "Manrope" },
                generateLabels: (chart: ChartJS) => {
                  return chart.data.datasets.map((dataset: any, i: number) => ({
                    text: dataset.label,
                    fillStyle: dataset.borderColor,
                    strokeStyle: dataset.borderColor,
                    lineWidth: 2,
                    datasetIndex: i,
                    fontColor: dataset.hidden
                      ? hexToRgba("#333b69", 0.3)
                      : "#333b69",
                  }));
                },
              },
              title: {
                display: true,
                text: "SASB Pillar",
                padding: { bottom: 10 },
                font: { size: 14, weight: 300, family: "Manrope" },
                color: "#333b69",
              },
              onClick: (
                e: ChartEvent,
                legendItem: LegendItem,
                legend: LegendElement<"line">,
              ) => {
                const chart = legend.chart;
                const datasetIndex = legendItem.datasetIndex;
                if (datasetIndex === undefined) return;
                const dataset = chart.data.datasets[datasetIndex];
                dataset.hidden = !dataset.hidden;

                // Update colors based on visibility
                dataset.borderColor = dataset.hidden
                  ? hexToRgba(
                      typeof dataset.borderColor === "string"
                        ? dataset.borderColor
                        : "#000000",
                      0.3,
                    )
                  : lines[datasetIndex].stroke;
                dataset.backgroundColor = dataset.borderColor;

                chart.update();
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              title: { display: true, text: "Date" },
              grid: { display: false },
            },
            y: {
              title: { display: true, text: "Sentiment Score" },
            },
          },
        }}
      />
    </div>
  );
}

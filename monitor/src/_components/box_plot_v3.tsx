"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js/auto"; // Import core components
import {
  BoxPlotController,
  BoxAndWiskers,
} from "@sgratzl/chartjs-chart-boxplot"; // Import boxplot plugin
import { Chart } from "react-chartjs-2";

// Register Chart.js components and the boxplot plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BoxPlotController,
  BoxAndWiskers,
);

// Sample data for box plots
const data = {
  labels: ["Jan"], // X-axis labels
  datasets: [
    {
      label: "Box Plot 1",
      data: [
        [10, 15, 20, 25, 30], // Jan: min, q1, median, q3, max
        [8, 12, 18, 22, 28], // Feb
        [5, 10, 15, 20, 25], // Mar
      ],
      backgroundColor: "rgba(136, 132, 216, 0.5)", // Box fill
      borderColor: "#8884d8",
      borderWidth: 1,
      outlierColor: "#ff0000", // Outliers in red
      padding: 10, // Space around boxes
    },
    {
      label: "Box Plot 2",
      data: [
        [12, 18, 22, 27, 35], // Jan
        [10, 14, 20, 25, 30], // Feb
        [7, 12, 18, 23, 28], // Mar
      ],
      backgroundColor: "rgba(130, 202, 157, 0.5)", // Different color
      borderColor: "#82ca9d",
      borderWidth: 1,
      outlierColor: "#ff0000",
      padding: 10,
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const, // Legend on top
      onClick: (e: any, legendItem: any, legend: any) => {
        // Default toggle behavior
        const index = legendItem.datasetIndex;
        const ci = legend.chart;
        const meta = ci.getDatasetMeta(index);
        meta.hidden =
          meta.hidden === null ? !ci.data.datasets[index].hidden : null;
        ci.update();
      },
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const { dataset, dataIndex } = context;
          const values = dataset.data[dataIndex];
          return `${dataset.label}: Min: ${values[0]}, Q1: ${values[1]}, Median: ${values[2]}, Q3: ${values[3]}, Max: ${values[4]}`;
        },
      },
    },
    title: {
      display: true,
      text: "Box Plots with Toggle",
    },
  },
  scales: {
    y: {
      title: { display: true, text: "Value" },
    },
    x: {
      title: { display: true, text: "Month" },
    },
  },
};

export default function ChartJsBoxPlot() {
  return (
    <div className="bg-white rounded-lg shadow-md h-96">
      <Chart
        type="boxplot" // Use the boxplot type from the plugin
        data={data}
        options={options}
        height={400} // Match container height
      />
    </div>
  );
}

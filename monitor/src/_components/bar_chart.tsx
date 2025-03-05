"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components for bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor?: string;
      borderWidth?: number;
    }[];
  };
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Fit container height
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Categories",
        },
      },
      y: {
        title: {
          display: true,
          text: "Score (%)",
        },
        beginAtZero: true,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};
// TODO: EXPORT colors as variables to be able to use them in other parts where tailwind is not available
export const ExampleBarChart: React.FC = () => {
  const chartData = {
    labels: ["Poor", "Low", "Average", "Good", "Excellent"], // Categories
    datasets: [
      {
        label: "Universe",
        data: [10, 20, 30, 40, 50], // Made-up data
        // backgroundColor: 'rgba(75, 192, 192, 0.6)', // Teal
        // borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: "#848484",
        borderWidth: 1,
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Country",
        data: [15, 25, 35, 45, 55], // Made-up data
        backgroundColor: "#A3AED0", // Yellow
        borderWidth: 1,
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Company",
        data: [20, 30, 40, 50, 60], // Made-up data
        backgroundColor: "#AB3ED8", // Purple
        borderWidth: 1,
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  };

  return <BarChart data={chartData} />;
};

export default ExampleBarChart;

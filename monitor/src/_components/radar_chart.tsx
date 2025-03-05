'use client';

import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Register ChartJS components for radar chart
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
}

export const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to fit container height
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        // position: 'top' as const,
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full h-full p-4 bg-white rounded-lg shadow-md">
      <Radar data={data} options={options} />
    </div>
  );
};

export const ExampleRadarChart: React.FC = () => {
  const chartData = {
    labels: [
      'Environment',
      'Social Capital',
      'Human Capital',
      'Business Model & Innovation',
      'Leadership & Governance',
      'Others',
    ],
    datasets: [
      {
        // label: 'Company ESG Performance',
        data: [75, 60, 85, 50, 70, 45],
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderColor: 'rgb(34, 40, 197)',
        borderWidth: 2,
      },
    ],
  };

  return <RadarChart data={chartData} />;
};

export default ExampleRadarChart;
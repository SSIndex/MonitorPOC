"use client";

import React, { useMemo } from "react";

interface GaugeChartProps {
  score: number;
  scoreText: string;
  minValue?: number;
  maxValue?: number;
  labels?: React.ReactNode[];
  scoreLabels?: React.ReactNode[];
}

// Utility function to categorize score to Tailwind text color class
const categorizeScoreToTextClassName = (score: number): string => {
  if (score < 20) return "text-ssindex-poor";
  if (score < 40) return "text-ssindex-low";
  if (score < 60) return "text-ssindex-average";
  if (score < 80) return "text-ssindex-good";
  return "text-ssindex-excellent";
};

// GaugeChart Component
export const GaugeChart: React.FC<GaugeChartProps> = ({
  score,
  scoreText,
  minValue = 0,
  maxValue = 100,
  labels,
  scoreLabels,
}) => {
  // Default labels and score labels
  const DEFAULT_LABELS = useMemo(
    () => [
      <b key="poor" className="text-ssindex-poor">
        Poor
      </b>,
      <b key="low" className="text-ssindex-low">
        Low
      </b>,
      <b key="average" className="text-ssindex-average">
        Average
      </b>,
      <b key="good" className="text-ssindex-good">
        Good
      </b>,
      <b key="excellent" className="text-ssindex-excellent">
        Excellent
      </b>,
    ],
    [],
  );

  const DEFAULT_SCORE_LABELS = useMemo(
    () => [
      <p key="0-19" className="text-secondary text-sm">
        [0-19]
      </p>,
      <p key="20-39" className="text-secondary text-sm">
        [20-39]
      </p>,
      <p key="40-59" className="text-secondary text-sm">
        [40-59]
      </p>,
      <p key="60-79" className="text-secondary text-sm">
        [60-79]
      </p>,
      <p key="80-100" className="text-secondary text-sm">
        [80-100]
      </p>,
    ],
    [],
  );

  // Use custom labels if provided, otherwise fallback to defaults
  const textLabels = labels || DEFAULT_LABELS;
  const finalScoreLabels = scoreLabels || DEFAULT_SCORE_LABELS;

  // Calculate the percentage position of the score along the bar, clamped between 0 and 100
  const calculatePosition = (): number => {
    const position = ((score - minValue) / (maxValue - minValue)) * 100;
    return Math.max(0, Math.min(100, position)); // Clamp between 0 and 100
  };

  // Render the score text with dynamic class based on score
  const renderScoreText = useMemo(() => {
    const textClassName = categorizeScoreToTextClassName(score);
    return <b className={`${textClassName} text-2xl`}>{scoreText}</b>;
  }, [score, scoreText]);

  // Render score display (numeric score and descriptive text)
  const renderScoreDisplay = () => (
    <div className="flex justify-between items-center">
      <p className="m-0">
        <span className={"text-4xl font-bold text-primary"}>{score}</span>
        <span className="text-gray-500 text-l"> / {maxValue}</span>
      </p>
      {renderScoreText}
    </div>
  );

  // Render labels (above or below gradient bar)
  const renderLabels = (labelList: React.ReactNode[]) => (
    <div className="flex justify-between w-full mt-5">
      {labelList.map((label, index) => (
        <span key={index} className="text-center flex-1">
          {label}
        </span>
      ))}
    </div>
  );

  // Render gradient bar with score marker
  const renderGradientBar = () => {
    const scorePosition = calculatePosition();
    return (
      <div className="w-full relative mt-4 mb-4">
        {/* Gradient Bar */}
        <div className="w-full h-6 rounded-full bg-gradient-to-r from-ssindex-poor via-ssindex-average to-ssindex-excellent" />
        {/* Score Marker */}
        <div
          className="absolute border-4 border-black bg-white rounded-full"
          style={{
            top: "-3px",
            left: `${scorePosition}%`,
            transform: "translateX(-50%)",
            width: "32px",
            height: "32px",
          }}
        />
      </div>
    );
  };

  // Main render
  return (
    <div className="p-7">
      {renderScoreDisplay()}
      {renderLabels(textLabels)}
      {renderGradientBar()}
      {renderLabels(finalScoreLabels)}
    </div>
  );
};

// Example usage
const ExampleGaugeChart: React.FC = () => (
  <GaugeChart score={65} scoreText="Good" minValue={0} maxValue={100} />
);

export default ExampleGaugeChart;

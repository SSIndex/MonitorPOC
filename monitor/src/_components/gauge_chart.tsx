'use client';

import React, { useMemo } from 'react';

// Props interface for TypeScript typing
interface GaugeChartProps {
  score: number;
  scoreText: string; // e.g., "Poor", "Low", "Average", "Good", "Excellent"
  minValue?: number;
  maxValue?: number;
  labels?: React.ReactNode[]; // Custom labels for score ranges
  scoreLabels?: React.ReactNode[]; // Custom score range labels (e.g., "[0-19]")
}

// Utility function to categorize score to Tailwind text color class
const categorizeScoreToTextClassName = (score: number): string => {
  if (score < 20) return 'text-red-600'; // Poor
  if (score < 40) return 'text-orange-500'; // Low
  if (score < 60) return 'text-yellow-500'; // Average
  if (score < 80) return 'text-green-600'; // Good
  return 'text-blue-600'; // Excellent
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
      <b key="poor" className="text-red-600">Poor</b>,
      <b key="low" className="text-orange-500">Low</b>,
      <b key="average" className="text-yellow-500">Average</b>,
      <b key="good" className="text-green-600">Good</b>,
      <b key="excellent" className="text-blue-600">Excellent</b>,
    ],
    []
  );

  const DEFAULT_SCORE_LABELS = useMemo(
    () => [
      <p key="0-19" className="text-gray-500 text-sm">[0-19]</p>,
      <p key="20-39" className="text-gray-500 text-sm">[20-39]</p>,
      <p key="40-59" className="text-gray-500 text-sm">[40-59]</p>,
      <p key="60-79" className="text-gray-500 text-sm">[60-79]</p>,
      <p key="80-100" className="text-gray-500 text-sm">[80-100]</p>,
    ],
    []
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
    <div className="flex justify-between items-center p-3">
      <div className="text-blue-600">
        <p className="m-0">
          <span className="text-5xl font-bold">{score}</span>
          <span className="text-gray-500 text-2xl"> / {maxValue}</span>
        </p>
      </div>
      <div className="text-blue-600">
        {renderScoreText}
      </div>
    </div>
  );

  // Render labels (above or below gradient bar)
  const renderLabels = (labelList: React.ReactNode[]) => (
    <div className="flex justify-between w-full px-2">
      {labelList.map((label, index) => (
        <span key={index} className="text-center flex-1">{label}</span>
      ))}
    </div>
  );

  // Render gradient bar with score marker
  const renderGradientBar = () => {
    const scorePosition = calculatePosition();
    return (
      <div className="w-full relative mt-4 mb-4">
        {/* Gradient Bar */}
        <div
          className="w-full h-6 rounded-full"
          style={{
            background: 'linear-gradient(to right, #ff4d4f, #ffeb3b 50%, #2196f3)',
          }}
        />
        {/* Score Marker */}
        <div
          className="absolute border-4 border-gray-800 bg-white rounded-full"
          style={{
            top: '-12px', // Adjusted to sit above the thicker bar
            left: `${scorePosition}%`,
            transform: 'translateX(-50%)',
            width: '32px',
            height: '32px',
          }}
        />
      </div>
    );
  };

  // Main render
  return (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
      {renderScoreDisplay()}
      {renderLabels(textLabels)}
      {renderGradientBar()}
      {renderLabels(finalScoreLabels)}
    </div>
  );
};

// Example usage
const ExampleGaugeChart: React.FC = () => (
  <GaugeChart
    score={65}
    scoreText="Good"
    minValue={0}
    maxValue={100}
  />
);

export default ExampleGaugeChart;
"use client";
import { useState } from "react";

interface TimeRangeSelectorProps {
  onSelect: (range: string) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ onSelect }) => {
  const [selectedRange, setSelectedRange] = useState("1 year");

  const timeRanges = [
    "Yesterday",
    "5 days",
    "1 month",
    "3 months",
    "6 months",
    "1 year",
  ];

  const handleSelect = (range: string) => {
    setSelectedRange(range);
    onSelect(range);
  };

  return (
    <div className="flex justify-center gap-2">
      {timeRanges.map((range) => (
        <button
          key={range}
          className={`px-4 py-2 rounded-lg border ${
            selectedRange === range
              ? "bg-primary text-white"
              : "bg-white text-primary border-primary"
          } hover:bg-primary hover:text-white transition`}
          onClick={() => handleSelect(range)}
        >
          {range}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;

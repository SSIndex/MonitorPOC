"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Custom Legend component with title
const CustomLegend = ({
  lines,
  onClick,
  activeLines,
}: {
  lines: typeof lines;
  onClick: (e: any) => void;
  activeLines: string[];
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingLeft: "20px",
      }}
    >
      <span className="text-primary mb-4 text-sm">SASB Pillar</span>
      {lines.map((line) => (
        <div
          key={line.dataKey}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginBottom: "5px",
            opacity: activeLines.includes(line.dataKey) ? 1 : 0.3, // Dim inactive lines
          }}
          onClick={() => onClick({ dataKey: line.dataKey })}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: line.stroke,
              marginRight: "5px",
            }}
          />
          <span className="text-xs">{line.name}</span>
        </div>
      ))}
    </div>
  );
};

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

export default function TimeTrendsLineChart() {
  const [activeLines, setActiveLines] = useState<string[]>(["totalScore"]);

  // Handle legend click to toggle lines
  const handleLegendClick = (e: any) => {
    const clickedDataKey = e.dataKey;
    // setActiveLines((prev) => (prev === clickedDataKey ? "" : clickedDataKey));
    setActiveLines((prev) =>
      prev.includes(clickedDataKey)
        ? prev.filter((line) => line !== clickedDataKey)
        : [...prev, clickedDataKey],
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ left: 20, right: 20 }}
        //   margin={{right: 20, left: 0 }}
      >
        {lines.map((line) =>
          activeLines.includes(line.dataKey) ? (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              name={line.name}
            />
          ) : null,
        )}
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis
          label={{
            value: "Sentiment Score",
            angle: -90,
            //   position: "insideLeft", // Positions it inside the chart, to the left of the axis
            //   offset: 10, // Adds spacing between the label and the axis
            dx: -40, // Moves it further left to avoid overlap
          }}
        />
        <Tooltip />
        {/* <Legend
          layout="vertical" // Vertical layout for right side
          align="right" // Position on the right
          verticalAlign="middle" // Center vertically
          onClick={(e) => console.log(e)} // Toggle line visibility
          wrapperStyle={{ paddingLeft: 20 }} // Add padding for spacing
        /> */}
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="top"
          content={(props) => (
            <CustomLegend
              lines={lines}
              onClick={(e) => handleLegendClick(e)}
              activeLines={activeLines}
            />
          )}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

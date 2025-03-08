"use client";

import Plot from "react-plotly.js";

export default function PlotlyBoxPlot() {
  return (
    <Plot
      data={[
        {
          y: [10, 15, 13, 17, 22, 28, 30, 25, 20, 18], // Raw data for one box
          type: "box",
          name: "Jan", // Label for the box
          marker: { color: "#8884d8" }, // Color of outliers and median
          boxpoints: "outliers", // Show outliers
          jitter: 0.3, // Spread outliers for visibility
          pointpos: -1.8, // Position outliers relative to the box
        },
        {
          y: [8, 12, 15, 14, 18, 20, 22, 19, 16, 28], // Raw data for another box
          type: "box",
          name: "Feb",
          marker: { color: "#82ca9d" },
          boxpoints: "outliers",
          jitter: 0.3,
          pointpos: -1.8,
        },
        {
          y: [5, 7, 10, 12, 15, 18, 20, 17, 14, 25], // Raw data for a third box
          type: "box",
          name: "Mar",
          marker: { color: "#ff7300" },
          boxpoints: "outliers",
          jitter: 0.3,
          pointpos: -1.8,
        },
      ]}
      layout={{
        width: 600, // Adjust width
        height: 400, // Adjust height
        title: { text: "Simple Boxplot" },
        yaxis: { title: "Value" }, // Y-axis label
        xaxis: { title: "Month" }, // X-axis label
        boxmode: "group", // Align boxes side by side
      }}
      config={{ responsive: true }} // Make it responsive
    />
  );
}

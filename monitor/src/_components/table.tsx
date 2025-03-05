"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";

// Utility function to categorize score to Tailwind text color class
export const categorizeScoreToBgClassName = (score: number): string => {
  if (score < 20) return "bg-ssindex-poor";
  if (score < 40) return "bg-ssindex-low";
  if (score < 60) return "bg-ssindex-average";
  if (score < 80) return "bg-ssindex-good";
  return "bg-ssindex-excellent";
};

// Sample data for the parent table (ESG Dimensions)
const dimensionData = [
  {
    id: 1,
    dimension: "ENVIRONMENT",
    noData: false,
    poor: false,
    low: false,
    average: false,
    good: true, // Score 62 falls in 60-79%
    excellent: false,
    score: 62,
    percentile: 75,
    orders: [
      { orderId: "O1", item: "Laptop", price: 1200 },
      { orderId: "O2", item: "Mouse", price: 25 },
    ],
  },
  {
    id: 2,
    dimension: "SOCIAL CAPITAL",
    noData: false,
    poor: false,
    low: false,
    average: true, // Score 45 falls in 40-59%
    good: false,
    excellent: false,
    score: 45,
    percentile: 60,
    orders: [{ orderId: "O3", item: "Monitor", price: 300 }],
  },
  {
    id: 3,
    dimension: "HUMAN CAPITAL",
    noData: false,
    poor: false,
    low: false,
    average: false,
    good: true, // Score 78 falls in 60-79%
    excellent: false,
    score: 78,
    percentile: 85,
    orders: [
      { orderId: "O4", item: "Keyboard", price: 50 },
      { orderId: "O5", item: "Headphones", price: 100 },
    ],
  },
  {
    id: 4,
    dimension: "LEADERSHIP & GOVERNANCE",
    noData: false,
    poor: false,
    low: true, // Score 35 falls in 20-39%
    average: false,
    good: false,
    excellent: false,
    score: 35,
    percentile: 50,
    orders: [
      { orderId: "O6", item: "Chair", price: 150 },
      { orderId: "O7", item: "Table", price: 200 },
    ],
  },
  {
    id: 5,
    dimension: "OTHERS",
    noData: false,
    poor: false,
    low: true, // Score 35 falls in 20-39%
    average: false,
    good: false,
    excellent: false,
    score: 35,
    percentile: 50,
    orders: [
      { orderId: "O6", item: "Chair", price: 150 },
      { orderId: "O7", item: "Table", price: 200 },
    ],
  },
];

// Columns for the parent table
const dimensionColumns = [
  { header: "#", accessorKey: "id" },
  { header: "Dimension", accessorKey: "dimension" },
  {
    header: (
      <div>
        <p className="text-ssindex-graph-grey">No Data</p>
      </div>
    ),
    accessorKey: "noData",
  },
  {
    header: (
      <div>
        <p className="text-ssindex-poor">Poor</p>
        <p className="text-dark text-xs font-normal">0-19%</p>
      </div>
    ),
    accessorKey: "poor",
  },
  {
    header: (
      <div>
        <p className="text-ssindex-low">Low</p>
        <p className="text-dark text-xs font-normal">20-39%</p>
      </div>
    ),
    accessorKey: "low",
  },
  {
    header: (
      <div>
        <p className="text-ssindex-average">Average</p>
        <p className="text-dark text-xs font-normal">40-59%</p>
      </div>
    ),
    accessorKey: "average",
  },
  {
    header: (
      <div>
        <p className="text-ssindex-good">Good</p>
        <p className="text-dark text-xs font-normal">60-79%</p>
      </div>
    ),
    accessorKey: "good",
  },
  {
    header: (
      <div>
        <p className="text-ssindex-excellent">Excellent</p>
        <p className="text-dark text-xs font-normal">80-100%</p>
      </div>
    ),
    accessorKey: "excellent",
  },
  {
    header: (
      <div>
        <p className="text-dark">Score</p>
      </div>
    ),
    accessorKey: "score",
  },
  {
    header: (
      <div>
        <p className="text-dark">Percentile</p>
        <p className="text-dark text-xs font-normal">Industry, Country</p>
      </div>
    ),
    accessorKey: "percentile",
  },
];

// Main component with parent table
export function Table() {
  const table = useReactTable({
    data: dimensionData,
    columns: dimensionColumns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true, // All rows can expand
  });

  const totalScore = Math.round(
    dimensionData.reduce((sum, row) => sum + row.score, 0) /
      dimensionData.length
  );
  const totalPercentile = Math.round(
    dimensionData.reduce((sum, row) => sum + row.percentile, 0) /
      dimensionData.length
  );

  return (
    <table className="table-fixed w-full border-collapse">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, i) => {
              if (i === 0) {
                return (
                  <th
                    key={header.id}
                    className="bg-ssindex-table-header-gray text-primary rounded-l-lg w-10"
                    style={{ padding: "8px", textAlign: "center" }}
                  >
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                  </th>
                );
              }

              if (i === 1) {
                return (
                  <th
                    key={header.id}
                    className="bg-ssindex-table-header-gray text-primary w-50"
                    style={{ padding: "8px", textAlign: "left" }}
                  >
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                  </th>
                );
              } else if (i === headerGroup.headers.length - 1) {
                return (
                  <th
                    key={header.id}
                    className="bg-ssindex-table-header-gray text-primary rounded-r-lg"
                    style={{ padding: "8px", textAlign: "center" }}
                  >
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                  </th>
                );
              } else {
                return (
                  <th
                    key={header.id}
                    className="bg-ssindex-table-header-gray text-primary"
                    style={{ padding: "8px", textAlign: "center" }}
                  >
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                  </th>
                );
              }
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <tr
              onClick={row.getToggleExpandedHandler()}
              className={`hover:bg-neutral-200 ${row.getIsExpanded() ? "bg-neutral-200" : "bg-white"}`}
              // style={{ cursor: 'pointer', background: row.getIsExpanded() ? '#f0f0f0' : 'white' }}
            >
              {row.getVisibleCells().map((cell, i) => {
                console.log("cell", cell);
                console.log("cell.column.id", cell.column.id);
                const columnId = cell.column.id;

                const value = cell.getValue();
                const commonClasses =
                  "pt-5 pb-5 ps-1 pe-1 text-primary h-20 text-center";
                let backgroundColor = "";
                // if value is number, categorize it
                if (
                  [
                    "noData",
                    "poor",
                    "low",
                    "average",
                    "good",
                    "excellent",
                    "score",
                    "percentile",
                  ].includes(columnId)
                ) {
                  if (columnId === "noData") {
                    backgroundColor = "bg-ssindex-no-data";
                  } else {
                    backgroundColor = `${categorizeScoreToBgClassName(value)}`;
                  }
                }
                const opacityClass = (value as boolean)
                  ? "opacity-100"
                  : "opacity-30";
                const coloredCells = [
                  "noData",
                  "poor",
                  "low",
                  "average",
                  "good",
                  "excellent",
                ];

                if (coloredCells.includes(columnId)) {
                  // Determine background color based on columnId
                  switch (columnId) {
                    case "noData":
                      backgroundColor = "bg-ssindex-no-data";
                      break;
                    case "poor":
                      backgroundColor = "bg-ssindex-poor";
                      break;
                    case "low":
                      backgroundColor = "bg-ssindex-low";
                      break;
                    case "average":
                      backgroundColor = "bg-ssindex-average";
                      break;
                    case "good":
                      backgroundColor = "bg-ssindex-good";
                      break;
                    case "excellent":
                      backgroundColor = "bg-ssindex-excellent";
                      break;
                  }
                }

                if (coloredCells.includes(columnId)) {
                  return (
                    <td
                      key={cell.id}
                      className={`${commonClasses} ${i === 1 ? "text-left" : "text-center"}`}
                    >
                      <div
                        className={`${backgroundColor} ${opacityClass} flex align-items-center border-3 border-dark  w-full h-full`}
                      >
                        {"\u200B"}
                      </div>
                    </td>
                  );
                }

                switch (columnId) {
                  case "score":
                    return (
                      <td
                        key={cell.id}
                        className={`${commonClasses} text-white font-bold ${i === 1 ? "text-left" : "text-center"}`}
                      >
                        <div
                          className={`${backgroundColor} rounded-sm w-full h-full flex items-center justify-center`}
                        >
                          {`${value}%`}
                        </div>
                      </td>
                    );
                  case "percentile":
                    return (
                      <td
                        key={cell.id}
                        className={`${commonClasses} text-white font-bold ${i === 1 ? "text-left" : "text-center"}`}
                      >
                        <div
                          className={`${backgroundColor} rounded-sm w-full h-full flex items-center justify-center`}
                        >
                          {`${value}th`}
                        </div>
                      </td>
                    );
                  default:
                    return (
                      <td
                        key={cell.id}
                        className={`${commonClasses} text-primary ${i === 1 ? "text-left" : "text-center"}`}
                      >
                        <div className={`${backgroundColor} w-full h-full `}>
                          {value}
                        </div>
                      </td>
                    );
                }
              })}
            </tr>
            {row.getIsExpanded() && (
              <tr>
                <td
                  colSpan={row.getVisibleCells().length}
                  style={{ padding: "0" }}
                >
                  <NestedOrderTable orders={row.original.orders} />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}

        {/* Footer Row */}
        <tr className="border-t-1 font-bold border-gray-300">
          <td className="pt-5 pb-5 ps-1 pe-1 text-primary h-20 text-center"></td>
          <td className="pt-5 pb-5 ps-1 pe-1 text-primary h-20 text-left">
            Total Score
          </td>
          <td className="pt-5 pb-5 ps-1 pe-1 text-primary h-20 text-center"></td>
          <td className="pt-5 pb-5 ps-1 pe-1 text-primary h-20 text-center"></td>
          <td className="pt-5 pb-5 ps-1 pe-1 text-primary h-20 text-center"></td>
          <td className="pt-5 pb-5 ps-1 pe-1 text-primary h-20 text-center"></td>
          <td className="pt-5 pb-5 ps-1 pe-1 text-primary h-20 text-center"></td>
          <td className="pt-5 pb-5 ps-1 pe-1 text-primary h-20 text-center"></td>
          <td className="pt-5 pb-5 ps-1 pe-1 text-primary h-20 text-center">
            <div
              className={`${categorizeScoreToBgClassName(totalScore)} rounded-sm w-full h-full flex items-center justify-center text-white`}
            >
              {`${totalScore}%`}
            </div>
          </td>
          <td className="pt-5 pb-5 ps-1 pe-1 text-primary h-20 text-center">
            <div
              className={`${categorizeScoreToBgClassName(totalPercentile)} rounded-sm w-full h-full flex items-center justify-center text-white`}
            >
              {`${totalPercentile}th`}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

// Nested table component for orders (unchanged)
function NestedOrderTable({ orders }) {
  const orderColumns = [
    { header: "Order ID", accessorKey: "orderId" },
    { header: "Item", accessorKey: "item" },
    { header: "Price ($)", accessorKey: "price" },
  ];

  const table = useReactTable({
    data: orders,
    columns: orderColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ padding: "10px", background: "#f9f9f9" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    border: "1px solid gray",
                    padding: "6px",
                    background: "#ddd",
                  }}
                >
                  {header.isPlaceholder ? null : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ border: "1px solid gray", padding: "6px" }}
                >
                  {cell.getValue()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  Header,
} from "@tanstack/react-table";
import { categorizeScoreToBgClassName } from "@/_utils/classNameUtils";

// Define types for table data
interface Order {
  orderId: string;
  item: string;
  price: number;
}

interface DimensionRow {
  id: number;
  dimension: string;
  noData: boolean;
  poor: boolean;
  low: boolean;
  average: boolean;
  good: boolean;
  excellent: boolean;
  score: number;
  percentile: number;
  orders: Order[];
}

// Sample data
const dimensionData: DimensionRow[] = [
  {
    id: 1,
    dimension: "ENVIRONMENT",
    noData: false,
    poor: false,
    low: false,
    average: false,
    good: true,
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
    average: true,
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
    good: true,
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
    low: true,
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
    low: true,
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

// Column definitions with proper typing
const dimensionColumns: ColumnDef<DimensionRow>[] = [
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

// Constants for common styles
const COMMON_CELL_CLASSES = "pt-5 pb-5 ps-1 pe-1 text-primary h-20";
const HEADER_BASE_CLASSES = "bg-ssindex-table-header-gray text-primary";
const COLORED_CELLS = ["noData", "poor", "low", "average", "good", "excellent"];

// Helper function to get background color based on column ID
const getBackgroundColorForColumn = (columnId: string): string => {
  switch (columnId) {
    case "noData":
      return "bg-ssindex-no-data";
    case "poor":
      return "bg-ssindex-poor";
    case "low":
      return "bg-ssindex-low";
    case "average":
      return "bg-ssindex-average";
    case "good":
      return "bg-ssindex-good";
    case "excellent":
      return "bg-ssindex-excellent";
    default:
      return "";
  }
};

// Main Table Component
export function Table() {
  const table = useReactTable({
    data: dimensionData,
    columns: dimensionColumns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });

  const totalScore = Math.round(
    dimensionData.reduce((sum, row) => sum + row.score, 0) /
      dimensionData.length,
  );
  const totalPercentile = Math.round(
    dimensionData.reduce((sum, row) => sum + row.percentile, 0) /
      dimensionData.length,
  );

  // Helper function to render header cells
  const renderHeaderCell = (
    header: Header<DimensionRow, unknown>,
    index: number,
  ) => {
    const isFirst = index === 0;
    const isSecond = index === 1;
    const isLast = index === table.getHeaderGroups()[0].headers.length - 1;
    const className = `${HEADER_BASE_CLASSES} ${isFirst ? "rounded-l-lg w-10" : ""} ${isSecond ? "w-50" : ""} ${isLast ? "rounded-r-lg" : ""}`;
    const textAlign = isSecond ? "text-left" : "text-center";

    return (
      <th
        key={header.id}
        className={`${className} ${textAlign}`}
        style={{ padding: "8px" }}
      >
        {header.isPlaceholder ? null : header.column.columnDef.header}
      </th>
    );
  };

  // Helper function to render data cells
  const renderDataCell = (cell: any, index: number) => {
    const columnId = cell.column.id;
    const value = cell.getValue() as string | number | boolean;
    const isSecondColumn = index === 1;
    const justifyAlignClass = isSecondColumn
      ? "justify-left"
      : "justify-center";

    if (COLORED_CELLS.includes(columnId)) {
      const backgroundColor = getBackgroundColorForColumn(columnId);
      const opacityClass = value ? "opacity-100" : "opacity-30";
      return (
        <td
          key={cell.id}
          className={`${COMMON_CELL_CLASSES} ${justifyAlignClass}`}
        >
          <div
            className={`${backgroundColor} ${opacityClass} border-3 border-dark w-full h-full flex items-center justify-center`}
          >
            {"\u200B"}
          </div>
        </td>
      );
    }

    let backgroundColor = "";
    if (["score", "percentile"].includes(columnId)) {
      backgroundColor = categorizeScoreToBgClassName(Number(value));
    }

    switch (columnId) {
      case "score":
      case "percentile":
        return (
          <td
            key={cell.id}
            className={`${COMMON_CELL_CLASSES} text-white font-bold`}
          >
            <div
              className={`${backgroundColor} rounded-sm w-full h-full flex ${justifyAlignClass} items-center`}
            >
              {columnId === "score" ? `${value}%` : `${value}th`}
            </div>
          </td>
        );
      default:
        return (
          <td key={cell.id} className={`${COMMON_CELL_CLASSES}`}>
            <div
              className={`${backgroundColor} w-full h-full flex ${justifyAlignClass} items-center`}
            >
              {value}
            </div>
          </td>
        );
    }
  };

  return (
    <table className="table-fixed w-full border-collapse">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, i) =>
              renderHeaderCell(header, i),
            )}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <tr
              onClick={row.getToggleExpandedHandler()}
              className={`hover:bg-neutral-200 ${row.getIsExpanded() ? "bg-neutral-200" : "bg-white"}`}
            >
              {row.getVisibleCells().map((cell, i) => renderDataCell(cell, i))}
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
          <td className={COMMON_CELL_CLASSES}></td>
          <td className={`${COMMON_CELL_CLASSES} text-left`}>Total Score</td>
          <td className={COMMON_CELL_CLASSES}></td>
          <td className={COMMON_CELL_CLASSES}></td>
          <td className={COMMON_CELL_CLASSES}></td>
          <td className={COMMON_CELL_CLASSES}></td>
          <td className={COMMON_CELL_CLASSES}></td>
          <td className={COMMON_CELL_CLASSES}></td>
          <td className={`${COMMON_CELL_CLASSES} text-white font-bold`}>
            <div
              className={`${categorizeScoreToBgClassName(totalScore)} rounded-sm w-full h-full flex items-center justify-center`}
            >
              {`${totalScore}%`}
            </div>
          </td>
          <td className={`${COMMON_CELL_CLASSES} text-white font-bold`}>
            <div
              className={`${categorizeScoreToBgClassName(totalPercentile)} rounded-sm w-full h-full flex items-center justify-center`}
            >
              {`${totalPercentile}th`}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

// Nested Table Component
function NestedOrderTable({ orders }: { orders: Order[] }) {
  const orderColumns: ColumnDef<Order>[] = [
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

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
  scoreColor: number;
  percentileColor: number;
  orders: Order[];
}

// Constants for common styles
const COMMON_CELL_CLASSES = "pt-5 pb-5 ps-1 pe-1 text-primary h-20";
const HEADER_BASE_CLASSES =
  "bg-ssindex-table-header-gray text-primary ps-4 pe-4";
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

interface TableProps {
  data?: DimensionRow[];
  columns?: ColumnDef<DimensionRow>[];
  backgroundColor?: string;
  centerSecondLeft?: boolean;
  footerData?: any;
  footerWhiteSpaceBetween?: number;
}

// Main Table Component
export function Table({
  data,
  columns,
  backgroundColor = "bg-white",
  centerSecondLeft = false,
  footerData,
}: TableProps) {
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });

  // Helper function to render header cells
  const renderHeaderCell = (
    header: Header<DimensionRow, unknown>,
    index: number,
  ) => {
    const isFirst = index === 0;
    const isSecond = index === 1 && centerSecondLeft;
    const isLast = index === table.getHeaderGroups()[0].headers.length - 1;
    const className = `${HEADER_BASE_CLASSES} ${isFirst ? "rounded-l-lg" : ""} ${isFirst && centerSecondLeft && "w-10"} ${isSecond ? "w-50" : ""} ${isLast ? "rounded-r-lg" : ""}`;
    const textAlign = isSecond ? "text-left" : "text-center";

    return (
      <th key={header.id} className={`${className} ${textAlign}`}>
        {header.isPlaceholder ? null : header.column.columnDef.header}
      </th>
    );
  };

  // Helper function to render data cells
  const renderDataCell = (cell: any, index: number) => {
    const columnId = cell.column.id;
    const value = cell.getValue() as string | number | boolean;
    const isSecondColumn = index === 1 && centerSecondLeft;
    const justifyAlignClass = isSecondColumn
      ? "justify-left text-left"
      : "justify-center text-center";

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
    if (["scoreColor", "percentileColor"].includes(columnId)) {
      backgroundColor = categorizeScoreToBgClassName(Number(value));
    }

    switch (columnId) {
      case "scoreColor":
      case "percentileColor":
        return (
          <td
            key={cell.id}
            className={`${COMMON_CELL_CLASSES} text-white font-bold`}
          >
            <div
              className={`${backgroundColor} rounded-sm w-full h-full flex ${justifyAlignClass} items-center`}
            >
              {columnId === "scoreColor" ? `${value}%` : `${value}th`}
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

  const renderFooterRow = (footerData: {
    [key: string]: string | number | null;
  }) => {
    // Map footerData keys to table cells
    const footerCells = Object.keys(footerData).map((key, index) => {
      let value = footerData[key];
      console.log(`Key: ${key}, Value: ${value}`);

      // Convert null to empty string for rendering
      if (value === null) {
        value = "";
      }

      const textAlignClass =
        index === 1 ? "text-left justify-left" : "text-center justify-center"; // Left-align "dimension" (index 1)
      const commonClasses = `${COMMON_CELL_CLASSES} ${textAlignClass}`;

      // Special handling for specific columns
      if (key === "dimension") {
        return (
          <td key={key} className={`${commonClasses} text-black`}>
            <div className="w-full h-full flex items-center justify-start">
              {value}
            </div>
          </td>
        );
      }

      if (key === "scoreColor") {
        return (
          <td key={key} className={`${commonClasses} text-white font-bold`}>
            <div
              className={`${categorizeScoreToBgClassName(Number(value))} rounded-sm w-full h-full flex items-center justify-center`}
            >
              {`${value}%`}
            </div>
          </td>
        );
      }

      if (key === "percentileColor") {
        return (
          <td key={key} className={`${commonClasses} text-white font-bold`}>
            <div
              className={`${categorizeScoreToBgClassName(Number(value))} rounded-sm w-full h-full flex items-center justify-center`}
            >
              {`${value}th`}
            </div>
          </td>
        );
      }

      // Default case for other columns (id, noData, poor, low, average, good, excellent)
      return (
        <td key={key} className={commonClasses}>
          <div className="w-full h-full flex items-center justify-center">
            {value}
          </div>
        </td>
      );
    });

    return (
      <tr className="border-t-1 font-bold border-gray-300">{footerCells}</tr>
    );
  };

  return (
    <div className={`${backgroundColor} pt-10 ps-4 pe-4 rounded-md`}>
      <table
        className={`table-fixed w-full border-collapse ${backgroundColor} pt-3`}
      >
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
                className={`hover:bg-neutral-200 ${row.getIsExpanded() ? "bg-neutral-200" : backgroundColor}`}
              >
                {row
                  .getVisibleCells()
                  .map((cell, i) => renderDataCell(cell, i))}
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
          {footerData && renderFooterRow(footerData)}
        </tbody>
      </table>
    </div>
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

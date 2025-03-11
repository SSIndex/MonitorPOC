"use client";

import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  Header,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { categorizeScoreToBgClassName } from "@/_utils/classNameUtils";

// Constants
const COMMON_CELL_CLASSES = "pt-5 pb-5 ps-1 pe-1 text-primary h-20";
const HEADER_BASE_CLASSES = "text-primary ps-4 pe-4";
const COLORED_CELLS = ["noData", "poor", "low", "average", "good", "excellent"];

// Helper Functions
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

const getHeaderColor = (
  backgroundColor: string,
  headerBackgroundColor?: string,
): string => {
  return (
    headerBackgroundColor ||
    (backgroundColor === "bg-white"
      ? "bg-ssindex-table-header-gray"
      : "bg-white")
  );
};

// Interfaces
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
  nestedData?: DimensionRow[] | any[];
}

interface FooterData {
  id?: string | number | null;
  dimension?: string | number | null;
  noData?: string | number | null;
  poor?: string | number | null;
  low?: string | number | null;
  average?: string | number | null;
  good?: string | number | null;
  excellent?: string | number | null;
  scoreColor?: string | number | null;
  percentileColor?: string | number | null;
}

interface TableProps {
  data: DimensionRow[];
  columns: ColumnDef<DimensionRow>[];
  backgroundColor?: string;
  headerBackgroundColor?: string;
  centerSecondLeft?: boolean;
  footerData?: FooterData;
  nestedColumns?: ColumnDef<any>[];
  nestedSortColumn?: string;
  nestedSortDirection?: "asc" | "desc";
  isNested?: boolean; // Indicates if this is a nested table (limits recursion)
}

// Main Table Component
export function Table({
  data,
  columns,
  backgroundColor = "bg-white",
  headerBackgroundColor,
  centerSecondLeft = false,
  footerData,
  nestedColumns,
  nestedSortColumn,
  nestedSortDirection,
  isNested = false,
}: TableProps) {
  const [sorting, setSorting] = React.useState<SortingState>(
    nestedSortColumn && nestedSortDirection
      ? [{ id: nestedSortColumn, desc: nestedSortDirection === "desc" }]
      : [],
  );

  const headerColor = getHeaderColor(backgroundColor, headerBackgroundColor);
  const headerClasses = `${HEADER_BASE_CLASSES} ${headerColor}`;

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => !isNested, // Disable expansion for nested tables
  });

  const arrowComponent: Record<"asc" | "desc", React.ReactElement> = {
    asc: <ChevronUpIcon className="h-4 w-4" data-testid="asc-icon" />,
    desc: <ChevronDownIcon className="h-4 w-4" data-testid="desc-icon" />,
  };

  const renderHeaderCell = (
    header: Header<DimensionRow, unknown>,
    index: number,
  ) => {
    const isFirst = index === 0;
    const isSecond = index === 1 && centerSecondLeft;
    const isLast = index === table.getHeaderGroups()[0].headers.length - 1;
    const className = `${headerClasses} ${isFirst ? "rounded-l-lg" : ""} ${isFirst && centerSecondLeft ? "w-10" : ""} ${isSecond ? "w-50" : ""} ${isLast ? "rounded-r-lg" : ""}`;
    const textAlign = isSecond ? "text-left" : "text-center";

    const sortState = sorting.find((s) => s.id === header.id);
    const currentSort = sortState ? (sortState.desc ? "desc" : "asc") : "";

    return (
      <th key={header.id} className={`${className} ${textAlign}`}>
        <div className="flex items-center gap-2 justify-center">
          {flexRender(header.column.columnDef.header, header.getContext())}
          {currentSort && arrowComponent[currentSort]}
        </div>
      </th>
    );
  };

  const renderDataCell = (cell: any, index: number) => {
    const columnId = cell.column.id;
    const value = cell.getValue() as string | number | boolean;
    const isSecondColumn = index === 1 && centerSecondLeft;
    const alignClass = isSecondColumn
      ? "justify-start text-left"
      : "justify-center text-center";

    if (COLORED_CELLS.includes(columnId)) {
      const backgroundColor = getBackgroundColorForColumn(columnId);
      const opacityClass = value ? "opacity-100" : "opacity-30";
      return (
        <td key={cell.id} className={`${COMMON_CELL_CLASSES} ${alignClass}`}>
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
              className={`${backgroundColor} rounded-sm w-full h-full flex ${alignClass} items-center`}
            >
              {columnId === "scoreColor" ? `${value}%` : `${value}th`}
            </div>
          </td>
        );
      default:
        return (
          <td key={cell.id} className={`${COMMON_CELL_CLASSES}`}>
            <div
              className={`${backgroundColor} w-full h-full flex ${alignClass} items-center`}
            >
              {value}
            </div>
          </td>
        );
    }
  };

  const renderFooterRow = (footerData: FooterData) => {
    const footerCells = Object.keys(footerData).map((key, index) => {
      const value = footerData[key] ?? "";
      const alignClass =
        index === 1 ? "justify-start text-left" : "justify-center text-center";
      const commonClasses = `${COMMON_CELL_CLASSES} ${alignClass}`;

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

      return (
        <td key={key} className={commonClasses}>
          <div className="w-full h-full flex items-center justify-center">
            {value}
          </div>
        </td>
      );
    });

    return (
      <tr className="border-t border-gray-300 font-bold">{footerCells}</tr>
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
              {row.getIsExpanded() && row.original.nestedData && (
                <tr>
                  <td colSpan={row.getVisibleCells().length} className="p-0">
                    <div className="p-2 bg-gray-100">
                      <Table
                        data={row.original.nestedData as DimensionRow[]}
                        columns={nestedColumns || columns}
                        backgroundColor="bg-gray-100"
                        centerSecondLeft={false}
                        nestedSortColumn={nestedSortColumn}
                        nestedSortDirection={nestedSortDirection}
                        isNested={true} // Mark as nested to limit recursion
                      />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
          {footerData && renderFooterRow(footerData)}
        </tbody>
      </table>
    </div>
  );
}

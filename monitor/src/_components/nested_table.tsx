"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  SortingState,
  OnChangeFn,
  PaginationState,
} from "@tanstack/react-table";
import {
  getHeaderColor,
  HEADER_BASE_CLASSES,
  renderDataCell,
  renderHeaderCell,
} from "@/_utils/tableUtils";

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
  nestedData?: DimensionRow[];
  totalRows?: number;
}
interface NestedTableProps {
  data: DimensionRow[];
  columns: ColumnDef<DimensionRow>[];
  backgroundColor: string;
  nestedSorting?: SortingState;
  nestedOnSortingChange?: OnChangeFn<SortingState>;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  totalRows?: number;
}

export function NestedTable({
  data,
  columns,
  backgroundColor,
  nestedSorting,
  nestedOnSortingChange,
  pagination,
  onPaginationChange,
  totalRows,
}: NestedTableProps) {
  const headerColor = getHeaderColor(backgroundColor);
  const headerClasses = `${HEADER_BASE_CLASSES} ${headerColor}`;

  const table = useReactTable({
    data,
    columns,
    state: { sorting: nestedSorting, pagination },
    onSortingChange: nestedOnSortingChange,
    onPaginationChange: onPaginationChange,
    manualSorting: true,
    manualPagination: true,
    rowCount: totalRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => false, // No further nesting
  });

  return (
    <div className={`${backgroundColor} p-4`}>
      <table
        className={`table-fixed w-full border-collapse ${backgroundColor} pt-3`}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) =>
                renderHeaderCell(header, i, table, headerClasses, {
                  centerSecondLeft: false,
                  showSortIcons: true,
                })
              )}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row
                .getVisibleCells()
                .map((cell, i) => renderDataCell(cell, i, false))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center gap-2 pt-2 pb-2">
        <div>Page</div>
        <button
          className="bg-primary text-white rounded-md p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <span>
          {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount().toLocaleString()}
        </span>
        <button
          className="bg-primary text-white rounded-md p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

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
import { NestedTable } from "./nested_table";
import {
  renderFooterRow,
  renderDataCell,
  HEADER_BASE_CLASSES,
  getHeaderColor,
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
  nestedData?: DimensionRow[] | any[];
  totalRows?: number;
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
  rowCount?: number | null;
}

interface TableProps {
  data: DimensionRow[];
  columns: ColumnDef<DimensionRow>[];
  backgroundColor?: string;
  headerBackgroundColor?: string;
  centerSecondLeft?: boolean;
  footerData?: FooterData;
  nestedColumns?: ColumnDef<any>[];
  isNested?: boolean;
  nestedSorting?: SortingState;
  nestedOnSortingChange?: OnChangeFn<SortingState>;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  totalRows?: number;
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
  isNested = false,
  nestedSorting,
  nestedOnSortingChange,
  pagination,
  onPaginationChange,
  totalRows,
}: TableProps) {
  const headerColor = getHeaderColor(backgroundColor, headerBackgroundColor);
  const headerClasses = `${HEADER_BASE_CLASSES} ${headerColor}`;

  const table = useReactTable({
    data,
    columns,
    ...(isNested
      ? {
          state: { sorting: nestedSorting, pagination },
          onSortingChange: nestedOnSortingChange,
          onPaginationChange: onPaginationChange,
          manualSorting: true,
          manualPagination: true,
          rowCount: totalRows ?? data.length,
        }
      : {}),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => !isNested,
  });

  return (
    <div className={`${backgroundColor} p-4 rounded-md`}>
      <table
        className={`table-fixed w-full border-collapse ${backgroundColor} pt-3`}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) =>
                renderHeaderCell(header, i, table, headerClasses, {
                  centerSecondLeft: true,
                  showSortIcons: false,
                }),
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
                  .map((cell, i) => renderDataCell(cell, i, centerSecondLeft))}
              </tr>
              {row.getIsExpanded() && row.original.nestedData && (
                <tr>
                  <td colSpan={row.getVisibleCells().length} className="p-0">
                    <NestedTable
                      data={row.original.nestedData as DimensionRow[]}
                      columns={nestedColumns}
                      backgroundColor={
                        backgroundColor === "bg-white"
                          ? "bg-ssindex-nested-table-background"
                          : "bg-light"
                      }
                      nestedSorting={nestedSorting}
                      nestedOnSortingChange={nestedOnSortingChange}
                      pagination={pagination}
                      onPaginationChange={onPaginationChange}
                      totalRows={row.original.totalRows}
                    />
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

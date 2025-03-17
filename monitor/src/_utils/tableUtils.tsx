import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

import { categorizeScoreToBgClassName } from "@/_utils/scoreUtils";

import {
  ColumnDef,
  Header,
  flexRender,
  SortingState,
  OnChangeFn,
  PaginationState,
} from "@tanstack/react-table";

export const arrowComponent: Record<
  "asc" | "desc" | "default",
  React.ReactElement
> = {
  asc: <ChevronUpIcon className="h-4 w-4" data-testid="asc-icon" />,
  desc: <ChevronDownIcon className="h-4 w-4" data-testid="desc-icon" />,
  default: <ChevronUpDownIcon className="h-4 w-4" data-testid="other-icon" />,
};

// Constants
export const COMMON_CELL_CLASSES = "pt-5 pb-5 ps-1 pe-1 text-primary h-20";
export const HEADER_BASE_CLASSES = "text-primary ps-4 pe-4";
export const COLORED_CELLS = [
  "noData",
  "poor",
  "low",
  "average",
  "good",
  "excellent",
];

// Helper Functions
export const getBackgroundColorForColumn = (columnId: string): string => {
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

export const getHeaderColor = (
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

export const renderHeaderCell = (
  header: Header<DimensionRow, unknown>,
  index: number,
  table: any, // You might want to type this more specifically
  headerClasses: string,
  options: {
    centerSecondLeft?: boolean;
    showSortIcons?: boolean;
  } = {
    centerSecondLeft: true,
    showSortIcons: true,
  },
) => {
  const { centerSecondLeft = true, showSortIcons = true } = options;
  const isFirst = index === 0;
  const isSecond = index === 1 && centerSecondLeft;
  const isLast = index === table.getHeaderGroups()[0].headers.length - 1;

  const className = `${headerClasses} 
    ${isFirst ? "rounded-l-lg" : ""} 
    ${isFirst && centerSecondLeft ? "w-10" : ""} 
    ${isSecond ? "w-50" : ""} 
    ${isLast ? "rounded-r-lg" : ""}`;

  const textAlign = isSecond
    ? "text-left justify-start"
    : "text-center justify-center";

  const sortDirection =
    header.column.getIsSorted() === false
      ? "default"
      : (header.column.getIsSorted() as "asc" | "desc");

  return (
    <th key={header.id} className={className}>
      <div
        className={`flex items-center gap-2 ${textAlign}`}
        onClick={header.column.getToggleSortingHandler()}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {showSortIcons && arrowComponent[sortDirection]}
      </div>
    </th>
  );
};

export const renderDataCell = (cell: any, index: number, centerSecondLeft) => {
  const columnId = cell.column.id;
  const value = cell.getValue() as string | number | boolean;
  // const alignClass = "justify-center text-center";
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

export const renderFooterRow = (footerData: FooterData) => {
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

  return <tr className="border-t border-gray-300 font-bold">{footerCells}</tr>;
};

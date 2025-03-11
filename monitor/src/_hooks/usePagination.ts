"use client";

import { useState } from "react";

export const defaultPageSize = 10;

interface UsePaginationProps {
  defaultPageSize?: number;
  defaultPage?: number;
  defaultInitialSortColumn?: string;
  defaultSortDirection?: "asc" | "desc";
}

type SortOptions = "asc" | "desc";

interface PaginationStates {
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  page: number;
  setPage: (page: number) => void;
  search: string;
  setSearch: (search: string) => void;
  sortColumn: string;
  setSortColumn: (sort: string) => void;
  sortDirection: SortOptions;
  setSortDirection: (sortOptions: SortOptions) => void;
}

export const usePagination = ({
  defaultPageSize = 10,
  defaultPage = 1,
  defaultInitialSortColumn = "id",
  defaultSortDirection = "desc",
}: UsePaginationProps): PaginationStates => {
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [page, setPage] = useState(defaultPage);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState(defaultInitialSortColumn);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    defaultSortDirection,
  );
  return {
    pageSize,
    setPageSize,
    page,
    setPage,
    search,
    setSearch,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
  };
};

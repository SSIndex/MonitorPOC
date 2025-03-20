"use client";

import TimeTrendsLineChart from "@/_components/line_chart_chartjs";
import { NestedTable } from "@/_components/nested_table";
import { Table } from "@/_components/table";
import TimeRangeSelector from "@/_components/time_range_selector";
import { useGetSASBReviews } from "@/_handlers/requests/sasb";
import { useState } from "react";
import { dimensionColumns, subNestedColumns } from "@/_mocks/data";
import { transformToTableData } from "@/_utils/dataTransformations";

// Main General Analysis Page
export default function TimeTrendsAnalysis() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "review", desc: true },
  ]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const {
    data: reviews,
    error: reviewsError,
    isLoading: reviewsIsLoading,
  } = useGetSASBReviews(
    "Clínica MEDS",
    undefined,
    sorting[0]?.desc === true ? "desc" : "asc",
    sorting[0]?.id,
    pagination.pageIndex,
    pagination.pageSize,
  );

  if (reviewsIsLoading) return <div>Loading...</div>;
  if (reviewsError) return <div>Error: {reviewsError.message}</div>;

  // Put all reviews in the same object
  const allReviews = Object.values(reviews).reduce((acc, val) => {
    return acc.concat(val.comments);
  }, []);

  return (
    <section className="pt-6 mt-6">
      <h4 className="text-xl font-bold text-primary">
        Time trend - Local Industry Analysis
      </h4>
      <p className="text-ssindex-graph-grey mt-2">
        Stakeholders feedback classified by company, operating locally, and by
        time
      </p>
      <div className="bg-white rounded-lg shadow-md mt-4 w-full h-full p-4">
        <TimeRangeSelector onSelect={() => console.log("TimeRange")} />
        <TimeTrendsLineChart />
        <Table columns={subNestedColumns} data={allReviews} />
      </div>
    </section>
  );
}

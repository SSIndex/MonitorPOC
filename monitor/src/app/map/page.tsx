"use client";

import { Table } from "@/_components/table";
import { useGetSASBReviews } from "@/_handlers/requests/sasb";
import { subNestedColumns } from "@/_mocks/data";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";

// Main General Analysis Page
export default function MapAnalysis() {
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
    <>
      {/* SASB Impact Analysis Section */}
      <section className="pt-6 mt-6">
        <h4 className="text-xl font-bold text-primary">
          Geographical Analysis
        </h4>
        <p className="text-ssindex-graph-grey mt-2">
          Stakeholders feedback classified by territory
        </p>
        <div className="bg-white rounded-lg shadow-md mt-4">
          <Table columns={subNestedColumns} data={allReviews} />
        </div>
      </section>
    </>
  );
}

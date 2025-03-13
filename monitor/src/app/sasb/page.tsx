"use client";

import { Table } from "@/_components/table";
import { Card } from "@/_components/card";
import {
  dimensionFooterData,
  overallScoreSASBData,
  dimensionColumns,
  subNestedColumns,
} from "@/_mocks/data";
import {
  useGetOverallScoreSASB,
  useGetSASBReviews,
} from "@/_handlers/requests/sasb";
import { GaugeChart } from "@/_components/gauge_chart";
import DatePickerYearly from "@/_components/date_picker";
import { categorizeScoreToText } from "@/_utils/scoreUtils";
import {
  toCamelCase,
  transformSummaryToFooter,
  transformToTableData,
} from "@/_utils/dataTransformations";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";

export default function SASBAnalysis() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "review", desc: true },
  ]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  // Maybe here use Promise.All or something to fetch in parallel
  const { data: overallScoreSASB, error, isLoading } = useGetOverallScoreSASB();
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

  if (isLoading && reviewsIsLoading) return <div>Loading...</div>;
  if (error && reviewsError)
    return <div>Error: {error.message || reviewsError.message}</div>;

  // Add reviews to the overallScoreSASB data
  overallScoreSASB.data = overallScoreSASB.data.map((dimensionRow) => {
    const dimensionName = toCamelCase(dimensionRow.dimension);
    if (!reviews || !(dimensionName in reviews)) {
      return dimensionRow;
    }

    const reviewsData = reviews[dimensionName];
    return {
      ...dimensionRow,
      reviews: reviewsData,
    };
  });

  return (
    <>
      <Card
        companyName={overallScoreSASB.companyName}
        industry={overallScoreSASB.industryName}
        country={overallScoreSASB.countryName}
        region={overallScoreSASB.regionName}
        overview={categorizeScoreToText(overallScoreSASB.summary.score)}
        overviewGraph={
          <GaugeChart
            score={overallScoreSASB.summary.score}
            scoreText={categorizeScoreToText(overallScoreSASB.summary.score)}
            minValue={0}
            maxValue={100}
          />
        }
        datePicker={<DatePickerYearly />}
      />
      {/* SASB Impact Analysis Section */}
      <section className="pt-6 mt-6">
        <h4 className="text-xl font-bold text-primary">SASB Impact Analysis</h4>
        <p className="text-ssindex-graph-grey mt-2">
          Stakeholders evaluate how the company is performing according to the
          Sustainability Accounting Standards Board (SASB) methodology
        </p>
        <div className="bg-white rounded-lg shadow-md mt-4 p-6">
          <h5 className="ps-1 text-primary">Overall Score SASB</h5>
          <Table
            data={transformToTableData(overallScoreSASB.data)}
            columns={dimensionColumns}
            centerSecondLeft={true}
            footerData={transformSummaryToFooter(overallScoreSASB.summary)}
            backgroundColor="bg-white"
            nestedColumns={subNestedColumns}
            nestedSorting={sorting}
            nestedOnSortingChange={(updaterOrValue) => {
              const newState = updaterOrValue(sorting);
              setSorting(newState);
              return newState;
            }}
            pagination={pagination}
            // onPaginationChange={setPagination}
            onPaginationChange={(updaterOrValue) => {
              const newState = updaterOrValue(pagination);
              setPagination(newState);
              return newState;
            }}
          />
        </div>
        <div className="bg-light rounded-lg shadow-md mt-4 p-6">
          <h5 className="ps-1 text-primary">Environment</h5>
          <Table
            data={overallScoreSASBData}
            columns={dimensionColumns}
            centerSecondLeft={true}
            footerData={dimensionFooterData}
            backgroundColor="bg-light"
            nestedColumns={subNestedColumns}
            nestedSorting={sorting}
            nestedOnSortingChange={(updaterOrValue) => {
              const newState = updaterOrValue(sorting);
              setSorting(newState);
              return newState;
            }}
            pagination={pagination}
            onPaginationChange={(updaterOrValue) => {
              const newState = updaterOrValue(pagination);
              setPagination(newState);
              return newState;
            }}
          />
        </div>
      </section>
    </>
  );
}

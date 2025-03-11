"use client";

import { Table } from "@/_components/table";
import { Card } from "@/_components/card";
import {
  dimensionFooterData,
  overallScoreSASBData,
  dimensionColumns,
  subNestedColumns,
} from "@/_mocks/data";
import { usePagination } from "@/_hooks/usePagination";
import { useGetOverallScoreSASB } from "@/_handlers/requests/sasb";
import { GaugeChart } from "@/_components/gauge_chart";
import DatePickerYearly from "@/_components/date_picker";
import { categorizeScoreToText } from "@/_utils/scoreUtils";

export default function SASBAnalysis() {
  const { data: overallScoreSASB, error, isLoading } = useGetOverallScoreSASB();

  const {
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
  } = usePagination({
    defaultPageSize: 10,
    defaultInitialSortColumn: "review",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
            data={overallScoreSASBData}
            columns={dimensionColumns}
            centerSecondLeft={true}
            footerData={dimensionFooterData}
            backgroundColor="bg-white"
            nestedColumns={subNestedColumns}
            nestedSortColumn={sortColumn}
            nestedSortDirection={sortDirection}
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
          />
        </div>
      </section>
    </>
  );
}

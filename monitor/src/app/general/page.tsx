"use client";

import { Table } from "@/_components/table";
import { Card } from "@/_components/card";
import ExampleRadarChart from "@/_components/radar_chart";
import ExampleBarChart from "@/_components/bar_chart";
// import { }
import {
  sasbRadarChartColumnData,
  dimensionColumns,
  percentileData,
  percentileDataColumns,
} from "@/_mocks/data";
import { useGetOverallScoreSASB } from "@/_handlers/requests/sasb";
import {
  transformSummaryToFooter,
  transformToRadarChartData,
  transformToRadarChartFooterData,
  transformToTableData,
} from "@/_utils/dataTransformations";
import DatePickerYearly from "@/_components/date_picker";
import { GaugeChart } from "@/_components/gauge_chart";
import { categorizeScoreToText } from "@/_utils/scoreUtils";

// Main General Analysis Page
export default function GeneralAnalysis() {
  const { data: overallScoreSASB, error, isLoading } = useGetOverallScoreSASB();

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
      <section className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="bg-secondary text-white p-6 rounded-lg">
            <h5 className="text-lg font-semibold">Percentile Analysis</h5>
            <p className="mt-2 text-md">
              The result of the company in analysis is benchmarked with two
              groups of data:
            </p>
            <ol className="list-decimal ml-4 mt-2 space-y-1 text-md">
              <li>
                <strong>Global Universe</strong>: Sample of companies worldwide.
              </li>
              <li>
                <strong>Industry in Country</strong>: Same industry and country.
              </li>
            </ol>
          </div>
          {/* Right Column - Table */}
          <div className="bg-white rounded-lg shadow-md">
            <Table
              data={percentileData}
              columns={percentileDataColumns}
              centerSecondLeft={false}
              backgroundColor="bg-white"
            />
          </div>
        </div>
      </section>

      <section className="pt-6">
        <h4 className="text-xl font-bold text-primary">Performance Analysis</h4>
        <p className="text-gray-600 mt-2">
          The results are classified in a 5-category ratio and benchmarked with
          two groups.
        </p>
        <div className="mt-4 bg-light rounded-lg shadow-md p-6">
          <div className="h-96 flex items-center justify-center">
            <ExampleBarChart />
          </div>
        </div>
      </section>

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
          />
        </div>
      </section>

      <section className="pt-6">
        <h4 className="text-xl font-bold text-primary">SASB Radar Chart</h4>
        <div className="mt-4 bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Table */}
          <div className="col-span-1 ">
            <Table
              data={transformToRadarChartData(overallScoreSASB.data)}
              columns={sasbRadarChartColumnData}
              centerSecondLeft={true}
              backgroundColor="bg-ssindex-nested-table-background"
              headerBackgroundColor="bg-ssindex-table-header-gray"
              footerData={transformToRadarChartFooterData(
                overallScoreSASB.summary,
              )}
            />
          </div>
          <div className="col-span-2 h-96 flex items-center justify-center">
            <ExampleRadarChart />
          </div>
        </div>
      </section>
    </>
  );
}

import Navbar from "@/_components/navbar";
import { Table } from "@/_components/table";
import ExampleCard from "@/_components/card";
import ExampleRadarChart from "@/_components/radar_chart";
import ExampleBarChart from "@/_components/bar_chart";

const sasbRadarChartColumnData = [
  { header: "#", accessorKey: "id" },
  { header: "Dimension", accessorKey: "category" },
  { header: "Score", accessorKey: "scoreColor" },
];

const sasbRadarChartTableData = [
  { id: 1, category: "Environment", scoreColor: "80" },
  { id: 2, category: "Social Capital", scoreColor: "70" },
  { id: 3, category: "Human Capital", scoreColor: "85" },
  { id: 4, category: "Leadership & Governance", scoreColor: "60" },
  { id: 5, category: "Others", scoreColor: "60" },
];

// const nestedData: DimensionRow[] = [
//   {
//     id: 1,
//     dimension: "Sub-Environment",
//     noData: false,
//     poor: false,
//     low: false,
//     average: false,
//     good: true,
//     excellent: false,
//     scoreColor: 70,
//     percentileColor: 80,
//   },
//   // ... more sub-rows
// ];

const nestedData = [
  {
    review: "Good",
    sentiment: "Positive",
    score: 70,
    dimension: "Sub-Environment",
    category: "Sub-Category",
    territoryOrState: "Territory",
    date: "2021-09-01",
    dataSource: "Source",
  },
  {
    review: "Excellent",
    sentiment: "Positive",
    score: 90,
    dimension: "Sub-Environment",
    category: "Sub-Category",
    territoryOrState: "Territory",
    date: "2021-09-01",
    dataSource: "Source",
  },
];

// Sample data
const dimensionData: DimensionRow[] = [
  {
    id: 1,
    dimension: "ENVIRONMENT",
    noData: false,
    poor: false,
    low: false,
    average: false,
    good: true,
    excellent: false,
    scoreColor: 62,
    percentileColor: 75,
    nestedData: nestedData,
  },
  {
    id: 2,
    dimension: "SOCIAL CAPITAL",
    noData: false,
    poor: false,
    low: false,
    average: true,
    good: false,
    excellent: false,
    scoreColor: 45,
    percentileColor: 60,
    nestedData: nestedData,
  },
  {
    id: 3,
    dimension: "HUMAN CAPITAL",
    noData: false,
    poor: false,
    low: false,
    average: false,
    good: true,
    excellent: false,
    scoreColor: 78,
    percentileColor: 85,
    nestedData: nestedData,
  },
  {
    id: 4,
    dimension: "LEADERSHIP & GOVERNANCE",
    noData: false,
    poor: false,
    low: true,
    average: false,
    good: false,
    excellent: false,
    scoreColor: 35,
    percentileColor: 50,
    nestedData: nestedData,
  },
  {
    id: 5,
    dimension: "OTHERS",
    noData: false,
    poor: false,
    low: true,
    average: false,
    good: false,
    excellent: false,
    scoreColor: 35,
    percentileColor: 50,
    nestedData: nestedData,
  },
];

// Column definitions with proper typing
const dimensionColumns: ColumnDef<DimensionRow>[] = [
  { header: "#", accessorKey: "id" },
  { header: "Dimension", accessorKey: "dimension" },
  {
    header: (
      <div>
        <p className="text-ssindex-graph-grey">No Data</p>
      </div>
    ),
    accessorKey: "noData",
  },
  {
    header: (
      <div>
        <p className="text-ssindex-poor">Poor</p>
        <p className="text-dark text-xs font-normal">0-19%</p>
      </div>
    ),
    accessorKey: "poor",
  },
  {
    header: (
      <div>
        <p className="text-ssindex-low">Low</p>
        <p className="text-dark text-xs font-normal">20-39%</p>
      </div>
    ),
    accessorKey: "low",
  },
  {
    header: (
      <div>
        <p className="text-ssindex-average">Average</p>
        <p className="text-dark text-xs font-normal">40-59%</p>
      </div>
    ),
    accessorKey: "average",
  },
  {
    header: (
      <div>
        <p className="text-ssindex-good">Good</p>
        <p className="text-dark text-xs font-normal">60-79%</p>
      </div>
    ),
    accessorKey: "good",
  },
  {
    header: (
      <div>
        <p className="text-ssindex-excellent">Excellent</p>
        <p className="text-dark text-xs font-normal">80-100%</p>
      </div>
    ),
    accessorKey: "excellent",
  },
  {
    header: (
      <div>
        <p className="text-dark">Score</p>
      </div>
    ),
    accessorKey: "scoreColor",
  },
  {
    header: (
      <div>
        <p className="text-dark">Percentile</p>
        <p className="text-dark text-xs font-normal">Industry, Country</p>
      </div>
    ),
    accessorKey: "percentileColor",
  },
];

const subNestedColumns = [
  {
    header: "Review",
    accessorKey: "review",
  },
  {
    header: "Sentiment",
    accessorKey: "sentiment",
  },
  {
    header: "Score",
    accessorKey: "score",
  },
  {
    header: "Dimension",
    accessorKey: "dimension",
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  {
    header: "Territory or State",
    accessorKey: "territoryOrState",
  },
  {
    header: "Date",
    accessorKey: "date",
  },
  {
    header: "Data Source",
    accessorKey: "dataSource",
  },
];

const dimensionFooterData = {
  id: null,
  dimension: "Total Score",
  noData: null,
  poor: null,
  low: null,
  average: null,
  good: null,
  excellent: null,
  scoreColor: 62,
  percentileColor: 75,
};

// Main General Analysis Page
export default function PercentileAnalysis() {
  return (
    <>
      <ExampleCard />
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
            data={dimensionData}
            columns={dimensionColumns}
            centerSecondLeft={true}
            footerData={dimensionFooterData}
            backgroundColor="bg-white"
            nestedColumns={subNestedColumns}
          />
        </div>
      </section>
    </>
  );
}

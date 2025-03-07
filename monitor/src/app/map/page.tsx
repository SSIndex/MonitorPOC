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
    orders: [
      { orderId: "O1", item: "Laptop", price: 1200 },
      { orderId: "O2", item: "Mouse", price: 25 },
    ],
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
    orders: [{ orderId: "O3", item: "Monitor", price: 300 }],
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
    orders: [
      { orderId: "O4", item: "Keyboard", price: 50 },
      { orderId: "O5", item: "Headphones", price: 100 },
    ],
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
    orders: [
      { orderId: "O6", item: "Chair", price: 150 },
      { orderId: "O7", item: "Table", price: 200 },
    ],
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
    orders: [
      { orderId: "O6", item: "Chair", price: 150 },
      { orderId: "O7", item: "Table", price: 200 },
    ],
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

// use data from the server
const percentileDataColumns = [
  { header: "Type", accessorKey: "type" },
  { header: "Position", accessorKey: "position" },
  { header: "Percentile", accessorKey: "percentile" },
  { header: "Data Set", accessorKey: "dataset" },
];

const percentileData = [
  {
    id: 1,
    type: (
      <div className="flex items-center">
        <div className="bg-ssindex-graph-grey  w-5 h-5 rounded-sm flex-shrink-0"></div>
        <div>Global, Universe</div>
      </div>
    ),
    position: (
      <p className="text-ssindex-graph-grey">
        <span className="font-bold">8</span> out of 15
      </p>
    ),
    percentile: <p className="text-ssindex-graph-grey font-bold">75th</p>,
    dataset: <p className="text-ssindex-graph-grey">50 out of 200</p>,
  },
  {
    id: 2,
    type: (
      <div className="flex items-center">
        <div className="bg-ssindex-footer-text  w-5 h-5 rounded-sm flex-shrink-0"></div>
        <div>Industry, Country</div>
      </div>
    ),
    position: (
      <p className="text-ssindex-graph-grey">
        <span className="font-bold">6</span> out of 15
      </p>
    ),
    percentile: <p className="text-ssindex-graph-grey font-bold">60th</p>,
    dataset: <p className="text-ssindex-graph-grey">50 out of 150</p>,
  },
];

// Main General Analysis Page
export default function PercentileAnalysis() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-40 py-6">
        {/* SASB Impact Analysis Section */}
        <section className="pt-6 mt-6">
          <h4 className="text-xl font-bold text-primary">
            Geographical Analysis
          </h4>
          <p className="text-ssindex-graph-grey mt-2">
          Stakeholders feedback classified by territory
          </p>
          <div className="bg-white rounded-lg shadow-md mt-4 p-6">
            <h5 className="ps-1 text-primary">Overall Score SASB</h5>
            <Table
              data={dimensionData}
              columns={dimensionColumns}
              centerSecondLeft={true}
              footer={true}
              backgroundColor="bg-white"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

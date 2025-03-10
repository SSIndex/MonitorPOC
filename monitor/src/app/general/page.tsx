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

const sasbRadarChartFooterData = {
  id: null,
  category: "Total Score",
  scoreColor: "75",
};

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
export default function GeneralAnalysis() {
  // Dummy data (replace with your dynamic values)
  const companyName = "Clínica Meds";
  const industry = "Technology";
  const country = "USA";
  const region = "North America";
  const generalScore = 75; // Dummy score
  const mockMinValue = 0;
  const mockMaxValue = 100;

  // Dummy SASB table data
  const sasbTableData = [
    { category: "Environment", score: "80", percentile: "85%" },
    { category: "Social Capital", score: "70", percentile: "65%" },
  ];

  return (
    <>
      <ExampleCard />

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
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* {percentileData.map((item, index) => (
                <Table

                  centerSecondLeft={false}
                />
              ))} */}
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
            data={dimensionData}
            columns={dimensionColumns}
            centerSecondLeft={true}
            footerData={dimensionFooterData}
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
              data={sasbRadarChartTableData}
              columns={sasbRadarChartColumnData}
              centerSecondLeft={true}
              footer={false}
              backgroundColor="bg-ssindex-nested-table-background"
              headerBackgroundColor="bg-ssindex-table-header-gray"
              footerData={sasbRadarChartFooterData}
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

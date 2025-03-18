import { DimensionRow } from "@/_utils/tableUtils";
import { ColumnDef } from "@tanstack/react-table";

export const sasbRadarChartColumnData = [
  { header: "#", accessorKey: "id" },
  { header: "Dimension", accessorKey: "dimension" },
  { header: "Score", accessorKey: "scoreColor" },
];

export const sasbRadarChartTableData = [
  { id: 1, category: "Environment", scoreColor: "80" },
  { id: 2, category: "Social Capital", scoreColor: "70" },
  { id: 3, category: "Human Capital", scoreColor: "85" },
  { id: 4, category: "Leadership & Governance", scoreColor: "60" },
  { id: 5, category: "Others", scoreColor: "60" },
];

export const sasbRadarChartFooterData = {
  id: null,
  category: "Total Score",
  scoreColor: "75",
};

export const nestedData = [
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

export const subNestedColumns = [
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

// Sample data
export const overallScoreSASBData: DimensionRow[] = [
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

export const overallScoreSASBDataV2: DimensionRow[] = [
  {
    id: 1,
    dimension: "ENVIRONMENT",
    score: 62,
    percentile: 75,
  },
  {
    id: 2,
    dimension: "SOCIAL CAPITAL",
    score: 45,
    percentile: 60,
  },
  {
    id: 3,
    dimension: "HUMAN CAPITAL",
    score: 78,
    percentile: 85,
  },
  {
    id: 4,
    dimension: "LEADERSHIP AND GOVERNANCE",
    score: 35,
    percentile: 50,
  },
  {
    id: 5,
    dimension: "OTHERS",
    score: 35,
    percentile: 50,
  },
];

export const environmentComments = [
  {
    review: "Good",
    sentiment: "Positive",
    score: 70,
    dimension: "Air Quality",
    category: "Pollution Control",
    territoryOrState: "California",
    date: "2021-09-01",
    dataSource: "EPA",
  },
  {
    review: "Excellent",
    sentiment: "Positive",
    score: 90,
    dimension: "Water Quality",
    category: "Clean Water",
    territoryOrState: "Texas",
    date: "2021-08-15",
    dataSource: "USGS",
  },
  {
    review: "Poor",
    sentiment: "Negative",
    score: 30,
    dimension: "Air Quality",
    category: "Carbon Emissions",
    territoryOrState: "New York",
    date: "2022-01-10",
    dataSource: "NASA",
  },
  {
    review: "Neutral",
    sentiment: "Neutral",
    score: 50,
    dimension: "Biodiversity",
    category: "Wildlife Protection",
    territoryOrState: "Florida",
    date: "2023-03-22",
    dataSource: "WWF",
  },
  {
    review: "Satisfactory",
    sentiment: "Positive",
    score: 65,
    dimension: "Waste Management",
    category: "Recycling Programs",
    territoryOrState: "Illinois",
    date: "2022-11-11",
    dataSource: "State Reports",
  },
  {
    review: "Terrible",
    sentiment: "Negative",
    score: 20,
    dimension: "Deforestation",
    category: "Logging Impact",
    territoryOrState: "Amazon",
    date: "2020-06-30",
    dataSource: "Greenpeace",
  },
  {
    review: "Very Good",
    sentiment: "Positive",
    score: 80,
    dimension: "Air Quality",
    category: "Green Energy",
    territoryOrState: "Colorado",
    date: "2021-07-19",
    dataSource: "EPA",
  },
  {
    review: "Mediocre",
    sentiment: "Neutral",
    score: 55,
    dimension: "Water Quality",
    category: "Industrial Waste",
    territoryOrState: "Michigan",
    date: "2023-05-14",
    dataSource: "Local Authority",
  },
  {
    review: "Horrible",
    sentiment: "Negative",
    score: 10,
    dimension: "Waste Management",
    category: "Landfills",
    territoryOrState: "Nevada",
    date: "2019-12-25",
    dataSource: "NGO Report",
  },
  {
    review: "Amazing",
    sentiment: "Positive",
    score: 95,
    dimension: "Renewable Energy",
    category: "Solar Power",
    territoryOrState: "Arizona",
    date: "2022-09-10",
    dataSource: "Energy Department",
  },
  {
    review: "Disappointing",
    sentiment: "Negative",
    score: 40,
    dimension: "Climate Change",
    category: "CO2 Emissions",
    territoryOrState: "Washington",
    date: "2021-04-17",
    dataSource: "IPCC",
  },
  {
    review: "Acceptable",
    sentiment: "Neutral",
    score: 60,
    dimension: "Forestry",
    category: "Reforestation Efforts",
    territoryOrState: "Oregon",
    date: "2023-01-05",
    dataSource: "Forest Service",
  },
  {
    review: "Fantastic",
    sentiment: "Positive",
    score: 88,
    dimension: "Sustainability",
    category: "Eco-Friendly Policies",
    territoryOrState: "Vermont",
    date: "2022-06-21",
    dataSource: "State Reports",
  },
  {
    review: "Needs Improvement",
    sentiment: "Negative",
    score: 45,
    dimension: "Biodiversity",
    category: "Endangered Species",
    territoryOrState: "Alaska",
    date: "2020-11-30",
    dataSource: "WWF",
  },
  {
    review: "Could be better",
    sentiment: "Neutral",
    score: 58,
    dimension: "Urban Planning",
    category: "Green Spaces",
    territoryOrState: "New Jersey",
    date: "2023-02-12",
    dataSource: "City Reports",
  },
];
export const socialCapitalComments = [
  {
    review: "Good",
    sentiment: "Positive",
    score: 70,
    dimension: "Sub-Social Capital",
    category: "Sub-Category",
    territoryOrState: "Territory",
    date: "2021-09-01",
    dataSource: "Source",
  },
  {
    review: "Excellent",
    sentiment: "Positive",
    score: 90,
    dimension: "Sub-Social Capital",
    category: "Sub-Category",
    territoryOrState: "Territory",
    date: "2021-09-01",
    dataSource: "Source",
  },
];

export const humanCapitalComments = [
  {
    review: "Good",
    sentiment: "Positive",
    score: 70,
    dimension: "Sub-Human Capital",
    category: "Sub-Category",
    territoryOrState: "Territory",
    date: "2021-09-01",
    dataSource: "Source",
  },
  {
    review: "Excellent",
    sentiment: "Positive",
    score: 90,
    dimension: "Sub-Human Capital",
    category: "Sub-Category",
    territoryOrState: "Territory",
    date: "2021-09-01",
    dataSource: "Source",
  },
];

export const leadershipAndGovernanceComments = [
  {
    review: "Good",
    sentiment: "Positive",
    score: 70,
    dimension: "Sub-Leadership & Governance",
    category: "Sub-Category",
    territoryOrState: "Territory",
    date: "2021-09-01",
    dataSource: "Source",
  },
  {
    review: "Excellent",
    sentiment: "Positive",
    score: 90,
    dimension: "Sub-Leadership & Governance",
    category: "Sub-Category",
    territoryOrState: "Territory",
    date: "2021-09-01",
    dataSource: "Source",
  },
];

export const othersComments = [
  {
    review: "Good",
    sentiment: "Positive",
    score: 70,
    dimension: "Sub-Others",
    category: "Sub-Category",
    territoryOrState: "Territory",
    date: "2021-09-01",
    dataSource: "Source",
  },
  {
    review: "Excellent",
    sentiment: "Positive",
    score: 90,
    dimension: "Sub-Others",
    category: "Sub-Category",
    territoryOrState: "Territory",
    date: "2021-09-01",
    dataSource: "Source",
  },
];

export const overallScoreSASBDataSummary = {
  score: 62,
  percentile: 75,
};

// Column definitions with proper typing
export const dimensionColumns: ColumnDef<DimensionRow>[] = [
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
export const percentileDataColumns = [
  { header: "Type", accessorKey: "type" },
  { header: "Position", accessorKey: "position" },
  { header: "Percentile", accessorKey: "percentile" },
  { header: "Data Set", accessorKey: "dataset" },
];

export const percentileData = [
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

export const dimensionFooterData = {
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

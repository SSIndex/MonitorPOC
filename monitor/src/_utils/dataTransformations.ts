interface DimensionRow {
  id: number;
  dimension: string;
  score: number;
  percentile: number;
}

interface RadarChartRow {
  id: number;
  category: string;
  scoreColor: string;
}

// Define types for clarity
interface SummaryData {
  score: number;
  percentile: number;
}

interface FooterData {
  id: null;
  dimension: string;
  scoreColor: string;
}

export function transformToTableData(rawData) {
  return rawData.map((item) => ({
    ...item,
    noData: item.score === null || item.score === undefined,
    poor: item.score < 20,
    low: item.score >= 20 && item.score < 40,
    average: item.score >= 40 && item.score < 60,
    good: item.score >= 60 && item.score < 80,
    excellent: item.score >= 80,
    scoreColor: item.score,
    percentileColor: item.percentile,
  }));
}

// Utility function to convert to title case
function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function transformToRadarChartData(
  rawData: DimensionRow[],
): RadarChartRow[] {
  return rawData.map((item) => ({
    id: item.id,
    dimension: toTitleCase(item.dimension),
    scoreColor: item.score.toString(),
  }));
}

// Transformation function
export function transformToRadarChartFooterData(
  summaryData: SummaryData,
): FooterData {
  return {
    id: null,
    dimension: "Total Score",
    scoreColor: summaryData.score.toString(),
  };
}

export function transformSummaryToFooter(summaryData) {
  return {
    id: null,
    dimension: "Total Score",
    noData: null,
    poor: null,
    low: null,
    average: null,
    good: null,
    excellent: null,
    scoreColor: summaryData.score,
    percentileColor: summaryData.percentile,
  };
}

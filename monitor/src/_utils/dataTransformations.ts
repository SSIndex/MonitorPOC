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

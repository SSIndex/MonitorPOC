"use client";

import TimeTrendsLineChart from "@/_components/line_chart_chartjs";
import TimeRangeSelector from "@/_components/time_range_selector";

// Main General Analysis Page
export default function TimeTrendsAnalysis() {
  return (
    <section className="pt-6 mt-6">
      <h4 className="text-xl font-bold text-primary">
        Time trend - Local Industry Analysis
      </h4>
      <p className="text-ssindex-graph-grey mt-2">
        Stakeholders feedback classified by company, operating locally, and by
        time
      </p>
      <div className="bg-white rounded-lg shadow-md mt-4 w-full h-full p-4">
        <TimeRangeSelector onSelect={() => console.log("TimeRange")} />
        <TimeTrendsLineChart />
      </div>
    </section>
  );
}

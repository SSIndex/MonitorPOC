import TimeTrendsLineChart from "@/_components/line_chart_chartjs";

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
      <div className="bg-white rounded-lg shadow-md mt-4 h-96">
        {/* <TimeTrendsLineChart /> */}
        <TimeTrendsLineChart />
      </div>
    </section>
  );
}

import { BoxPlotChart } from "@/_components/box_plot";
import PlotlyBoxPlot from "@/_components/box_plot_v2";
import ChartJsBoxPlot from "@/_components/box_plot_v3";

// Main General Analysis Page
export default function BenchmarksAnalysis() {
  return (
    <section className="pt-6 mt-6">
      <h4 className="text-xl font-bold text-primary">
        Box plot - Local Industry Analysis
      </h4>
      <p className="text-ssindex-graph-grey mt-2">
        Stakeholders feedback classified by company, operating locally, and by
        time
      </p>
      <div className="bg-white rounded-lg shadow-md mt-4 p-12 h-96">
        <ChartJsBoxPlot />
        {/* <BoxPlotChart /> */}
        {/* <PlotlyBoxPlot /> */}
      </div>
    </section>
  );
}

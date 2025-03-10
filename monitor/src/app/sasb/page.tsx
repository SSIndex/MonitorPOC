import { Table } from "@/_components/table";
import ExampleCard from "@/_components/card";
import {
  dimensionFooterData,
  dimensionData,
  dimensionColumns,
  subNestedColumns,
} from "@/_mocks/data";

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
        <div className="bg-light rounded-lg shadow-md mt-4 p-6">
          <h5 className="ps-1 text-primary">Environment</h5>
          <Table
            data={dimensionData}
            columns={dimensionColumns}
            centerSecondLeft={true}
            footerData={dimensionFooterData}
            backgroundColor="bg-light"
            nestedColumns={subNestedColumns}
          />
        </div>
      </section>
    </>
  );
}

import { Table } from "@/_components/table";
import {
  overallScoreSASBData,
  dimensionColumns,
  dimensionFooterData,
} from "@/_mocks/data";

// Main General Analysis Page
export default function MapAnalysis() {
  return (
    <>
      {/* SASB Impact Analysis Section */}
      <section className="pt-6 mt-6">
        <h4 className="text-xl font-bold text-primary">
          Geographical Analysis
        </h4>
        <p className="text-ssindex-graph-grey mt-2">
          Stakeholders feedback classified by territory
        </p>
        <div className="bg-white rounded-lg shadow-md mt-4">
          <Table
            data={overallScoreSASBData}
            columns={dimensionColumns}
            centerSecondLeft={true}
            footerData={dimensionFooterData}
            backgroundColor="bg-white"
          />
        </div>
      </section>
    </>
  );
}

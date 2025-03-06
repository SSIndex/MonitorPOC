import Image from "next/image";
import Link from "next/link";
import DatePickerYearly from "@/_components/datepicker";
import Navbar from "@/_components/navbar";
import GaugeChart from "@/_components/gauge_chart";
import { Table } from "@/_components/table";
import ExampleCard from "@/_components/card";
import ExampleRadarChart from "@/_components/radar_chart";
import ExampleBarChart from "@/_components/bar_chart";

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

  // Dummy percentile data
  const percentileData = [
    {
      label: "Global, Universe",
      color: "bg-gray-400",
      position: "25",
      total: "100",
      percentile: "75%",
      rows: "50 out of 200",
    },
    {
      label: "Industry, Country",
      color: "bg-blue-500",
      position: "10",
      total: "50",
      percentile: "80%",
      rows: "50 out of 150",
    },
  ];

  // Dummy SASB table data
  const sasbTableData = [
    { category: "Environment", score: "80", percentile: "85%" },
    { category: "Social Capital", score: "70", percentile: "65%" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-40 py-6">
        {/* Company Card Section */}
        {/* <section className="pt-6">
          <div className="bg-ssindex-card-blue rounded-lg shadow-md p-6 flex items-center space-x-6">
            <div className="flex-1 ">
              <h2 className="text-2xl font-bold text-white">{companyName}</h2>
              <p className="text-white">{industry} • {country} • {region}</p>
              <p className="text-lg font-semibold text-white mt-2">
                Overview: {generalScore >= 70 ? "Excellent" : "Good"}
              </p>
              <DatePickerYearly />
            </div>
            <GaugeChart score={generalScore} scoreText="Excellent" />
          </div>
        </section> */}
        <ExampleCard />

        {/* Percentile Analysis Section */}
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
                  <strong>Global Universe</strong>: Sample of companies
                  worldwide.
                </li>
                <li>
                  <strong>Industry in Country</strong>: Same industry and
                  country.
                </li>
              </ol>
            </div>
            {/* Right Column - Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {percentileData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 py-2 border-b last:border-b-0"
                >
                  <div
                    className={`${item.color} w-5 h-5 rounded-sm flex-shrink-0`}
                  ></div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{item.label}</p>
                    <p className="text-gray-600">
                      {item.position} out of {item.total}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-600">
                    {item.percentile}
                  </p>
                  <p className="text-gray-600">{item.rows}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Analysis Section */}
        <section className="pt-6">
          <h4 className="text-xl font-bold text-primary">
            Performance Analysis
          </h4>
          <p className="text-gray-600 mt-2">
            The results are classified in a 5-category ratio and benchmarked
            with two groups.
          </p>
          <div className="mt-4 bg-light rounded-lg shadow-md p-6">
            <div className="h-96 flex items-center justify-center">
              <ExampleBarChart />
            </div>
          </div>
        </section>

        {/* SASB Impact Analysis Section */}
        <section className="pt-6 mt-6">
          <h4 className="text-xl font-bold text-primary">
            SASB Impact Analysis
          </h4>
          <p className="text-ssindex-graph-grey mt-2">
            Stakeholders evaluate how the company is performing according to the
            Sustainability Accounting Standards Board (SASB) methodology
          </p>
          <div className="bg-white rounded-lg shadow-md mt-4 p-6">
            <h5 className="ps-1 pb-5 text-primary">Overall Score SASB</h5>
            <Table />
          </div>
        </section>

        {/* SASB Radar Chart Section */}
        <section className="pt-6">
          <h4 className="text-xl font-bold text-primary">SASB Radar Chart</h4>
          <div className="mt-4 bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Table */}
            <div className="col-span-1">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3">Category</th>
                    <th className="p-3">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {sasbTableData.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3">{row.category}</td>
                      <td className="p-3">{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Radar Chart Placeholder */}
            <div className="col-span-2 h-96 flex items-center justify-center">
              <ExampleRadarChart />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

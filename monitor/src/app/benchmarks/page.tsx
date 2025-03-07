import Navbar from "@/_components/navbar";

// Main General Analysis Page
export default function BenchmarksAnalysis() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-40 py-6">
        {/* SASB Impact Analysis Section */}
        <section className="pt-6 mt-6">
          <h4 className="text-xl font-bold text-primary">
            Box plot - Local Industry Analysis
          </h4>
          <p className="text-ssindex-graph-grey mt-2">
            Stakeholders feedback classified by company, operating locally, and
            by time
          </p>
          <div className="bg-white rounded-lg shadow-md mt-4 p-12 h-96">
            <p>Boxplot</p>
          </div>
        </section>
      </main>
    </div>
  );
}

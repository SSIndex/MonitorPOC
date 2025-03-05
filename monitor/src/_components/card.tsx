"use client";

import React, { useMemo } from "react";
import ExampleGaugeChart from "./gauge_chart";
import DatePickerYearly from "./datepicker";
import clinicaMeds from "../../public/clinicaMeds.jpeg";
import Image from "next/image";

// Props interface for TypeScript typing
interface CardProps {
  companyName: string;
  industry: string;
  country: string;
  region: string;
  overview: string; // e.g., "Poor", "Low", "Average", "Good", "Excellent"
  overviewGraph: JSX.Element; // GaugeChart component render result
  companyImage?: string;
  textColor?: string; // e.g., "text-white"
  backgroundColor?: string; // e.g., "bg-primary"
  datePicker?: JSX.Element; // DatePickerYearly component render result
}

const DEFAULT_IMAGE = clinicaMeds;
// Card Component
export const Card: React.FC<CardProps> = ({
  companyName,
  industry,
  country,
  region,
  overview,
  overviewGraph,
  companyImage = DEFAULT_IMAGE,
  textColor = "text-white",
  backgroundColor = "bg-ssindex-card-blue",
  datePicker,
}) => {
  // Generate overview text based on overview score (equivalent to _generate_overview_text)
  const overviewText = useMemo(() => {
    const overviewMapping: { [key: string]: string } = {
      Poor: " This company holds a poor sentiment score. Feedback is mostly negative, with 80% of comments being negative and 20% positive. This indicates a negative perception among respondents",
      Low: "This company holds a low sentiment score. Feedback is mostly negative, with 60% of comments being negative and 40% positive. This indicates a negative perception among respondents",
      Average:
        " This company holds a medium sentiment score. Feedback is evenly split, with 50% of comments being positive and 50% negative. This indicates a balanced perception among respondents",
      Good: " This company holds a high sentiment score. Feedback is mostly positive, with 60% of comments being positive and 40% negative. This indicates a positive perception among respondents",
      Excellent:
        " This company holds a very high sentiment score. Feedback is overwhelmingly positive, with 80% of comments being positive and 20% negative. This indicates a very positive perception among respondents",
    };
    return overviewMapping[overview] || "";
  }, [overview]);

  return (
    <section>
      <div
        className={`card rounded-md ps-7 pe-7 pb-7 ${backgroundColor} ${textColor}`}
      >
        {/* Date Picker Section */}
        {datePicker && (
          <div className="flex justify-end pt-1 pe-5">{datePicker}</div>
        )}

        {/* Card Body */}
        <div className="card-body">
          <div className="flex gap-5 pb-4 ps-5 pe-5 items-center flex-col md:flex-row">
            {/* Left Column: Company Info and Overview */}
            <div className="flex-1">
              <div className="flex gap-4 items-center">
                <Image
                  src={companyImage}
                  alt="Company Image"
                  width={158}
                  height={158}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-3">
                  <p className="text-2xl font-bold">{companyName}</p>
                  <p className="text-lg">
                    <span className="font-bold">Region: </span>
                    {region}
                  </p>
                  <p className="text-lg">
                    <span className="font-bold">Industry: </span>
                    {industry}
                  </p>
                  <p className="text-lg">
                    <span className="font-bold">Country: </span>
                    {country}
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <p>
                  <span className="font-bold">Overview: {overview}. </span>
                  {overviewText}
                </p>
              </div>
            </div>

            <div className="flex-1 rounded-lg bg-white">{overviewGraph}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Example usage
const ExampleCard: React.FC = () => {
  const generalScore = 65; // Example score
  const mockMinValue = 0;
  const mockMaxValue = 100;

  // Mock categorizeScore function
  const categorizeScore = (score: number): string => {
    if (score < 20) return "Poor";
    if (score < 40) return "Low";
    if (score < 60) return "Average";
    if (score < 80) return "Good";
    return "Excellent";
  };

  return (
    <Card
      companyName="Clínica MEDS"
      industry="Hospitales y Salud"
      country="Chile"
      region="South America"
      overview={categorizeScore(generalScore)}
      overviewGraph={<ExampleGaugeChart />}
      datePicker={<DatePickerYearly />}
    />
  );
};

export default ExampleCard;

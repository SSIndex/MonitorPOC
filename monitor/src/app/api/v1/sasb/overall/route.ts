import {
  overallScoreSASBDataSummary,
  overallScoreSASBDataV2,
} from "@/_mocks/data";

export async function GET() {
  return Response.json({
    companyName: "Clínica MEDS",
    industryName: "Hospitales y Salud",
    countryName: "Chile",
    regionName: "South America",
    data: overallScoreSASBDataV2,
    summary: overallScoreSASBDataSummary,
  });
}

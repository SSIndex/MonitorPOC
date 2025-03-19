
import { DatabaseConnection } from "@/_db";
import {
  overallScoreSASBDataSummary,
  overallScoreSASBDataV2,
} from "@/_mocks/data";

export async function GET() {
  // Connect to the database
  try {
    const database = new DatabaseConnection();
    await database.connect();

    return Response.json({
      companyName: "Clínica MEDS",
      industryName: "Hospitales y Salud",
      countryName: "Chile",
      regionName: "South America",
      data: overallScoreSASBDataV2,
      summary: overallScoreSASBDataSummary,
    });
  } catch (error) {
    console.log("Error in GET:", error);
    return Response.error({ message: error.message });
  }
}

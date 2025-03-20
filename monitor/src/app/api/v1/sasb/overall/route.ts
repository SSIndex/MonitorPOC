import { DatabaseConnection } from "@/_lib/db";
import {
  overallScoreSASBDataSummary,
  overallScoreSASBDataV2,
} from "@/_mocks/data";

export async function GET() {
  // Connect to the database
  try {
    const database = new DatabaseConnection();
    console.log('esperando conexión....')
    await database.connect();
    console.log('conexión realizada! ')

    const response = {
      companyName: "Clínica MEDS",
      industryName: "Hospitales y Salud",
      countryName: "Chile",
      regionName: "South America",
      data: overallScoreSASBDataV2,
      summary: overallScoreSASBDataSummary,
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error in GET:", error);
    return Response.error({ message: error.message });
  }
}

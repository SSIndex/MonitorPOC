import { overallScoreSASBData } from "@/_mocks/data";

export async function GET() {
  return Response.json({
    data: overallScoreSASBData,
  });
}

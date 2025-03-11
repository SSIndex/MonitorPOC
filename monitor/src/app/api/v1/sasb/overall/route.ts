import {
  overallScoreSASBDataSummary,
  overallScoreSASBDataV2,
} from "@/_mocks/data";

export async function GET() {
  return Response.json({
    data: overallScoreSASBDataV2,
    summary: overallScoreSASBDataSummary,
  });
}

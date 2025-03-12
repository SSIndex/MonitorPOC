import {
  environmentComments,
  socialCapitalComments,
  humanCapitalComments,
  leadershipAndGovernanceComments,
  othersComments,
} from "@/_mocks/data";

export async function GET(request: Request) {
  // TODO: ADD pagination and sorting support
  const { searchParams } = new URL(request.url);
  const dimension = searchParams.get("dimension");
  const companyName = searchParams.get("companyName");

  let reviews = {};
  if (dimension === "ENVIRONMENT" && companyName === "Clínica MEDS") {
    reviews = { environment: environmentComments };
  }

  // Return all reviews if no dimension is specified
  if (!dimension && companyName === "Clínica MEDS") {
    reviews = {
      environment: environmentComments,
      socialCapital: socialCapitalComments,
      humanCapital: humanCapitalComments,
      leadershipAndGovernance: leadershipAndGovernanceComments,
      others: othersComments,
    };
  }

  return Response.json(reviews);
}

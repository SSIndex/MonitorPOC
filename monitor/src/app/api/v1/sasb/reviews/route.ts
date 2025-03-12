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
  const sort = searchParams.get("sort");
  const sortBy = searchParams.get("sortBy");

  if (sortBy === "review" && sort === "asc") {
    console.log("ORDENANDO ASCENDENTE rev");
    // Sort reviews in ascending order
    environmentComments.sort((a, b) => a.review.localeCompare(b.review));
    socialCapitalComments.sort((a, b) => a.review.localeCompare(b.review));
  }

  if (sortBy === "review" && sort === "desc") {
    console.log("ORDENANDO DESCENDENTE rev");
    // Sort reviews in descending order
    environmentComments.sort((a, b) => b.review.localeCompare(a.review));
    socialCapitalComments.sort((a, b) => b.review.localeCompare(a.review));
  }

  if (sortBy === "date" && sort === "asc") {
    console.log("ORDENANDO ASCENDENTE date");
    environmentComments.sort((a, b) => a.date.localeCompare(b.date));
    socialCapitalComments.sort((a, b) => a.date.localeCompare(b.date));
  }

  if (sortBy === "date" && sort === "desc") {
    console.log("ORDENANDO DESCENDENTE date");
    environmentComments.sort((a, b) => b.date.localeCompare(a.date));
    socialCapitalComments.sort((a, b) => b.date.localeCompare(a.date));
  }

  if (sortBy === "score" && sort === "asc") {
    console.log("ORDENANDO ASCENDENTE score");
    environmentComments.sort((a, b) => a.score - b.score);
    socialCapitalComments.sort((a, b) => a.score - b.score);
  }

  if (sortBy === "score" && sort === "desc") {
    console.log("ORDENANDO DESCENDENTE score");
    environmentComments.sort((a, b) => b.score - a.score);
    socialCapitalComments.sort((a, b) => b.score - a.score);
  }

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

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
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");

  let environComments = environmentComments;
  let socialComments = socialCapitalComments;
  let humanComments = humanCapitalComments;
  let leadershipComments = leadershipAndGovernanceComments;
  let otherComments = othersComments;

  if (sortBy === "review" && sort === "asc") {
    console.log("ORDENANDO ASCENDENTE rev");
    // Sort reviews in ascending order
    environComments.sort((a, b) => a.review.localeCompare(b.review));
    socialComments.sort((a, b) => a.review.localeCompare(b.review));
  }

  if (sortBy === "review" && sort === "desc") {
    console.log("ORDENANDO DESCENDENTE rev");
    // Sort reviews in descending order
    environComments.sort((a, b) => b.review.localeCompare(a.review));
    socialComments.sort((a, b) => b.review.localeCompare(a.review));
  }

  if (sortBy === "date" && sort === "asc") {
    console.log("ORDENANDO ASCENDENTE date");
    environComments.sort((a, b) => a.date.localeCompare(b.date));
    socialComments.sort((a, b) => a.date.localeCompare(b.date));
  }

  if (sortBy === "date" && sort === "desc") {
    console.log("ORDENANDO DESCENDENTE date");
    environComments.sort((a, b) => b.date.localeCompare(a.date));
    socialComments.sort((a, b) => b.date.localeCompare(a.date));
  }

  if (sortBy === "score" && sort === "asc") {
    console.log("ORDENANDO ASCENDENTE score");
    environComments.sort((a, b) => a.score - b.score);
    socialComments.sort((a, b) => a.score - b.score);
  }

  if (sortBy === "score" && sort === "desc") {
    console.log("ORDENANDO DESCENDENTE score");
    environComments.sort((a, b) => b.score - a.score);
    socialComments.sort((a, b) => b.score - a.score);
  }

  let reviews = {};
  if (dimension === "ENVIRONMENT" && companyName === "Clínica MEDS") {
    reviews = { environment: environmentComments };
  }

  if (page && pageSize) {
    const start = Number(page) * Number(pageSize);
    const end = start + Number(pageSize);
    environComments = environComments.slice(start, end);
    socialComments = socialComments.slice(start, end);
    humanComments = humanComments.slice(start, end);
    leadershipComments = leadershipComments.slice(start, end);
    otherComments = otherComments.slice(start, end);
  }

  // Return all reviews if no dimension is specified
  if (!dimension && companyName === "Clínica MEDS") {
    reviews = {
      environment: {
        totalRows: environmentComments.length,
        comments: environComments,
      },
      socialCapital: {
        totalRows: socialCapitalComments.length,
        comments: socialComments,
      },
      humanCapital: {
        totalRows: humanCapitalComments.length,
        comments: humanComments,
      },
      leadershipAndGovernance: {
        comments: leadershipComments,
        totalRows: leadershipAndGovernanceComments.length,
      },
      others: {
        comments: otherComments,
        totalRows: othersComments.length,
      },
    };
  }

  return Response.json(reviews);
}

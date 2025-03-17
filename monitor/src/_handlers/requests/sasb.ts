import { useQuery } from "@tanstack/react-query";

const baseURL = "/api/v1/sasb";

export const useGetOverallScoreSASB = () => {
  return useQuery({
    queryKey: ["overallScoreSASB"],
    queryFn: async () => {
      const response = await fetch(`${baseURL}/overall`);
      return response.json();
    },
  });
};

export const useGetSASBReviews = (
  companyName: string,
  dimension?: string,
  sorting: "asc" | "desc" = "desc",
  sortBy: string = "review",
  page: number = 0,
  pageSize: number = 5,
) => {
  let endpoint = `${baseURL}/reviews?companyName=${companyName}&sort=${sorting}&sortBy=${sortBy}&page=${page}&pageSize=${pageSize}`;
  endpoint = dimension ? `${endpoint}&dimension=${dimension}` : endpoint;

  return useQuery({
    queryKey: [
      "sasbReviews",
      dimension,
      companyName,
      sorting,
      sortBy,
      page,
      pageSize,
    ],
    queryFn: async () => {
      const response = await fetch(endpoint);
      return response.json();
    },
  });
};

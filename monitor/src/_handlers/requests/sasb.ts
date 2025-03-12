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

export const useGetSASBReviews = (dimension: string, companyName: string) => {
  let endpoint = `${baseURL}/reviews`;
  endpoint =
    dimension && companyName
      ? `${endpoint}?dimension=${dimension}&companyName=${companyName}`
      : endpoint;

  return useQuery({
    queryKey: ["sasbReviews", dimension, companyName],
    queryFn: async () => {
      const response = await fetch(endpoint);
      return response.json();
    },
  });
};

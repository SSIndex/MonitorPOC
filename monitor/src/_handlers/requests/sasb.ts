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

export const useGetSASBReviews = (companyName: string, dimension?: string) => {
  console.log("companyName", companyName);
  let endpoint = `${baseURL}/reviews?companyName=${companyName}`;
  endpoint = dimension ? `${endpoint}&dimension=${dimension}` : endpoint;

  return useQuery({
    queryKey: ["sasbReviews", dimension, companyName],
    queryFn: async () => {
      const response = await fetch(endpoint);
      return response.json();
    },
  });
};

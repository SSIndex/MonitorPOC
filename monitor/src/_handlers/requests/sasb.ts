import { useQuery } from "@tanstack/react-query";

export const useGetOverallScoreSASB = () => {
  return useQuery({
    queryKey: ["overallScoreSASB"],
    queryFn: async () => {
      const response = await fetch("/api/v1/sasb");
      return response.json();
    },
  });
};

import { client } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseSavedJobs = (token: string | null) => {
  return useSuspenseQuery({
    queryKey: ["jobs", "saved", token],
    queryFn: async () => {
      const response = await client["saved-jobs"].$get({
        header: {
          authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching saved jobs");
      }

      return await response.json();
    },
  });
};

export default useSuspenseSavedJobs;

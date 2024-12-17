import { useToast } from "@/_hooks/misc/use-toast";
import { client } from "@/_lib/api";
import { isArrayOfStrings } from "@/_lib/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveSavedJobMutation = (token: string | null) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (postingId: string) => {
      const response = await client["saved-jobs"][":postingId"].$delete({
        header: {
          authorization: token ? `Bearer ${token}` : undefined,
        },
        param: {
          postingId,
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting the job");
      }

      return await response.json();
    },
    // When mutate is called:
    onMutate: async (postingId) => {
      const queryKey = ["jobs", "saved", token];

      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousSavedJobs = queryClient.getQueryData(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, (old: unknown) => {
        if (isArrayOfStrings(old)) {
          return old.filter((item) => item !== postingId);
        }

        return [];
      });

      // Return a context object with the snapshotted value
      return { previousSavedJobs };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ["jobs", "saved", token],
        context?.previousSavedJobs,
      );

      toast({
        variant: "destructive",
        description: "Error removing the job",
      });
    },
    onSuccess: () => {
      toast({
        description: "Removed the job",
      });
    },
  });
};

export default useRemoveSavedJobMutation;

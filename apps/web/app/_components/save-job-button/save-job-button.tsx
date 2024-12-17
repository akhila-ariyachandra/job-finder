"use client";

import { Button } from "@/_components/ui/button";
import useSuspenseSavedJobs from "@/_hooks/job/use-suspense-saved-jobs.hook";
import { Bookmark, BookmarkCheck } from "lucide-react";
import useRemoveSavedJobMutation from "./use-remove-saved-job-mutation.hook";
import useSaveJobMutation from "./use-save-job-mutation.hook";

const SaveJobButton = ({
  token,
  postingId,
}: {
  token: string | null;
  postingId: string;
}) => {
  const savedJobsQuery = useSuspenseSavedJobs(token);

  const isSaved = savedJobsQuery.data.includes(postingId);

  const saveJobMutation = useSaveJobMutation(token);
  const removeSavedJobMutation = useRemoveSavedJobMutation(token);

  const toggleSave = () => {
    if (!isSaved) {
      saveJobMutation.mutate(postingId);
    } else {
      removeSavedJobMutation.mutate(postingId);
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleSave}>
      {isSaved ? <BookmarkCheck /> : <Bookmark />}

      <span className="sr-only">
        {isSaved ? "Remove saved job" : "Save job"}
      </span>
    </Button>
  );
};

export default SaveJobButton;

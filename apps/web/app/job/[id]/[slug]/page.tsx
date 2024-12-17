import SaveJobButton from "@/_components/save-job-button";
import { client } from "@/_lib/api";
import { notFound } from "next/navigation";

const JobPostingPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}) => {
  const { id, slug } = await params;

  const response = await client.postings[":id"][":slug"].$get({
    param: { id, slug },
  });

  if (response.status === 404) {
    notFound();
  } else if (!response.ok) {
    const data = await response.json();

    throw new Error("Error fetching job", { cause: data });
  }

  const job = await response.json();

  return (
    <>
      <div>
        <SaveJobButton postingId={id} />
      </div>

      <h1>{job.title}</h1>

      {/* eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml */}
      <div dangerouslySetInnerHTML={{ __html: job.description }} />
    </>
  );
};

export default JobPostingPage;

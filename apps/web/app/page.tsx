import { client } from "@/_lib/api";
import { unstable_cache as cache } from "next/cache";
import Link from "next/link";

const Home = async () => {
  const jobs = await getCachedJobs();

  return (
    <>
      <h1>Home Page</h1>

      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <Link href={`/job/${job.id}/${job.slug}`}>{job.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;

const getCachedJobs = cache(
  async () => {
    const response = await client.postings.$get();

    return response.json();
  },
  ["jobs"],
  { revalidate: 60 },
);

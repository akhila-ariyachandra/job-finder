import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import NewJobForm from "./new-job-form";

export const metadata: Metadata = {
  title: "New Job",
};

const NewJobPage = async () => {
  const { getToken, redirectToSignIn } = await auth();

  const token = await getToken();

  if (!token) {
    return redirectToSignIn();
  }

  return <NewJobForm token={token} />;
};

export default NewJobPage;

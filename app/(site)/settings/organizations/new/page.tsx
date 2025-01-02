import { protectResource } from "@/lib/server-utils";
import type { Metadata } from "next";
import NewOrganizationForm from "./new-organization-form";

export const metadata: Metadata = {
  title: "New Organization",
};

const NewOrganizationPage = async () => {
  await protectResource();

  return <NewOrganizationForm />;
};

export default NewOrganizationPage;

import { protectResource } from "@/lib/server-utils";

const AccountOrganizationsPage = async () => {
  await protectResource();

  return null;
};

export default AccountOrganizationsPage;

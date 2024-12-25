import { protectPage } from "@/lib/server-utils";

const AccountOrganizationsPage = async () => {
  await protectPage();

  return null;
};

export default AccountOrganizationsPage;

import { protectPage } from "@/lib/server-utils";

const AccountProfilePage = async () => {
  await protectPage();

  return null;
};

export default AccountProfilePage;

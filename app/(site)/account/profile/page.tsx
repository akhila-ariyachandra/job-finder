import { protectPage } from "@/lib/server-utils";
import ProfileSettingsForm from "./profile-settings-form";

const AccountProfilePage = async () => {
  const { user } = await protectPage();

  return (
    <ProfileSettingsForm
      initialProfile={{
        avatar: user?.image ?? undefined,
        name: user?.name ?? "",
      }}
    />
  );
};

export default AccountProfilePage;

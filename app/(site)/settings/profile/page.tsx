import { protectResource } from "@/lib/server-utils";
import type { Metadata } from "next";
import ProfileSettingsForm from "./profile-settings-form";

export const metadata: Metadata = {
  title: "Profile",
};

const AccountProfilePage = async () => {
  const user = await protectResource();

  return (
    <ProfileSettingsForm
      initialProfile={{
        avatar: user.image ?? undefined,
        name: user.name ?? "",
      }}
    />
  );
};

export default AccountProfilePage;

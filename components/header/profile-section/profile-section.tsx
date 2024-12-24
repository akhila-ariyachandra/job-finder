import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import UserDropdownMenu from "./user-dropdown-menu";

const ProfileSection = () => {
  return (
    <Suspense fallback={<div className="invisible size-9" />}>
      <ProfileSectionAuth />
    </Suspense>
  );
};

export default ProfileSection;

const ProfileSectionAuth = async () => {
  const session = await auth();

  if (session?.user) {
    return <UserDropdownMenu user={session.user} />;
  }

  return (
    <Link href="/login" className={buttonVariants()}>
      Login
    </Link>
  );
};

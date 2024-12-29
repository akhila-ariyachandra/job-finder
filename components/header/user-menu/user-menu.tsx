import { auth } from "@/auth";
import { CircleUserRound } from "lucide-react";
import { Suspense } from "react";
import UserMenuContent from "./user-menu-content";

const UserMenu = () => {
  return (
    <Suspense fallback={<CircleUserRound size={36} strokeWidth={1} />}>
      <UserMenuAuth />
    </Suspense>
  );
};

export default UserMenu;

const UserMenuAuth = async () => {
  const session = await auth();

  return <UserMenuContent user={session?.user} />;
};

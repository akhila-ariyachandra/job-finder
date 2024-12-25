import { auth } from "@/auth";
import { CircleUserRound } from "lucide-react";
import { Suspense } from "react";
import UserDropdownMenuContent from "./user-dropdown-menu-content";

const UserDropdownMenu = () => {
  return (
    <Suspense fallback={<CircleUserRound size={36} strokeWidth={1} />}>
      <UserDropdownMenuAuth />
    </Suspense>
  );
};

export default UserDropdownMenu;

const UserDropdownMenuAuth = async () => {
  const session = await auth();

  return <UserDropdownMenuContent user={session?.user} />;
};

import { SITE_TITLE } from "@/lib/constants";
import Link from "next/link";
import UserDropdownMenu from "./user-dropdown-menu";

const Header = () => {
  return (
    <header>
      <div className="mx-auto flex max-w-screen-lg items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          {SITE_TITLE}
        </Link>

        <UserDropdownMenu />
      </div>
    </header>
  );
};

export default Header;

import { SITE_TITLE } from "@/lib/constants";
import Link from "next/link";
import { Suspense } from "react";
import ProfileSection from "./profile-section";

const Header = () => {
  return (
    <header>
      <div className="mx-auto flex max-w-screen-lg items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          {SITE_TITLE}
        </Link>

        <Suspense>
          <ProfileSection />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;

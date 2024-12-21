import { auth, signOut } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

const Header = () => {
  return (
    <header>
      <div className="mx-auto flex max-w-screen-lg items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          Job Finder
        </Link>

        <Suspense>
          <ProfileSection />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;

const ProfileSection = async () => {
  const session = await auth();

  if (session) {
    return (
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    );
  }

  return (
    <Link href="/sign-in" className={buttonVariants()}>
      Sign In
    </Link>
  );
};

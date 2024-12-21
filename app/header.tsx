import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="mx-auto flex max-w-screen-lg items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          Job Finder
        </Link>

        <Link href="/sign-in" className={buttonVariants()}>
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;

import { signIn } from "@/auth";
import GitHub from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-stretch gap-4 rounded border border-slate-100 px-16 py-4 shadow-md">
      <h1 className="text-center text-xl font-semibold">
        Sign In to Job Finder
      </h1>

      <form
        action={async () => {
          "use server";

          await signIn("github", {
            redirectTo: "/",
          });
        }}
      >
        <Button type="submit" variant="outline" className="w-full">
          <GitHub width={16} height={16} />

          <span>Continue with GitHub</span>
        </Button>
      </form>
    </div>
  );
};

export default SignInPage;

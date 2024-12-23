import GitHub from "@/components/icons/github";
import type { Metadata } from "next";
import ProviderSignInButton from "./provider-sign-in-button";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-stretch gap-4 rounded border border-slate-100 px-16 py-4 shadow-md">
      <h1 className="text-center text-xl font-semibold">
        Sign In to Job Finder
      </h1>

      <ProviderSignInButton provider="github">
        <GitHub width={16} height={16} />

        <span>Continue with GitHub</span>
      </ProviderSignInButton>
    </div>
  );
};

export default SignInPage;

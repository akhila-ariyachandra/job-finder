"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { type ReactNode, useActionState } from "react";
import { signIn as signInAction } from "./actions";

const ProviderSignInButton = ({
  provider,
  children,
}: {
  provider: "github";
  children: ReactNode;
}) => {
  const [, formAction, isPending] = useActionState(signInAction, undefined);

  return (
    <form action={formAction}>
      <input type="hidden" name="provider" value={provider} />

      <Button
        type="submit"
        variant="outline"
        className="w-full"
        disabled={isPending}
      >
        {isPending && <LoaderCircle className="animate-spin" size={16} />}

        {children}
      </Button>
    </form>
  );
};

export default ProviderSignInButton;

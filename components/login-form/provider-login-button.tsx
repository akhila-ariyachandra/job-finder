"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { type ReactNode, useActionState } from "react";
import { login } from "./actions";

const ProviderLoginButton = ({
  provider,
  children,
}: {
  provider: "github";
  children: ReactNode;
}) => {
  const [, formAction, isPending] = useActionState(login, undefined);

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

export default ProviderLoginButton;

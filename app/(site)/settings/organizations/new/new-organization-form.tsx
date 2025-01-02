"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { useActionState, useState } from "react";
import { createOrganizationAction } from "./actions";

const NewOrganizationForm = () => {
  const [state, action, isPending] = useActionState(
    createOrganizationAction,
    undefined,
  );
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const { toast } = useToast();

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>New Organization</CardTitle>
      </CardHeader>

      <form action={action}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="space-y-2">
            <Label>Organization Logo</Label>

            <div className="flex items-center space-x-4">
              {!!logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt="Organization logo"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover"
                />
              )}

              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res[0]) {
                    setLogoUrl(res[0].url);
                  }
                }}
                onUploadError={() => {
                  toast({
                    title: "Error uploading image",
                    variant: "destructive",
                  });
                }}
              />
            </div>
          </div>

          <Input type="hidden" name="logoUrl" value={logoUrl ?? ""} />
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className={cn("w-full", { "opacity-50": isPending })}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Organization"}
          </Button>
        </CardFooter>
      </form>

      {!!isActionError(state) && (
        <div
          className={cn("mt-4 rounded-md p-4", {
            "bg-red-100 text-red-800": state.error,
          })}
        >
          {state.error}
        </div>
      )}
    </Card>
  );
};

export default NewOrganizationForm;

const isActionError = (state: unknown): state is { error: string } => {
  return (
    typeof state !== "undefined" &&
    typeof state === "object" &&
    typeof (state as { error: string }).error === "string"
  );
};

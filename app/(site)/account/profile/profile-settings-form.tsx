"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/lib/uploadthing";
import { useActionState, useTransition } from "react";
import { afterUploadProfileImageAction, updateNameAction } from "./actions";

type Profile = {
  name: string;
  avatar?: string;
};

const ProfileSettingsForm = ({
  initialProfile,
}: {
  initialProfile: Profile;
}) => {
  const [isPending, startTransition] = useTransition();

  const [nameState, nameAction] = useActionState(updateNameAction, {
    message: "",
    name: initialProfile.name,
  });

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={initialProfile.avatar} alt="Profile picture" />
            <AvatarFallback>
              {initialProfile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
              startTransition(afterUploadProfileImageAction);
            }}
            disabled={isPending}
          />
        </div>

        <form action={nameAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              defaultValue={nameState.name}
              type="text"
              required
              minLength={6}
              autoComplete="name"
            />
          </div>

          <Button type="submit" className="w-full">
            Save Name
          </Button>

          {nameState.error && (
            <p className="mt-2 text-sm text-red-500">{nameState.error}</p>
          )}
          {nameState.message && (
            <p className="mt-2 text-sm text-green-500">{nameState.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettingsForm;

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useActionState, useOptimistic, useRef } from "react";
import { updateName, updateProfilePicture } from "./actions";

type Profile = {
  name: string;
  avatar?: string;
};

const ProfileSettingsForm = ({
  initialProfile,
}: {
  initialProfile: Profile;
}) => {
  const nameFormRef = useRef<HTMLFormElement>(null);
  const avatarFormRef = useRef<HTMLFormElement>(null);

  const [nameState, nameAction] = useActionState(updateName, {
    message: "",
    error: undefined,
  });

  const [avatarState, avatarAction] = useActionState(updateProfilePicture, {
    message: "",
    error: undefined,
  });

  const [optimisticProfile, setOptimisticProfile] = useOptimistic(
    initialProfile,
    (state, newProfile: Partial<Profile>) => ({ ...state, ...newProfile }),
  );

  const handleNameSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    setOptimisticProfile({ name });
    nameAction(formData);
  };

  const handleAvatarSubmit = (formData: FormData) => {
    const avatarFile = formData.get("avatar") as File;
    if (avatarFile.size > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOptimisticProfile({ avatar: reader.result as string });
      };
      reader.readAsDataURL(avatarFile);
    }
    avatarAction(formData);
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form
          ref={avatarFormRef}
          action={handleAvatarSubmit}
          className="space-y-4"
        >
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={optimisticProfile.avatar}
                alt="Profile picture"
              />
              <AvatarFallback>
                {optimisticProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center space-x-2">
              <Input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    avatarFormRef.current?.requestSubmit();
                  }
                }}
              />
              <Label htmlFor="avatar" className="cursor-pointer">
                <div className="flex items-center space-x-2 rounded-md bg-slate-100 px-3 py-2 text-slate-700 transition-colors hover:bg-slate-200">
                  <Upload size={16} />
                  <span>Upload new picture</span>
                </div>
              </Label>
            </div>
          </div>
          {avatarState.error && (
            <p className="mt-2 text-sm text-red-500">{avatarState.error}</p>
          )}
          {avatarState.message && (
            <p className="mt-2 text-sm text-green-500">{avatarState.message}</p>
          )}
        </form>

        <form ref={nameFormRef} action={handleNameSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              value={optimisticProfile.name}
              onChange={(e) => {
                setOptimisticProfile({ name: e.target.value });
              }}
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

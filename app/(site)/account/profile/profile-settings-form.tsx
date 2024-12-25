"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useActionState, useOptimistic, useRef } from "react";
import { updateProfileAction } from "./actions";

type Profile = {
  name: string;
  avatar?: string;
};

const ProfileSettingsForm = ({
  initialProfile,
}: {
  initialProfile: Profile;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(updateProfileAction, {
    message: "",
    error: undefined,
  });

  const [optimisticProfile, setOptimisticProfile] = useOptimistic(
    initialProfile,
    (state, newProfile: Partial<Profile>) => ({ ...state, ...newProfile }),
  );

  const handleSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    const avatarFile = formData.get("avatar") as File;

    // Create an optimistic update
    setOptimisticProfile({ name });

    if (avatarFile.size > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOptimisticProfile({ avatar: reader.result as string });
      };
      reader.readAsDataURL(avatarFile);
    }

    // Call the server action
    formAction(formData);
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={handleSubmit} className="space-y-6">
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
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setOptimisticProfile({ avatar: reader.result as string });
                    };
                    reader.readAsDataURL(file);
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
            Save Changes
          </Button>
          {state.error && (
            <p className="mt-2 text-sm text-red-500">{state.error}</p>
          )}
          {state.message && (
            <p className="mt-2 text-sm text-green-500">{state.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettingsForm;

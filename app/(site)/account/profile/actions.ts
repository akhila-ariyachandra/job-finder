"use server";

import { revalidatePath } from "next/cache";

export const updateName = async (
  prevState:
    | { message: string; error: undefined }
    | { message: undefined; error: string },
  formData: FormData,
) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const name = formData.get("name") as string;

  // Simulating an error condition (1 in 4 chance)
  if (Math.random() < 0.25) {
    return { error: "Failed to update name. Please try again." };
  }

  // Simulating a successful update
  // eslint-disable-next-line no-console
  console.log("Name updated:", name);

  // Revalidate the page to reflect the changes
  revalidatePath("/");

  return { message: "Name updated successfully!" };
};

export const updateProfilePicture = async (
  prevState:
    | { message: string; error: undefined }
    | { message: undefined; error: string },
  formData: FormData,
) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const avatar = formData.get("avatar") as File;

  // Simulating an error condition (1 in 4 chance)
  if (Math.random() < 0.25) {
    return { error: "Failed to update profile picture. Please try again." };
  }

  // Simulating a successful update
  // eslint-disable-next-line no-console
  console.log("Profile picture updated:", avatar.name);

  // Revalidate the page to reflect the changes
  revalidatePath("/");

  return { message: "Profile picture updated successfully!" };
};

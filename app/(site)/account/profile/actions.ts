"use server";

import { revalidatePath } from "next/cache";

export const updateProfileAction = async (
  prevState: {
    message?: string;
    error?: string;
  },
  formData: FormData,
) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would update the database here
  const name = formData.get("name") as string;
  const avatar = formData.get("avatar") as File;

  // Simulating an error condition (1 in 4 chance)
  if (Math.random() < 0.25) {
    return { error: "Failed to update profile. Please try again." };
  }

  // Simulating a successful update
  // eslint-disable-next-line no-console
  console.log("Profile updated:", { name, avatar: avatar.name });

  // Revalidate the page to reflect the changes
  revalidatePath("/account/profile");

  return { message: "Profile updated successfully!" };
};

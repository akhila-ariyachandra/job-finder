"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { protectResource } from "@/lib/server-utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const nameSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long"),
});

type UpdateNameState = { name: string; message?: string; error?: string };
export const updateNameAction = async (
  prevState: UpdateNameState,
  formData: FormData,
): Promise<UpdateNameState> => {
  const user = await protectResource();

  const result = await nameSchema.safeParseAsync({
    name: formData.get("name"),
  });

  if (!result.success) {
    return {
      name: formData.get("name") as string,
      error: result.error.flatten().formErrors.toString(),
    };
  }

  if (!user.id) {
    return {
      name: result.data.name,
      error: "Unexpected error try again",
    };
  }

  await db
    .update(users)
    .set({ name: result.data.name })
    .where(eq(users.id, user.id));

  // Revalidate the page to reflect the changes
  revalidatePath("/settings/profile");

  return { name: result.data.name, message: "Name updated successfully!" };
};

// eslint-disable-next-line @typescript-eslint/require-await
export const afterUploadProfileImageAction = async () => {
  revalidatePath("/settings/profile");
};

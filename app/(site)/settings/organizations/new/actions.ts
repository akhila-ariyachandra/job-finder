"use server";

import { db } from "@/db";
import { organizationMembers, organizations } from "@/db/schema";
import { MEDIA_URL } from "@/lib/constants";
import { protectResource } from "@/lib/server-utils";
import { redirect, RedirectType, unauthorized } from "next/navigation";
import { z } from "zod";

const createOrganizationSchema = z.object({
  name: z.string(),
  logoUrl: z.string().url().startsWith(MEDIA_URL),
});
type CreateOrganizationSchemaErrors = z.inferFlattenedErrors<
  typeof createOrganizationSchema
>["fieldErrors"];

type CreateOrganizationActionState =
  | undefined
  | {
      errors: CreateOrganizationSchemaErrors;
    }
  | {
      error: string;
    };

export const createOrganizationAction = async (
  previousState: CreateOrganizationActionState,
  formData: FormData,
): Promise<CreateOrganizationActionState> => {
  const user = await protectResource();

  const validatedFields = await createOrganizationSchema.safeParseAsync({
    name: formData.get("name"),
    logoUrl: formData.get("logoUrl"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const userId = user.id;

  if (!userId) {
    unauthorized();
  }

  const organizationId = await db.transaction(async (tx) => {
    const results = await tx
      .insert(organizations)
      .values({
        name: validatedFields.data.name,
        image: validatedFields.data.logoUrl,
        createdBy: userId,
      })
      .returning({ id: organizations.id });

    const result = results[0];

    if (!result) {
      return tx.rollback();
    }

    await tx.insert(organizationMembers).values({
      organizationId: result.id,
      userId,
      role: "admin",
    });

    return result.id;
  });

  if (!organizationId) {
    return {
      error: "Failed to create organization",
    };
  }

  redirect(`/settings/organizations/${organizationId}`, RedirectType.replace);
};

"use server";

import { db } from "@/db";
import { organizationMembers, organizations } from "@/db/schema";
import { MEDIA_URL } from "@/lib/constants";
import { protectResource } from "@/lib/server-utils";
import { ServerAction } from "@/lib/types";
import { eq } from "drizzle-orm";
import { redirect, RedirectType, unauthorized } from "next/navigation";
import { z } from "zod";

const createOrganizationSchema = z.object({
  name: z.string(),
  logoUrl: z.string().url().startsWith(MEDIA_URL),
});

export const createOrganizationAction: ServerAction<
  | undefined
  | {
      errors: z.inferFlattenedErrors<
        typeof createOrganizationSchema
      >["fieldErrors"];
    }
  | {
      error: "Failed to create organization";
    }
> = async (previousState, formData) => {
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

  let organizationId: string | undefined = undefined;

  // Create the organization
  try {
    const insertResults = await db
      .insert(organizations)
      .values({
        name: validatedFields.data.name,
        image: validatedFields.data.logoUrl,
        createdBy: userId,
      })
      .returning({ id: organizations.id });

    organizationId = insertResults[0]?.id;
  } catch {
    return {
      error: "Failed to create organization",
    };
  }

  // If the organization was not created, return early
  if (!organizationId) {
    return {
      error: "Failed to create organization",
    };
  }

  // Add the user as an admin of the organization
  try {
    await db.insert(organizationMembers).values({
      organizationId,
      userId,
      role: "admin",
    });
  } catch {
    // If this fails, delete the organization and return early
    await db.delete(organizations).where(eq(organizations.id, organizationId));

    return {
      error: "Failed to create organization",
    };
  }

  redirect(`/settings/organizations/${organizationId}`, RedirectType.replace);
};

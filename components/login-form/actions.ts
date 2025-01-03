"use server";

import { signIn } from "@/auth";
import type { ServerAction } from "@/lib/types";
import { z } from "zod";

const providersSchema = z.enum(["github"]);

export const loginAction: ServerAction<undefined> = async (
  prevState,
  formData,
) => {
  const provider = await providersSchema.parseAsync(formData.get("provider"));

  await signIn(provider, {
    redirectTo: "/",
  });

  return undefined;
};

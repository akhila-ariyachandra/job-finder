"use server";

import { signIn as signInPrimitive } from "@/auth";
import { z } from "zod";

const providersSchema = z.enum(["github"]);

export const signIn = async (prevState: undefined, formData: FormData) => {
  const provider = await providersSchema.parseAsync(formData.get("provider"));

  await signInPrimitive(provider, {
    redirectTo: "/",
  });

  return undefined;
};

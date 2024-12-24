"use server";

import { signIn } from "@/auth";
import { z } from "zod";

const providersSchema = z.enum(["github"]);

export const login = async (prevState: undefined, formData: FormData) => {
  const provider = await providersSchema.parseAsync(formData.get("provider"));

  await signIn(provider, {
    redirectTo: "/",
  });

  return undefined;
};

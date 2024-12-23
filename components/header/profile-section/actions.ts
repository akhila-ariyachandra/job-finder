"use server";

import { signOut as signOutPrimitive } from "@/auth";

export const signOut = async () => {
  await signOutPrimitive();
};

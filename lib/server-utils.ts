import { auth } from "@/auth";
import { unauthorized } from "next/navigation";
import "server-only";

/**
 * Protects a page from unauthorized access and returns
 * the current session if the user is authenticated.
 */
export const protectPage = async () => {
  const session = await auth();

  if (!session) {
    unauthorized();
  }

  return session;
};

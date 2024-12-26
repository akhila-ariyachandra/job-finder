import { auth } from "@/auth";
import { unauthorized } from "next/navigation";
import "server-only";

/**
 * Protects a resource from unauthorized access and returns
 * the current user if they are authenticated.
 */
export const protectResource = async () => {
  const session = await auth();

  if (!session?.user) {
    unauthorized();
  }

  return session.user;
};

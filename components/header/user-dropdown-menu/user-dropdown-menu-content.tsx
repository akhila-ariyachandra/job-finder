"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import type { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { logout as logoutAction } from "./actions";

const UserDropdownMenuContent = ({ user }: { user?: User | null }) => {
  const [isPending, startTransition] = useTransition();

  const logout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isPending}>
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "User profile picture"}
            width={36}
            height={36}
            unoptimized
            className="rounded-full"
          />
        ) : (
          <CircleUserRound size={36} strokeWidth={1} />
        )}

        <span className="sr-only">Open user dropdown</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.name ?? "My Account"}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>

        <DropdownMenuSeparator />

        {user ? (
          <DropdownMenuItem onClick={logout} disabled={isPending}>
            Logout
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/login">Login</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenuContent;

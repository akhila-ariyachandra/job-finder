"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  {
    label: "Profile",
    href: "/account/profile",
  },
  {
    label: "Organizations",
    href: "/account/organizations",
  },
];

const AccountNavigation = () => {
  const pathname = usePathname();

  return (
    <aside>
      <nav className="flex flex-col gap-2">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex h-9 items-center rounded-md p-4",
              pathname === link.href && "bg-muted",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AccountNavigation;

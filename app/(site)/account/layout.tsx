import { Separator } from "@/components/ui/separator";
import { type ReactNode } from "react";
import AccountNavigation from "./account-navigation";

const AccountLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="mx-auto max-w-screen-lg p-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>

        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-row">
        <AccountNavigation />

        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
};

export default AccountLayout;

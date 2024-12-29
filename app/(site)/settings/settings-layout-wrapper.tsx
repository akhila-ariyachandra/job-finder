"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

const SettingsLayoutWrapper = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    { href: "/settings/profile", label: "Profile" },
    { href: "/settings/organizations", label: "Organizations" },
  ];

  return (
    <div className="w-full max-w-screen-lg flex-1 self-center bg-slate-50 dark:bg-slate-900">
      <header className="sticky top-0 z-40 w-full border-b bg-slate-100 dark:bg-slate-800">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Settings
          </h1>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </header>

      <div className="container relative items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside
          className={cn(
            "absolute inset-y-0 left-0 z-30 w-full flex-1 shrink-0 overflow-y-auto border-r bg-slate-100 dark:bg-slate-800 md:sticky md:block",
            sidebarOpen ? "block" : "hidden",
          )}
        >
          <ScrollArea className="px-6 py-6 lg:py-8">
            <h2 className="px-4 text-lg font-semibold tracking-tight">
              Navigation
            </h2>
            <nav className="mt-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-200 dark:text-slate-50 dark:hover:bg-slate-700"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </aside>

        <main className="flex w-full flex-col overflow-hidden">
          <div className="mx-auto w-full max-w-2xl space-y-6 p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsLayoutWrapper;

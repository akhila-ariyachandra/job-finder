import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import OrganizationsTable from "./organizations-table";

export const metadata: Metadata = {
  title: "Organizations",
};

const AccountOrganizationsPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Organizations</h2>

        <Button asChild>
          <Link href="/settings/organizations/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Organization
          </Link>
        </Button>
      </div>

      <Suspense fallback={<Skeleton className="h-[9.625rem]" />}>
        <OrganizationsTable />
      </Suspense>
    </div>
  );
};

export default AccountOrganizationsPage;

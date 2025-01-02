import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { organizationMembers, organizations } from "@/db/schema";
import { protectResource } from "@/lib/server-utils";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

const OrganizationsTable = async () => {
  const user = await protectResource();

  if (!user.id) {
    throw new Error("Invalid user ID");
  }

  const organizationsList = await db
    .select({
      id: organizations.id,
      name: organizations.name,
      image: organizations.image,
    })
    .from(organizationMembers)
    .innerJoin(
      organizations,
      eq(organizationMembers.organizationId, organizations.id),
    )
    .where(eq(organizationMembers.userId, user.id));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <span className="sr-only">Logo</span>
          </TableHead>

          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizationsList.map((organization) => (
          <TableRow key={organization.id}>
            <TableCell>
              <Image
                src={organization.image}
                alt={`${organization.name} logo`}
                width={40}
                height={40}
                className="aspect-square rounded-full object-cover"
              />
            </TableCell>
            <TableCell>
              <Link
                href={`/settings/organizations/${organization.id}`}
                className="text-slate-900 hover:text-slate-700 hover:underline"
              >
                {organization.name}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrganizationsTable;

import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

const Table = ({ className, ...props }: ComponentProps<"table">) => (
  <div className="relative w-full overflow-auto">
    <table
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
);

const TableHeader = ({ className, ...props }: ComponentProps<"thead">) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
);

const TableBody = ({ className, ...props }: ComponentProps<"tbody">) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);

const TableFooter = ({ className, ...props }: ComponentProps<"tfoot">) => (
  <tfoot
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
);

const TableRow = ({ className, ...props }: ComponentProps<"tr">) => (
  <tr
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className,
    )}
    {...props}
  />
);

const TableHead = ({ className, ...props }: ComponentProps<"th">) => (
  <th
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
);

const TableCell = ({ className, ...props }: ComponentProps<"td">) => (
  <td
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
);

const TableCaption = ({ className, ...props }: ComponentProps<"caption">) => (
  <caption
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
);

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};

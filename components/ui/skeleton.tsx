import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

const Skeleton = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("animate-pulse rounded-md bg-primary/10", className)}
    {...props}
  />
);

export { Skeleton };

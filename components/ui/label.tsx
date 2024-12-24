"use client";

import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { type ComponentProps } from "react";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = ({
  className,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root>) => (
  <LabelPrimitive.Root className={cn(labelVariants(), className)} {...props} />
);

export { Label };

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MEDIA_HOSTNAME } from "./constants";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const disableImageOptimization = (src: string) => {
  const url = new URL(src);

  return url.hostname !== MEDIA_HOSTNAME;
};

import slugify from "slugify";
import { z } from "zod";

export const authorizationHeaderSchema = z.custom<`Bearer ${string}`>((val) => {
  if (typeof val === "string") {
    const elements = val.split(" ");

    return elements.length === 2 && elements[0] === "Bearer" && !!elements[1];
  }

  return false;
});

export const getSlug = (value: string): string => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return slugify(value, {
    lower: true,
    strict: true,
    trim: true,
  });
};

export const isArrayOfStrings = (data: unknown): data is string[] => {
  if (Array.isArray(data)) {
    if (!data.length) {
      return true;
    }

    return data.every((item) => typeof item === "string");
  }

  return false;
};

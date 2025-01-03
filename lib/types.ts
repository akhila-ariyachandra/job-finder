export type ServerAction<T> = (
  previousState: T,
  formData: FormData,
) => Promise<T>;

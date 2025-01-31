import { FieldErrors, FieldValues } from "react-hook-form";

export interface FormError {
  id: string;
  message: string;
}

export const flattenErrors = (
  errors: FieldErrors<FieldValues>,
  prefix = ""
): FormError[] => {
  return Object.entries(errors).flatMap(([key, value]) => {
    const id = prefix ? `${prefix}.${key}` : key;

    // Handle FieldError objects
    if (typeof value?.message === "string") {
      return { id, message: value.message };
    }

    // Handle nested objects
    if (typeof value === "object") {
      return flattenErrors(value as FieldErrors<FieldValues>, id);
    }

    // Fallback for any other values
    return { id, message: "" };
  });
};

export const getErrorById = (
  errors: FieldErrors<FieldValues>,
  id: string
): string | undefined => {
  const error = flattenErrors(errors).find((e) => e.id === id);
  return error?.message ? error.message : undefined;
};

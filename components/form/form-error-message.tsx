import { useFormContext } from "react-hook-form";
import { getErrorById } from "./utils/flattenErrors";

interface FormErrorMessageProps {
  name: string;
}

export function FormErrorMessage({ name }: FormErrorMessageProps) {
  const context = useFormContext();
  const error = getErrorById(context.formState.errors, name);
  return error ? <p className="text-sm text-red-500 mt-1">{error}</p> : null;
}

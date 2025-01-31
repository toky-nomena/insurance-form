interface FormErrorMessageProps {
  error: string | undefined;
}

export function FormErrorMessage({ error }: FormErrorMessageProps) {
  return error ? <p className="text-sm text-red-500 mt-1">{error}</p> : null;
}

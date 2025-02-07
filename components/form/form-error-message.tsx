interface FormErrorMessageProps {
  error: string | undefined;
}

export function FormErrorMessage({ error }: FormErrorMessageProps) {
  return error ? (
    <span role="alert" className="text-sm text-red-500 mt-1">
      {error}
    </span>
  ) : null;
}

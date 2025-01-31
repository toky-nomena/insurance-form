"use client";

import { useFormContext } from "react-hook-form";
import { AlertCircle } from "lucide-react";

import { flattenErrors } from "./utils/flattenErrors";

export function FormErrorsSummary() {
  const context = useFormContext();
  const errorList = flattenErrors(context.formState.errors);

  if (errorList.length === 0) return null;

  const plural = errorList.length > 1;

  return (
    <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        <AlertCircle className="w-5 h-5 mr-2 text-red-700" />
        <span className="font-semibold">
          Please make the {errorList.length} following correction
          {plural ? "s" : ""}
        </span>
      </div>
      <ul className="list-disc list-inside space-y-1">
        {errorList.map((error, index) => (
          <li key={error.id} className="text-sm list-none">
            <a
              href={`#${error.id}`}
              className="h-auto p-0 text-red underline-offset-4 hover:text-red/80 font-normal hover:underline"
            >
              {index + 1} - {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

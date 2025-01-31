"use client";

import type { ReactNode } from "react";
import {
  useForm,
  FormProvider,
  type FieldValues,
  type DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { FormErrorsSummary } from "./form-errors-summary";

interface FormHandlerProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  initialData?: DefaultValues<T>;
  onSubmit: (data: T) => void;
  children: ReactNode;
  errorsProps?: {
    title: string;
  };
}

export function FormHandler<T extends FieldValues>({
  schema,
  initialData,
  onSubmit,
  children,
}: FormHandlerProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues: initialData,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6 w-full"
      >
        <FormErrorsSummary />
        {children}
      </form>
    </FormProvider>
  );
}

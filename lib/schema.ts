import { z } from "zod";

import * as S from "@effect/schema/Schema";

// Basic email schema
export const schema = S.Struct({
  firstName: S.String.pipe(S.nonEmptyString(), S.minLength(2)),
  lastName: S.String.pipe(S.nonEmptyString(), S.minLength(2)),
  email: S.String.pipe(
    S.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    S.brand("Email")
  ),
});

export const contactSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email address"),
});

export const insuranceFormSchema = z.object({
  contact: contactSchema,
});

export type InsuranceFormData = z.infer<typeof insuranceFormSchema>;

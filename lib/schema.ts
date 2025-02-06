import { z } from "zod"

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
})


export const insuranceFormSchema = z.object({
  contact: contactSchema,
})

export type InsuranceFormData = z.infer<typeof insuranceFormSchema>


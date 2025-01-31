import { z } from "zod"

export const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a valid address"),
  hadInsurance: z.enum(["yes", "no"], {
    required_error: "Please select an insurance option",
  }),
})

export const driverSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  birthday: z.string().min(1, "Please select a date"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"], {
    required_error: "Please select a marital status",
  }),
  occupation: z.string().min(2, "Please enter an occupation"),
})

export const formSchema = z.object({
  contact: contactSchema,
  driver: driverSchema,
})

export type FormData = z.infer<typeof formSchema>


"use client";

import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormHandler } from "./form/form-handler";
import { InputField } from "./form/form-fields";
import { Button } from "./ui/button";

const formSchema = z.object({
  contact: z.object({
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
  }),
});

type InsuranceFormData = z.infer<typeof formSchema>;

export function InsuranceForm() {
  const onSubmit = (data: InsuranceFormData) => {
    console.log(data);
  };

  return (
    <div className="mx-auto p-4">
      <FormHandler<InsuranceFormData>
        schema={formSchema}
        onSubmit={onSubmit}
        errorsProps={{ title: "Contact errors" }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Contact Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="contact.firstName"
                label="First Name"
                placeholder="Enter first name"
              />
              <InputField
                name="contact.lastName"
                label="Last Name"
                placeholder="Enter last name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="contact.email"
                label="Email"
                placeholder="Enter email"
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-start">
          <Button type="submit">Next</Button>
        </div>
      </FormHandler>
    </div>
  );
}

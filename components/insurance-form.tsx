"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormHandler } from "./form/form-handler";
import { InputField } from "./form/form-fields";
import { Button } from "./ui/button";
import { InsuranceFormData, insuranceFormSchema } from "@/lib/schema";

export function InsuranceForm() {
  const onSubmit = (data: InsuranceFormData) => {
    console.log(data);
  };

  return (
    <FormHandler<InsuranceFormData>
      schema={insuranceFormSchema}
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
  );
}

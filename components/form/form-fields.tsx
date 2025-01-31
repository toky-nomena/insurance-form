import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormErrorMessage } from "./form-error-message";
import { getErrorById } from "./utils/flattenErrors";
import { cn } from "@/lib/utils";

interface FormElementProps {
  name: string;
  label: string;
}

interface InputFieldProps extends FormElementProps {
  type?: string;
  placeholder?: string;
}

interface SelectFieldProps extends FormElementProps {
  options: { value: string; label: string }[];
}

interface RadioFieldProps extends FormElementProps {
  options: { value: string; label: string }[];
}

type Register = ReturnType<typeof useFormContext>["register"];

interface FormFieldProps {
  name: string;
  label: string;
  children: (context: Register, error?: string) => React.ReactNode;
}

function FormField({ children, name, label }: FormFieldProps) {
  const context = useFormContext();
  const error = getErrorById(context.formState.errors, name);

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      {children(context.register, error)}
      <FormErrorMessage error={error} />
    </div>
  );
}

export function InputField({
  name,
  label,
  type = "text",
  placeholder,
}: InputFieldProps) {
  return (
    <FormField name={name} label={label}>
      {(register, error) => (
        <Input
          id={name}
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className={error ? "border-red-500" : ""}
        />
      )}
    </FormField>
  );
}

export function SelectField({ name, label, options }: SelectFieldProps) {
  return (
    <FormField name={name} label={label}>
      {(register, error) => (
        <Select {...register(name)}>
          <SelectTrigger className={error ? "border-red-500" : ""}>
            <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FormField>
  );
}

export function RadioField({ name, label, options }: RadioFieldProps) {
  return (
    <FormField name={name} label={label}>
      {(register, error) => (
        <>
          <RadioGroup
            {...register(name)}
            className={cn("flex space-x-4", error ? "border-red-500" : "")}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${name}-${option.value}`}
                />
                <Label htmlFor={`${name}-${option.value}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </>
      )}
    </FormField>
  );
}

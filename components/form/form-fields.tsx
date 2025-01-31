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

interface FormFieldProps {
  name: string;
  label: string;
}

interface InputFieldProps extends FormFieldProps {
  type?: string;
  placeholder?: string;
}

interface SelectFieldProps extends FormFieldProps {
  options: { value: string; label: string }[];
}

interface RadioFieldProps extends FormFieldProps {
  options: { value: string; label: string }[];
}

export function InputField({
  name,
  label,
  type = "text",
  placeholder,
}: InputFieldProps) {
  const { register } = useFormContext();

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
      />
      <FormErrorMessage name={name} />
    </div>
  );
}

export function SelectField({ name, label, options }: SelectFieldProps) {
  const { register } = useFormContext();

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Select {...register(name)}>
        <SelectTrigger>
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
      <FormErrorMessage name={name} />
    </div>
  );
}

export function RadioField({ name, label, options }: RadioFieldProps) {
  const { register } = useFormContext();

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <RadioGroup {...register(name)} className="flex space-x-4">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
            />
            <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <FormErrorMessage name={name} />
    </div>
  );
}

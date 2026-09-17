"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: string;
  inputClassName?: string;
  inputGroupClassName?: string;
};

export function FormInput<T extends FieldValues>(props: FormInputProps<T>) {
  const {
    control,
    name,
    label,
    placeholder,
    icon,
    type = "text",
    inputClassName,
    inputGroupClassName,
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="group">
          {label && (
            <FieldLabel
              htmlFor={name}
              className="mb-1 text-sm text-muted group-focus-within:text-zinc-200 capitalize"
            >
              {label}
            </FieldLabel>
          )}

          <InputGroup className={inputGroupClassName}>
            <InputGroupInput
              {...field}
              className={cn("placeholder:text-muted", inputClassName)}
              id={name}
              type={type}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              autoComplete="off"
            />

            {icon && (
              <InputGroupAddon align="inline-start" className="pl-4 pr-2">
                {icon}
              </InputGroupAddon>
            )}
          </InputGroup>

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

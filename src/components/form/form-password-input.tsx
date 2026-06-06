"use client";

import { useState } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type FormPasswordInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
};

export function FormPasswordInput<T extends FieldValues>(
  props: FormPasswordInputProps<T>,
) {
  const [showPassword, setShowPassword] = useState(false);
  const { control, name, label = "Password" } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name} className="mb-1 text-sm text-zinc-400">
            {label}
          </FieldLabel>

          <InputGroup>
            <InputGroupInput
              {...field}
              id={name}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              aria-invalid={fieldState.invalid}
            />

            <InputGroupAddon align="inline-start" className="pl-4 pr-2">
              <Lock className="size-5 text-zinc-500" />
            </InputGroupAddon>

            <InputGroupAddon align="inline-end" className="pl-2 pr-4">
              <button
                type="button"
                className=" cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <Eye className="size-5 text-zinc-500" />
                ) : (
                  <EyeOff className="size-5 text-zinc-500" />
                )}
              </button>
            </InputGroupAddon>
          </InputGroup>

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

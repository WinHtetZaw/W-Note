import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FormSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  selectValues: Array<{ name: string; value: string }>;
  contentAlign?: "item-aligned" | "popper";
};

export default function FormSelect<T extends FieldValues>(
  props: FormSelectProps<T>,
) {
  const {
    control,
    name,
    label,
    selectValues,
    placeholder = "Select",
    contentAlign = "item-aligned",
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation="responsive" data-invalid={fieldState.invalid}>
          {/* <FieldContent>
        <FieldLabel htmlFor="form-rhf-select-language">
          Spoken Language
        </FieldLabel>
        <FieldDescription>
          For best results, select the language you speak.
        </FieldDescription>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent> */}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          {label && (
            <FieldLabel htmlFor={name} className="mb-1 text-sm text-zinc-400">
              {label}
            </FieldLabel>
          )}
          commant
          <Select
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              id="form-rhf-select-language"
              aria-invalid={fieldState.invalid}
              className="min-w-30"
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position={contentAlign}>
              {selectValues.map((el) => (
                <SelectItem value={el.value} className="capitalize">
                  {el.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
}

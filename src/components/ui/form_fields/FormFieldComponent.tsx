import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormFieldComponentProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; // Ensures `name` is typed as Path<T>
  label: string;
  placeholder?: string;
  type: string;
}

const FormFieldComponent = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
}: FormFieldComponentProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex-grow">
        <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
          {label}
        </FormLabel>
        <FormControl>
          <Input
            {...field}
            placeholder={placeholder}
            className="h-16 text-placeholder_text font-sm font-normal w-full"
            type={type}
          />
        </FormControl>
        <FormMessage className="text-[#E75F51] text-[13px] font-light" />
      </FormItem>
    )}
  />
);

export default FormFieldComponent;

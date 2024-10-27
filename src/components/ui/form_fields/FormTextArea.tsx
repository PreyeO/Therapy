import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldComponentProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; // Ensures `name` is typed as Path<T>
  label: string;
  placeholder: string;
}

const FormTextArea = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
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
          <Textarea
            className="h-16 text-placeholder_text font-sm font-normal w-full bg-white"
            autoComplete="off"
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
        <FormMessage className="text-[#E75F51] text-[13px] font-light" />
      </FormItem>
    )}
  />
);

export default FormTextArea;

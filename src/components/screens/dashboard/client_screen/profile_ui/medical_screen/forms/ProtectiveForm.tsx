import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { medicationSchema } from "@/types/formSchema";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProtectiveForm = () => {
  const form = useForm({
    resolver: zodResolver(medicationSchema),
  });

  return (
    <div className="flex flex-col gap-5 scale-95">
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="medication_name"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Clinician
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal w-full"
                    autoComplete="off"
                    placeholder="Enter the name of medication"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
          <FormItem className="">
            <FormLabel className="text-base font-medium text-primary_black_text">
              Type
            </FormLabel>
            <Select>
              <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="BID">BID</SelectItem>
                <SelectItem value="TID">TID</SelectItem>
                <SelectItem value="QID">QID</SelectItem>
                <SelectItem value="PRN">PRN</SelectItem>
                <SelectItem value="once_a_week">Once a week</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
          <FormField
            control={form.control}
            name="medication_prescriber"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Date
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal w-full"
                    autoComplete="off"
                    placeholder="Enter the name of medication"
                    type="date"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Progress Note
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal w-full"
                    autoComplete="off"
                    placeholder="Enter notes"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Note
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal w-full"
                    autoComplete="off"
                    placeholder="Enter notes"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
          <Button className="rounded-full h-[63px] text-xl font-medium">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default ProtectiveForm;

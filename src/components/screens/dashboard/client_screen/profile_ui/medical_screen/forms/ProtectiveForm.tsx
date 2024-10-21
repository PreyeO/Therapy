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
import { Textarea } from "@/components/ui/textarea";

const ProtectiveForm = () => {
  const form = useForm({
    resolver: zodResolver(medicationSchema),
  });

  return (
    <div className="flex flex-col gap-5 scale-95">
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <FormItem className="">
            <FormLabel className="text-base font-medium text-primary_black_text">
              Protective Factor
            </FormLabel>
            <Select>
              <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                <SelectValue placeholder="Select protective factor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">
                  Responsibility to family or children
                </SelectItem>
                <SelectItem value="BID">Spiritual/religious beliefs</SelectItem>
                <SelectItem value="TID">Perceived social support</SelectItem>
                <SelectItem value="QID">Other</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="h-16 text-placeholder_text font-sm font-normal w-full bg-white"
                    autoComplete="off"
                    placeholder="Enter a description of how this factor protects you"
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
                  <Textarea
                    className="h-16 text-placeholder_text font-sm font-normal w-full bg-white"
                    autoComplete="off"
                    placeholder="Enter any additional notes"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />

          <Button className="rounded-full h-[63px] text-xl font-medium mt-[10px]">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default ProtectiveForm;

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

const SocialSupportForm = () => {
  const form = useForm({
    resolver: zodResolver(medicationSchema),
  });

  return (
    <div className="flex flex-col gap-5 scale-95">
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <FormItem className="">
            <FormLabel className="text-base font-medium text-primary_black_text">
              Type of Support
            </FormLabel>
            <Select>
              <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Family</SelectItem>
                <SelectItem value="BID">friend</SelectItem>
                <SelectItem value="TID">peer support</SelectItem>
                <SelectItem value="QID">spiritual community</SelectItem>
                <SelectItem value="PRN">faith-based community</SelectItem>
                <SelectItem value="once_a_week">online community</SelectItem>
                <SelectItem value="once_a_week">recreational club</SelectItem>
                <SelectItem value="once_a_week">sports team</SelectItem>
                <SelectItem value="once_a_week">mentor</SelectItem>
                <SelectItem value="once_a_week">
                  cultural organization
                </SelectItem>
                <SelectItem value="once_a_week">other</SelectItem>
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
                    placeholder="Enter a description of the social support (e.g., close-knit family)"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
          <FormItem className="">
            <FormLabel className="text-base font-medium text-primary_black_text">
              Strength
            </FormLabel>
            <Select>
              <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                <SelectValue placeholder="Select support strength" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Weak</SelectItem>
                <SelectItem value="BID">Moderate</SelectItem>
                <SelectItem value="TID">Strong</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>

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
                    placeholder="Enter any additional details or notes"
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
export default SocialSupportForm;

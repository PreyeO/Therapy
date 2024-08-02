// FourthStep.tsx

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { therapistSetupFormSchema } from "@/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SetupHeader from "../SetupHeader";

const FourthStep = () => {
  const form = useForm<z.infer<typeof therapistSetupFormSchema>>();

  return (
    <div className="relative flex flex-col gap-20">
      <div className="text-center">
        <SetupHeader
          title="What service does your practice offer"
          subtitle="Streamline billing and scheduling by adding services offered by your practice. This information will appear when clients are requesting appointments."
        />
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Rate per session
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal w-full"
                    autoComplete="false"
                    placeholder="$50"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
          <div className="flex gap-2 items-center w-full lg:w-auto flex-grow">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                    Duration per session
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="false"
                      placeholder="30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
            <div className="mt-7 flex-shrink-0 w-44">
              <Select>
                <SelectTrigger className="h-16 rounded-xl text-base font-normal text-[#444444B2] w-full">
                  <SelectValue placeholder="Min" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sec">sec</SelectItem>
                  <SelectItem value="min">min</SelectItem>
                  <SelectItem value="hr">hr</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FourthStep;

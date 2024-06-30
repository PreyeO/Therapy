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

const ServiceStep = () => {
  const form = useForm<z.infer<typeof therapistSetupFormSchema>>();
  return (
    <div className="flex flex-col gap-20">
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-primary_black_text">
                  State
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal"
                    autoComplete="false"
                    placeholder="Enter state name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />

          <div className="flex justify-evenly mt-4 items-center">
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-primary_black_text">
                    Rate per unit
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-[274px]"
                      autoComplete="false"
                      placeholder="$50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
            <div className="flex gap-2 items-center">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-primary_black_text">
                      Default Duration
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-16 text-placeholder_text font-sm font-normal w-[274px]"
                        autoComplete="false"
                        placeholder="30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                  </FormItem>
                )}
              />
              <Select>
                <SelectTrigger className="w-[100px] h-16 rounded-xl  text-base font-normal text-[#444444B2]">
                  <SelectValue placeholder="min" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">sec</SelectItem>
                  <SelectItem value="dark">min</SelectItem>
                  <SelectItem value="system">hr</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ServiceStep;

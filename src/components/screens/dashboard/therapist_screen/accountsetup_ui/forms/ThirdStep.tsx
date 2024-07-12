import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { therapistSetupFormSchema } from "@/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SetupHeader from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/SetupHeader";

const ThirdStep = () => {
  const form = useForm<z.infer<typeof therapistSetupFormSchema>>();
  return (
    <div className="flex flex-col gap-16">
      <div className="text-center">
        <SetupHeader
          title="Where will you like appointment to take place"
          subtitle="Enter  locations your where your clients can meet up with.  "
        />
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="office_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-primary_black_text">
                  Office name
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal"
                    autoComplete="false"
                    placeholder="Enter office name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
          <div className="flex gap-6 flex-wrap">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="text-base font-medium text-primary_black_text">
                    State
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="false"
                      placeholder="Enter state name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="text-base font-medium text-primary_black_text">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="false"
                      placeholder="Enter city name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6 flex-wrap items-center">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="text-base font-medium text-primary_black_text">
                    Street
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="false"
                      placeholder="Enter street name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="text-base font-medium text-primary_black_text">
                    Zipcode
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="false"
                      placeholder="Enter zipcode number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ThirdStep;

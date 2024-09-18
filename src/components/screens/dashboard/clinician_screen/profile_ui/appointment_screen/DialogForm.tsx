import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { clinicianProfileBusinessAddressSchema } from "@/types/formSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import OverlayHeading from "../../components/OverlayHeading";

import { FC } from "react";

interface DialogFormProps {
  onClick?: () => void;
}

const DialogForm: FC<DialogFormProps> = ({ onClick }) => {
  const form = useForm<z.infer<typeof clinicianProfileBusinessAddressSchema>>();

  return (
    <div className="flex flex-col gap-20  w-full">
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <OverlayHeading
            title="Edit Location"
            label="Save"
            onClick={onClick}
          />

          <div className="flex gap-6 mt-4 flex-wrap">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                    State
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="false"
                      placeholder="Enter your location state"
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
                name="city"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-16 text-placeholder_text font-sm font-normal w-full"
                        autoComplete="false"
                        placeholder="Enter your location address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="street_address"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Street
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal w-full"
                    autoComplete="false"
                    placeholder="Enter your location street"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
export default DialogForm;

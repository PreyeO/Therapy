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
import SetupHeader from "@/components/screens/dashboard/clinician_screen/accountsetup_ui/SetupHeader";
import { clientSetupFormSchema } from "@/types/formSchema";

const AddressForm = () => {
  const form = useForm({
    resolver: zodResolver(clientSetupFormSchema),
  });

  return (
    <div className="flex flex-col lg:gap-20 gap-10 items-center my-10">
      <div className="text-center py-6 mt-6">
        <SetupHeader
          title="Provide your physical current address"
          subtitle="Provide your current physical address, as listed with insurance"
        />
      </div>
      <Form {...form}>
        <form id="step-2-form" className="flex flex-col gap-5 w-full mb-3">
          <div className="flex gap-6 flex-wrap w-full">
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
                      className="h-16 text-placeholder_text text-sm  font-normal w-full"
                      autoComplete="off"
                      placeholder="Entter the state you live in"
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
                      className="h-16 text-placeholder_text text-sm  font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter the city you live in"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6 flex-wrap w-full">
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
                      className="h-16 text-placeholder_text text-sm font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter your street address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="text-base font-medium text-primary_black_text">
                    Postal code
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text ftext-sm  font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter your postal code"
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

export default AddressForm;

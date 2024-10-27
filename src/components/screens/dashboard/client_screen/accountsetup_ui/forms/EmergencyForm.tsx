import { forwardRef, useEffect, useImperativeHandle } from "react";
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
import { ClientSetup, clientSetupFormSchema } from "@/types/formSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";

// Wrap the component with forwardRef to make use of the ref
const EmergencyForm = forwardRef((_, ref) => {
  const { setClientProfileData, clientProfileData } = useBusinessPeriodsStore();

  const form = useForm<ClientSetup>({
    resolver: zodResolver(clientSetupFormSchema),
    defaultValues: clientProfileData,
  });

  // Extract necessary properties from form
  const { watch, handleSubmit, setValue } = form;

  useEffect(() => {
    const subscription = watch((data) => {
      setClientProfileData(data);
    });
    return () => subscription.unsubscribe();
  }, [watch, setClientProfileData]); // Include only necessary dependencies

  useImperativeHandle(ref, () => ({
    submitForm: () => handleSubmit((data) => data)(),
  }));

  return (
    <div className="flex flex-col lg:gap-20 gap-10 items-center py-2">
      <div className="text-center py-6 mt-6">
        <SetupHeader
          title="Emergency Contact"
          subtitle="Please share the information of someone we can contact in case of an emergency."
        />
      </div>
      <Form {...form}>
        <form id="step-3-form" className="flex flex-col gap-5 w-full mb-3">
          <div className="flex gap-4 flex-wrap w-full">
            <FormField
              control={form.control}
              name="emergency_contact.first_name"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="text-base font-medium text-primary_black_text">
                    First name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text text-sm font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter your preferred name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergency_contact.last_name"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="text-base font-medium text-primary_black_text">
                    Last name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text text-sm font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter your pronouns"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4 flex-wrap w-full items-center">
            <FormField
              control={form.control}
              name="emergency_contact.email"
              render={({ field }) => (
                <FormItem className="flex-grow ">
                  <FormLabel className="text-base font-medium text-primary_black_text">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text text-sm  font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
            <FormItem className="flex-grow w-[25%]">
              <FormLabel className="text-base font-medium text-primary_black_text">
                Gender
              </FormLabel>
              <Select
                onValueChange={(value) => setValue("gender", value)} // Update form value on select change
              >
                <SelectTrigger className="h-16 text-placeholder_text text-[11.28px] font-normal w-full  rounded-xl flex-grow">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          </div>
          <FormField
            control={form.control}
            name="emergency_contact.phone_number"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel className="text-base font-medium text-primary_black_text">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text text-sm  font-normal w-full"
                    autoComplete="off"
                    placeholder="Enter Phone number"
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
});

// This export is necessary for ref functionality
export default EmergencyForm;

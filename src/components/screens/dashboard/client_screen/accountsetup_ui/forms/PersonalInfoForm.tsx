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

// Wrap the component with forwardRef to pass the ref from the parent
const PersonalInfoForm = forwardRef((_, ref) => {
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
          title="Let's setup your personal information"
          subtitle="Fill in your details to proceed."
        />
      </div>
      <Form {...form}>
        <form id="step-1-form" className="flex flex-col gap-5 w-full mb-3">
          <div className="flex gap-4 flex-wrap w-full">
            <FormField
              control={form.control}
              name="preferred_name"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="text-base font-medium text-primary_black_text">
                    Preferred name
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
            <FormItem className="flex-grow w-[25%]">
              <FormLabel className="text-base font-medium text-primary_black_text">
                Pronoun
              </FormLabel>
              <Select
                onValueChange={(value) => setValue("pronouns", value)} // Update form value on select change
              >
                <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                  <SelectValue placeholder="Select your pronoun" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="she/her">She/Her</SelectItem>
                  <SelectItem value="him/his">Him/His</SelectItem>
                  <SelectItem value="them/they">Them/They</SelectItem>
                  <SelectItem value="prefer not to say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          </div>
          <div className="flex gap-4 flex-wrap w-full items-center">
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="text-base font-medium text-primary_black_text">
                    Date of Birth
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text text-sm  font-normal w-full"
                      autoComplete="off"
                      placeholder="DD/MM/YYYY"
                      {...field}
                      type="date"
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
                <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full  rounded-xl">
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
            name="phone_number"
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

// This is necessary to make the ref work correctly
export default PersonalInfoForm;

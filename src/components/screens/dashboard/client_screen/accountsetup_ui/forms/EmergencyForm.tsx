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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

const EmergencyForm = () => {
  const form = useForm({
    resolver: zodResolver(clientSetupFormSchema),
  });

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
              name="first_name"
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
              name="last_name"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="text-base font-medium text-primary_black_text">
                    Last name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text text-sm  font-normal w-full"
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
              name="email"
              render={({ field }) => (
                <FormItem className="flex-grow ">
                  <FormLabel className="text-base font-medium text-primary_black_text">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text text-sm  font-normal w-full"
                      autoComplete="off"
                      placeholder="DD/MM/YYYY"
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

              <Select>
                <SelectTrigger className="h-16 text-placeholder_text text-[11.28px] font-normal w-full  rounded-xl flex-grow">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Male">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
            {/* <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="text-base font-medium text-primary_black_text">
                    Gender
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text text-sm  font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter your gender"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            /> */}
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
};

export default EmergencyForm;

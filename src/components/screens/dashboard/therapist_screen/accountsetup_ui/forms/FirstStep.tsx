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
import SetupHeader from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/SetupHeader";
import { FormState, therapistSetupFormSchema } from "@/types";

interface FirstStepProps {
  updateAccountSetup: (data: Partial<FormState>) => void;
  formState: FormState;
}

const FirstStep = ({ updateAccountSetup, formState }: FirstStepProps) => {
  const form = useForm<Partial<FormState>>({
    resolver: zodResolver(therapistSetupFormSchema),
    defaultValues: formState, // Set default values from formState
  });

  const onSubmit = (data: Partial<FormState>) => {
    updateAccountSetup(data);
  };

  return (
    <div className="flex flex-col gap-20">
      <div className="text-center py-6 mt-6">
        <SetupHeader
          title="Let’s setup your account"
          subtitle="First what's your practice name?"
        />
        <p className="text-[#041827B2] font-normal text-base md:text-lg lg:text-xl leading-[24.8px]">
          Note: You can always update this information later.
        </p>
      </div>
      <Form {...form}>
        <form
          id="step-0-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-8"
        >
          <FormField
            control={form.control}
            name="practice_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Practice Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal"
                    autoComplete="off"
                    placeholder="Enter your practice name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
          <button type="submit">submit</button>
        </form>
      </Form>
    </div>
  );
};

export default FirstStep;

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

const FirstStep = () => {
  const form = useForm<z.infer<typeof therapistSetupFormSchema>>();
  return (
    <div className="flex flex-col gap-20">
      <div className="text-center">
        <SetupHeader
          title="Let’s setup your account, Christian"
          subtitle="First what's your practice name? "
        />
      </div>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="practice_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-primary_black_text">
                  Practice Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal"
                    autoComplete="false"
                    placeholder="Enter your practice name"
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

export default FirstStep;

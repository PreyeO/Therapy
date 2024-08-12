import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTherapistProfileState } from "@/store/useTherapistProfileState";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
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

import { therapistSetupFormSchema } from "@/types/formSchema";

const RateForm = () => {
  const { profile, loading, fetchProfile } = useTherapistProfileState();

  const form = useForm<z.infer<typeof therapistSetupFormSchema>>({
    resolver: zodResolver(therapistSetupFormSchema),
    defaultValues: {
      rate_per_session: "",
      duration_per_session: "",
      duration_unit: "minutes", // default value if not provided
    },
  });

  useEffect(() => {
    // Fetch profile data on component mount
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      form.reset({
        rate_per_session: profile.rate_per_session?.toString() || "",
        duration_per_session: profile.duration_per_session?.toString() || "",
        duration_unit: profile.duration_unit || "minutes",
      });
    }
  }, [profile, form]);

  if (loading) {
    return (
      <div className="relative w-full h-[200px] flex justify-center items-center">
        <SmallLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <Form {...form}>
        <form className="flex flex-col gap-5 pt-12">
          <FormField
            control={form.control}
            name="rate_per_session"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Rate per session
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal w-full"
                    autoComplete="false"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#000000] text-[13px] font-light" />
              </FormItem>
            )}
          />
          <div className="flex gap-2 items-center w-full lg:w-auto flex-grow">
            <FormField
              control={form.control}
              name="duration_per_session"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                    Duration per session
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="false"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
            <div className="mt-7 flex-shrink-0 w-44">
              <FormField
                control={form.control}
                name="duration_unit"
                render={({ field }) => (
                  <Select {...field}>
                    <SelectTrigger className="h-16 rounded-xl text-base font-normal text-[#444444B2] w-full">
                      <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seconds">sec</SelectItem>
                      <SelectItem value="minutes">min</SelectItem>
                      <SelectItem value="hours">hr</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RateForm;

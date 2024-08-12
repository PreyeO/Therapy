import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { therepistProfileFormSchema } from "@/types/formSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Title from "@/components/ui/Titles/Title";
import { useEffect, useState } from "react";
import { getUserData } from "@/services/api/authentication/auth";
import { useTherapistProfileState } from "@/store/useTherapistProfileState"; // Use Zustand store
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";

const ProfileForm = () => {
  const { profile, loading, error, fetchProfile } = useTherapistProfileState(); // Use Zustand state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const form = useForm<z.infer<typeof therepistProfileFormSchema>>({
    defaultValues: {
      state: "",
      city: "",
      street: "",
      zipcode: "",
    },
  });

  // Fetch user data and set full name and email
  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      const { first_name, last_name, email } = userData.user;
      setFullName(`${first_name || ""} ${last_name || ""}`);
      setEmail(email || "");
    }
  }, []);

  // Fetch profile data once when the component mounts
  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
  }, [fetchProfile, profile]);

  // Populate form fields after profile data is fetched
  useEffect(() => {
    if (profile) {
      console.log("Profile data:", profile); // Debugging line
      form.reset({
        state: profile.business_address?.state || "",
        city: profile.business_address?.city || "",
        street: profile.business_address?.street_address || "",
        zipcode: profile.business_address?.postal_code || "", // Use `zipcode`
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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      <Title title="Personal Info" className="text-lg font-bold" />
      <Form {...form}>
        <form className="flex flex-col gap-5 w-full">
          <FormItem>
            <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
              Full Name
            </FormLabel>
            <FormControl>
              <Input
                className="h-16 text-placeholder_text font-sm font-normal"
                autoComplete="off"
                placeholder="Enter your full name"
                value={fullName} // Use state to display the full name
                readOnly
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
              Email
            </FormLabel>
            <FormControl>
              <Input
                className="h-16 text-placeholder_text font-sm font-normal"
                autoComplete="off"
                placeholder="Enter your email address"
                value={email} // Use state to display the email
                readOnly
              />
            </FormControl>
          </FormItem>
          <Title title="Address" className="py-5 text-lg font-bold" />
          <div className="flex gap-6 flex-wrap w-full">
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
                      autoComplete="off"
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
                  <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter city name"
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
                  <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                    Street
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="off"
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
                  <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                    Zipcode
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="off"
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

export default ProfileForm;

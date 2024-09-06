import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore"; // Use Zustand store

const ProfileForm = () => {
  const { profile, profileLoading, fetchProfileData } =
    useBusinessPeriodsStore();

  const form = useForm({
    defaultValues: {
      state: "",
      city: "",
      street: "",
      zipcode: "",
    },
  });

  // Fetch profile data when the component mounts
  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  if (profileLoading) {
    return (
      <div className="relative w-full h-[200px] flex justify-center items-center">
        <SmallLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <h3 className=" font-bold text-lg">Personal Info</h3>
      <Form {...form}>
        <form className="flex flex-col gap-5 w-full">
          <FormItem>
            <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
              Legal First Name
            </FormLabel>
            <FormControl>
              <Input
                className="h-16 text-placeholder_text font-sm font-normal"
                autoComplete="off"
                placeholder="Enter your legal first name"
                value={profile?.firstName || ""}
                readOnly
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
              Legal Last Name
            </FormLabel>
            <FormControl>
              <Input
                className="h-16 text-placeholder_text font-sm font-normal"
                autoComplete="off"
                placeholder="Enter your legal last name"
                value={profile?.lastName || ""}
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
                value={profile?.email || ""}
                readOnly
              />
            </FormControl>
          </FormItem>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;

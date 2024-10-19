import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const ProfileForm = () => {
  const { profileLoading, profile, fetchProfileData, clientProfileData } =
    useBusinessPeriodsStore();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      preferred_name: clientProfileData?.preferred_name || "",
      pronouns: clientProfileData?.pronouns || "",
      date_of_birth: clientProfileData?.date_of_birth || "",
      phone_number: clientProfileData?.phone_number || "",
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
          <div className="flex gap-5 w-full">
            <FormItem className="flex-grow">
              <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                Legal First Name
              </FormLabel>
              <FormControl>
                <Input
                  className="h-16 text-placeholder_text font-sm font-normal"
                  autoComplete="off"
                  placeholder="Enter your legal first name"
                  value={profile?.firstName}
                  readOnly
                />
              </FormControl>
            </FormItem>
            <FormItem className="flex-grow">
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
          </div>
          <div className="flex gap-5 w-full">
            <FormItem className="flex-grow">
              <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                Preferred Name
              </FormLabel>
              <FormControl>
                <Input
                  className="h-16 text-placeholder_text font-sm font-normal"
                  autoComplete="off"
                  placeholder="Enter your legal last name"
                  value={clientProfileData.preferred_name || profile?.firstName}
                  readOnly
                />
              </FormControl>
            </FormItem>

            <FormItem className="flex-grow">
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
          </div>
          <div className="flex gap-5 w-full">
            <FormItem className="flex-grow">
              <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  className="h-16 text-placeholder_text font-sm font-normal"
                  autoComplete="off"
                  placeholder="Enter your legal last name"
                  value={clientProfileData.phone_number || "NIL"}
                  readOnly
                />
              </FormControl>
            </FormItem>

            <FormItem className="flex-grow">
              <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                Pronoun
              </FormLabel>
              <FormControl>
                <Input
                  className="h-16 text-placeholder_text font-sm font-normal"
                  autoComplete="off"
                  placeholder="Enter your email address"
                  value={clientProfileData.pronouns || "NIL"}
                  readOnly
                />
              </FormControl>
            </FormItem>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;

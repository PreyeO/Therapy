import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useDialogState } from "@/store";
import AddressUpdateForm from "./AddressUpdateForm";
import MedicalDialog from "../../medical_screen/ui/MedicalDialog";

const AddressForm = () => {
  const { profileLoading, clientProfileData } = useBusinessPeriodsStore();
  const { isOpen, setDialogContent, closeDialog } = useDialogState();

  const handleOpenDialog = () => {
    setDialogContent(<AddressUpdateForm />);
  };

  const form = useForm({
    defaultValues: {
      preferred_name: clientProfileData?.preferred_name || "",
      pronouns: clientProfileData?.pronouns || "",
      date_of_birth: clientProfileData?.date_of_birth || "",
      phone_number: clientProfileData?.phone_number || "",
    },
  });

  if (profileLoading) {
    return (
      <div className="relative w-full h-[200px] flex justify-center items-center">
        <SmallLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        <h3 className=" font-bold text-lg">Personal Info</h3>
        <Button
          className="rounded-full w-[162px] gap-1"
          type="button"
          onClick={handleOpenDialog}
        >
          <Edit color="white" size={20} />
          Edit
        </Button>
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-5 w-full">
          <div className="flex gap-5 w-full">
            <FormItem className="flex-grow">
              <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                State
              </FormLabel>
              <FormControl>
                <Input
                  className="h-16 text-placeholder_text font-sm font-normal"
                  autoComplete="off"
                  placeholder="Enter your legal first name"
                  value={clientProfileData.address?.state || "NIL"}
                  readOnly
                />
              </FormControl>
            </FormItem>
            <FormItem className="flex-grow">
              <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                City
              </FormLabel>
              <FormControl>
                <Input
                  className="h-16 text-placeholder_text font-sm font-normal"
                  autoComplete="off"
                  placeholder="Enter your legal last name"
                  value={clientProfileData.address?.city || "NIL"}
                  readOnly
                />
              </FormControl>
            </FormItem>
          </div>
          <div className="flex gap-5 w-full">
            <FormItem className="flex-grow">
              <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                Street
              </FormLabel>
              <FormControl>
                <Input
                  className="h-16 text-placeholder_text font-sm font-normal"
                  autoComplete="off"
                  placeholder="Enter your legal last name"
                  value={clientProfileData.address?.street_address || "NIL"}
                  readOnly
                />
              </FormControl>
            </FormItem>

            <FormItem className="flex-grow">
              <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                Postal Code
              </FormLabel>
              <FormControl>
                <Input
                  className="h-16 text-placeholder_text font-sm font-normal"
                  autoComplete="off"
                  placeholder="Enter your email address"
                  value={clientProfileData.address?.postal_code || "NIL"}
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
      <MedicalDialog
        open={isOpen}
        onClose={closeDialog}
        title="Update Address"
        formComponent={<AddressUpdateForm />}
      />
    </div>
  );
};

export default AddressForm;

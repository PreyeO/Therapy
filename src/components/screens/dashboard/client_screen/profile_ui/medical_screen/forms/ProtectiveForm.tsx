import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProtectiveFactor, protectiveFactorSchema } from "@/types/formSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useDialogState } from "@/store";

import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";
import { ToastContainer } from "react-toastify";
import { protectiveFactorChoices } from "@/constants/DataManager";
import useMedicalsSubmit from "@/hooks/useMedicalsSubmit";
import FormTextArea from "@/components/ui/form_fields/FormTextArea";

const ProtectiveForm = () => {
  const {
    clientProfileId,
    protectiveFactors,
    updateProtectiveFactors,
    fetchProfileData,
  } = useBusinessPeriodsStore();

  const { closeDialog } = useDialogState();

  const form = useForm<ProtectiveFactor>({
    resolver: zodResolver(protectiveFactorSchema),
  });
  const { loading, handleFormSubmit } = useMedicalsSubmit();

  // Fetch client profile ID if not present
  if (!clientProfileId) {
    fetchProfileData();
  }

  const onSubmit = async (data: ProtectiveFactor) => {
    if (!clientProfileId) return;
    const updatedProtectiveFactors = [...protectiveFactors, data];

    handleFormSubmit(
      () => updateProtectiveFactors(updatedProtectiveFactors),
      form.reset,
      closeDialog
    );
  };

  return (
    <div className="flex flex-col gap-5 scale-95">
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="factor"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-base font-medium text-primary_black_text">
                  Protective Factor
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => form.setValue("factor", value)}
                >
                  <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                    <SelectValue placeholder="Select protective factor" />
                  </SelectTrigger>
                  <SelectContent>
                    {protectiveFactorChoices.map((factor) => (
                      <SelectItem key={factor.value} value={factor.value}>
                        {factor.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormTextArea
            control={form.control}
            name="description"
            label="   Description"
            placeholder="Enter a description of how this factor protects you"
          />
          <FormTextArea
            control={form.control}
            name="notes"
            label="Note"
            placeholder="Enter any additional details or notes"
          />

          <ButtonLoader
            loading={loading} // Show loader during submission
            text="Add"
            className="rounded-full h-[63px] text-xl font-medium"
          />
        </form>
      </Form>
      <ToastContainer
        toastStyle={{ backgroundColor: "crimson", color: "white" }}
        className="text-white"
      />
    </div>
  );
};
export default ProtectiveForm;

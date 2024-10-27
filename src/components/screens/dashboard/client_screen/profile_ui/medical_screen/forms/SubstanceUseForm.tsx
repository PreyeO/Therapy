import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubstanceUse, substanceUseSchema } from "@/types/formSchema";

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
import { substanceTypeChoices } from "@/constants/DataManager";
import FormFieldComponent from "../../../../../../ui/form_fields/FormFieldComponent";
import useMedicalsSubmit from "@/hooks/useMedicalsSubmit";

const SubstanceUseForm = () => {
  const {
    clientProfileId,
    substanceUses,
    updateSubtanceUses,
    fetchProfileData,
  } = useBusinessPeriodsStore();

  const { closeDialog } = useDialogState();

  const form = useForm<SubstanceUse>({
    resolver: zodResolver(substanceUseSchema),
  });
  const { loading, handleFormSubmit } = useMedicalsSubmit();

  // Fetch client profile ID if not present
  if (!clientProfileId) {
    fetchProfileData();
  }

  const onSubmit = async (data: SubstanceUse) => {
    if (!clientProfileId) return;
    const updatedSubstanceUses = [...substanceUses, data];

    handleFormSubmit(
      () => updateSubtanceUses(updatedSubstanceUses),
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
            name="substance_type"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-base font-medium text-primary_black_text">
                  Substance Type
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    form.setValue("substance_type", value)
                  }
                >
                  <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                    <SelectValue placeholder="Select substance type" />
                  </SelectTrigger>
                  <SelectContent>
                    {substanceTypeChoices.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormFieldComponent
            control={form.control}
            name="frequency"
            label="Frequency"
            placeholder="Enter frequency of subastance usage"
            type="text"
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
export default SubstanceUseForm;

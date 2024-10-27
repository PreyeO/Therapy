import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MedicalCondition, medicalConditionSchema } from "@/types/formSchema";

import FormFieldComponent from "../../../../../../ui/form_fields/FormFieldComponent";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";
import { ToastContainer } from "react-toastify";
import useMedicalsSubmit from "@/hooks/useMedicalsSubmit";
import { useDialogState } from "@/store";
import FormTextArea from "../../../../../../ui/form_fields/FormTextArea";

const MedicalConditionForm = () => {
  const form = useForm<MedicalCondition>({
    resolver: zodResolver(medicalConditionSchema),
  });

  const {
    clientProfileId,
    fetchProfileData,
    updateMedicalConditions,
    medicalConditions,
  } = useBusinessPeriodsStore();
  // const { loading, setLoading } = useAuthState();
  const { closeDialog } = useDialogState();
  const { loading, handleFormSubmit } = useMedicalsSubmit();

  // Fetch client profile ID if not present
  if (!clientProfileId) {
    fetchProfileData();
  }

  // Form submission handler
  const onSubmit = (data: MedicalCondition) => {
    if (!clientProfileId) return;
    const updatedConditions = [...medicalConditions, data];

    handleFormSubmit(
      () => updateMedicalConditions(updatedConditions),
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
          <FormFieldComponent
            control={form.control}
            name="name"
            label="Medical Condition Name"
            placeholder="Enter the name of the condition"
            type="text"
          />

          <FormFieldComponent
            control={form.control}
            name="diagnosis_date"
            label="  Diagnosis date"
            type="date"
          />

          <FormTextArea
            control={form.control}
            name="notes"
            label="Notes"
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

export default MedicalConditionForm;

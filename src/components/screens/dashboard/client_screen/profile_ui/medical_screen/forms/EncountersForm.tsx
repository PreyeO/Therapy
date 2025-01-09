import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Encounter, encounterSchema } from "@/types/formSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { encounterTypes } from "@/constants/DataManager";
import { useDialogState } from "@/store";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useAppointmentsStore } from "@/store/useAppointment";
import { useEffect } from "react";
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";
import { ToastContainer } from "react-toastify";
import FormTextArea from "@/components/ui/form_fields/FormTextArea";
import useMedicalsSubmit from "@/hooks/useMedicalsSubmit";
import { setupClientProfile } from "@/services/api/clients/account_setup";

const EncountersForm = () => {
  const form = useForm<Encounter>({
    resolver: zodResolver(encounterSchema),
  });

  const {
    clientProfileId,
    fetchProfileData,
    encounters,
    fetchProfileMedicals,
  } = useBusinessPeriodsStore();
  const { clinicians, fetchClinicianList } = useAppointmentsStore();
  const { closeDialog } = useDialogState();
  const { loading, handleFormSubmit } = useMedicalsSubmit();

  // Fetch clinician list and client profile if not present
  useEffect(() => {
    if (!clientProfileId) fetchProfileData();
    fetchClinicianList();
  }, [clientProfileId, fetchProfileData, fetchClinicianList]);

  // Form submission handler
  const onSubmit = async (data: Encounter) => {
    if (!clientProfileId) return;
    try {
      await handleFormSubmit(
        async () => {
          await setupClientProfile(clientProfileId, {
            encounters: [...encounters, data],
          });
          await fetchProfileMedicals(clientProfileId); // Re-fetch encounters
        },
        form.reset,
        closeDialog
      );
    } catch (error) {
      console.error("Error creating encounter:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 scale-95">
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Clinician Profile Selection */}
          <FormField
            control={form.control}
            name="clinician_profile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-primary_black_text">
                  Select Clinician Name
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    form.setValue("clinician_profile", value)
                  }
                >
                  <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                    <SelectValue placeholder="Select encountered clinician" />
                  </SelectTrigger>
                  <SelectContent>
                    {clinicians.map((clinician) => (
                      <SelectItem
                        key={clinician.clinician_profile?.id || clinician.id}
                        value={clinician.clinician_profile?.id || ""}
                      >
                        {`${clinician.first_name} ${clinician.last_name}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Encounter Type */}
          <FormField
            control={form.control}
            name="encounter_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-primary_black_text">
                  Meeting Type
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    form.setValue("encounter_type", value)
                  }
                >
                  <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {encounterTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Progress Note */}
          <FormTextArea
            control={form.control}
            name="progress_note"
            label="Progress Note"
            placeholder="Enter a brief summary of what happened during the encounter"
          />

          {/* Notes */}
          <FormTextArea
            control={form.control}
            name="notes"
            label="Notes"
            placeholder="Enter any additional details or notes"
          />

          {/* Submit Button */}
          <ButtonLoader
            loading={loading}
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

export default EncountersForm;

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

import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";
import { ToastContainer } from "react-toastify";
import { useAppointmentsStore } from "@/store/useAppointment";
import { useEffect } from "react";
import useMedicalsSubmit from "@/hooks/useMedicalsSubmit";
import FormTextArea from "@/components/ui/form_fields/FormTextArea";

const EncountersForm = () => {
  const form = useForm<Encounter>({
    resolver: zodResolver(encounterSchema),
  });

  const { clientProfileId, fetchProfileData, updateEncounters, encounters } =
    useBusinessPeriodsStore();
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
    const updatedEncounters = [...encounters, data];

    handleFormSubmit(
      () => updateEncounters(updatedEncounters),
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
          {/* Clinician Profile Selection */}
          <FormField
            control={form.control}
            name="clinician_profile"
            render={({ field }) => (
              <FormItem className="">
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
              <FormItem className="">
                <FormLabel className="text-base font-medium text-primary_black_text">
                  Meeting Type
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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

          <FormTextArea
            control={form.control}
            name="progress_note"
            label="Progress Note"
            placeholder="Enter a brief summary of what happened during the encounter"
          />
          <FormTextArea
            control={form.control}
            name="notes"
            label="Note"
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

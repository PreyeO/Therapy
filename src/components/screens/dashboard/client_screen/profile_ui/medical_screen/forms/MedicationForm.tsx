import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Medication, medicationSchema } from "@/types/formSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { dosageUnits } from "@/constants/DataManager";
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";
import { ToastContainer } from "react-toastify";
import { useDialogState } from "@/store";
import FormFieldComponent from "../../../../../../ui/form_fields/FormFieldComponent";
import FormTextArea from "@/components/ui/form_fields/FormTextArea";
import useMedicalsSubmit from "@/hooks/useMedicalsSubmit";
import { setupClientProfile } from "@/services/api/clients/account_setup";

const MedicationForm = () => {
  const { clientProfileId, medications, fetchProfileMedicals } =
    useBusinessPeriodsStore();

  const { closeDialog } = useDialogState();
  const form = useForm<Medication>({
    resolver: zodResolver(medicationSchema),
  });
  const { loading, handleFormSubmit } = useMedicalsSubmit();

  const onSubmit = async (data: Medication) => {
    if (!clientProfileId) return;

    try {
      await handleFormSubmit(
        async () => {
          // Update the medications list and re-fetch the data
          await setupClientProfile(clientProfileId, {
            medications: [...medications, data],
          });
          await fetchProfileMedicals(clientProfileId);
        },
        form.reset,
        closeDialog
      );
    } catch (error) {
      console.error("Error creating medication:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 scale-95">
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex gap-5 w-full">
            <FormFieldComponent
              control={form.control}
              name="name"
              label="Medication Name"
              placeholder="Enter medication name"
              type="text"
            />
            <FormFieldComponent
              control={form.control}
              name="prescriber"
              label="Prescriber Name"
              placeholder="Enter prescriber name"
              type="text"
            />
          </div>

          <div className="flex gap-5 w-full">
            <div className="flex w-1/2 gap-2">
              <FormFieldComponent
                control={form.control}
                name="dosage_quantity"
                label="Enter dosage"
                placeholder="Dosage"
                type="text"
              />
              <FormField
                control={form.control}
                name="dosage_unit"
                render={({ field }) => (
                  <FormItem className="w-[100px]">
                    <FormLabel className="text-base font-medium text-primary_black_text">
                      Unit
                    </FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) =>
                        form.setValue("dosage_unit", value)
                      }
                    >
                      <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                        <SelectValue placeholder="mg" />
                      </SelectTrigger>
                      <SelectContent>
                        {dosageUnits.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                    Frequency
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter frequency"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5 w-full">
            <FormFieldComponent
              control={form.control}
              name="start_date"
              label=" Start Date"
              type="date"
            />

            <FormFieldComponent
              control={form.control}
              name="end_date"
              label=" End Date"
              type="date"
            />
          </div>

          <FormTextArea
            control={form.control}
            name="purpose"
            label="Purpose"
            placeholder="What is the medication for"
          />
          <FormTextArea
            control={form.control}
            name="notes"
            label="Note"
            placeholder="Enter any additional details or notes"
          />

          <ButtonLoader
            loading={loading} // Use loading from the store
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

export default MedicationForm;

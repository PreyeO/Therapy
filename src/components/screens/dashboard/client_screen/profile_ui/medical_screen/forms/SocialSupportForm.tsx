import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialSupport, socialSupportSchema } from "@/types/formSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDialogState } from "@/store";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";
import { ToastContainer } from "react-toastify";
import { socialSupportTypes, strengthChoices } from "@/constants/DataManager";
import useMedicalsSubmit from "@/hooks/useMedicalsSubmit";
import FormTextArea from "@/components/ui/form_fields/FormTextArea";
import { setupClientProfile } from "@/services/api/clients/account_setup";

const SocialSupportForm = () => {
  const form = useForm<SocialSupport>({
    resolver: zodResolver(socialSupportSchema),
  });

  const {
    clientProfileId,
    socialSupports,
    fetchProfileMedicals,
    fetchProfileData,
  } = useBusinessPeriodsStore();
  const { closeDialog } = useDialogState();
  const { loading, handleFormSubmit } = useMedicalsSubmit();

  // Fetch client profile ID if not present
  if (!clientProfileId) {
    fetchProfileData();
  }

  const onSubmit = async (data: SocialSupport) => {
    if (!clientProfileId) return;
    try {
      await handleFormSubmit(
        async () => {
          await setupClientProfile(clientProfileId, {
            social_supports: [...socialSupports, data],
          });
          await fetchProfileMedicals(clientProfileId); // Re-fetch social supports
        },
        form.reset,
        closeDialog
      );
    } catch (error) {
      console.error("Error creating social support:", error);
    }
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
            name="social_support_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-primary_black_text">
                  Type of Support
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    form.setValue("social_support_type", value)
                  }
                >
                  <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                    <SelectValue placeholder="Select support type" />
                  </SelectTrigger>
                  <SelectContent>
                    {socialSupportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
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
            label="Description"
            placeholder="Enter a description of the social support (e.g., close-knit family)"
          />

          <FormField
            control={form.control}
            name="strength"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-primary_black_text">
                  Strength
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => form.setValue("strength", value)}
                >
                  <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                    <SelectValue placeholder="Select strength type" />
                  </SelectTrigger>
                  <SelectContent>
                    {strengthChoices.map((choice) => (
                      <SelectItem key={choice.value} value={choice.value}>
                        {choice.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormTextArea
            control={form.control}
            name="notes"
            label="Notes"
            placeholder="Enter any additional details or notes"
          />

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

export default SocialSupportForm;

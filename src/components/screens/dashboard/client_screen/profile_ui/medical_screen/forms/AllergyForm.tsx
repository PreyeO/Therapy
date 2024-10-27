import { Input } from "@/components/ui/input";
import {
  Form,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Allergy, allergySchema } from "@/types/formSchema";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";
import { useAuthState, useDialogState } from "@/store";
import { getErrorMessage } from "@/lib/utils";

const AllergyForm = () => {
  const form = useForm<Allergy>({
    resolver: zodResolver(allergySchema),
  });

  const { clientProfileId, fetchProfileData, updateAllergies, allergies } =
    useBusinessPeriodsStore();
  const { loading, setLoading } = useAuthState();
  const { closeDialog } = useDialogState();

  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  // Load allergies from store when form opens
  useEffect(() => {
    setTags(allergies.map((allergy) => allergy.name));
  }, [allergies]);

  // Fetch client profile data if not present
  useEffect(() => {
    if (!clientProfileId) fetchProfileData();
  }, [clientProfileId, fetchProfileData]);

  // Clear form on dialog close
  const resetFormOnClose = useCallback(() => {
    setTags([]);
    setInputValue("");
    form.reset();
  }, [form]);

  useEffect(() => {
    return () => resetFormOnClose();
  }, [resetFormOnClose]);

  // Add tag to list on "Enter" or "," key press without submitting
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedInput = inputValue.trim();
      if (trimmedInput && !tags.includes(trimmedInput)) {
        setTags([...tags, trimmedInput]);
        setInputValue("");
      }
    }
  };

  // Remove individual tag without triggering form submission
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Remove all tags without triggering form submission
  const removeAllTags = (e) => {
    e.preventDefault();
    setTags([]);
  };

  // Submit form data to server and update the state
  const onSubmit = async () => {
    if (!clientProfileId || tags.length === 0) return;

    setLoading(true);
    const payload = tags.map((tag) => ({ name: tag }));

    try {
      await updateAllergies(payload);
      resetFormOnClose(); // Reset form after submission
      closeDialog(); // Close the dialog/modal
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 scale-95">
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (tags.length > 0) onSubmit();
          }}
        >
          <FormItem className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                Enter Allergies
              </FormLabel>
              <Button
                onClick={removeAllTags}
                type="button"
                className="bg-[#FF2626]"
              >
                Remove all
              </Button>
            </div>

            <FormControl>
              <div className="border rounded-md p-3 h-[100px] flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Button
                    key={index}
                    className="w-[166px] h-[37px] flex items-center justify-center gap-[5px] text-sm font-normal text-army_green bg-[#8BA05F1A] rounded-full cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      removeTag(tag);
                    }}
                    type="button"
                  >
                    {tag}
                    <X size={16} />
                  </Button>
                ))}
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={addTag}
                  className="h-16 text-placeholder_text font-sm font-normal w-full border-hidden"
                  autoComplete="off"
                  placeholder="Type and press Enter or ',' to add allergies"
                />
              </div>
            </FormControl>
            <FormMessage className="text-[#E75F51] text-[13px] font-light" />
          </FormItem>

          <ButtonLoader
            loading={loading}
            text="Add"
            className="rounded-full h-[63px] text-xl font-medium"
            disabled={tags.length === 0}
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

export default AllergyForm;

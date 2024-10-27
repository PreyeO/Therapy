// hooks/useFormSubmit.ts
import { toast } from "react-toastify";

import { useCallback } from "react";
import { useAuthState } from "@/store";
import { getErrorMessage } from "@/lib/utils";

type SubmitFunction = () => Promise<void>;
type ResetFunction = () => void;

const useMedicalsSubmit = () => {
  const { loading, setLoading } = useAuthState();

  const handleFormSubmit = useCallback(
    async (
      submitFn: SubmitFunction,
      resetFn: ResetFunction,
      closeDialog: () => void
    ) => {
      setLoading(true);
      try {
        await submitFn();
        resetFn();
        closeDialog();
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  return { loading, handleFormSubmit };
};

export default useMedicalsSubmit;

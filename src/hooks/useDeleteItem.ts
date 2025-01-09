import { useState } from "react";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/utils";

const useDeleteItem = (
  deleteService,
  updateStateKey,
  updateState,
  fetchProfileCallback
) => {
  const [isVerificationOpen, setVerificationOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleDeleteClick = (itemId) => {
    setSelectedItemId(itemId);
    setVerificationOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedItemId) {
      setIsDeleting(true);
      try {
        await deleteService(selectedItemId);

        // Re-fetch profile data after deletion
        if (fetchProfileCallback) {
          await fetchProfileCallback();
        } else {
          updateState(updateStateKey, (prevItems) =>
            prevItems.filter((item) => item.id !== selectedItemId)
          );
        }

        setSuccessOpen(true);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsDeleting(false);
        setVerificationOpen(false);
        setSelectedItemId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setVerificationOpen(false);
    setSelectedItemId(null);
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  return {
    isVerificationOpen,
    isSuccessOpen,
    isDeleting,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    handleSuccessClose,
  };
};

export default useDeleteItem;

import { Plus } from "lucide-react";
import AllergyButton from "./ui/AllergyButton";
import ProfileHeader from "./ui/ProfileHeader";
import { useDialogState } from "@/store";
import AllergyForm from "./forms/AllergyForm";
import MedicalDialog from "./ui/MedicalDialog";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useEffect } from "react";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import useDeleteItem from "@/hooks/useDeleteItem";
import { deleteAllergy } from "@/services/api/clients/account_setup";
import VerificationCard from "../../../components/VerificationCard";
import Success from "@/components/ui/notifications/Success";

const Allergies = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();
  const {
    allergies,
    fetchProfileMedicals,
    clientProfileId,
    loading,
    updateState,
  } = useBusinessPeriodsStore();

  const {
    isVerificationOpen,
    isSuccessOpen,
    isDeleting,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    handleSuccessClose,
  } = useDeleteItem(
    async (id) => {
      await deleteAllergy(id);
      if (clientProfileId) {
        await fetchProfileMedicals(clientProfileId); // Refresh allergies
      }
    },
    "allergies",
    updateState,
    clientProfileId ? () => fetchProfileMedicals(clientProfileId) : null
  );

  useEffect(() => {
    if (clientProfileId) {
      fetchProfileMedicals(clientProfileId);
    }
  }, [clientProfileId, fetchProfileMedicals]);

  const handleOpenDialog = () => {
    setDialogContent(<AllergyForm />);
  };

  return (
    <div className="flex flex-col gap-[67px]">
      <ProfileHeader
        label="Add allergy"
        title="Known Allergy"
        icon={<Plus size={18} color="white" />}
        onAdd={handleOpenDialog}
      />
      {loading ? (
        <div className="relative w-full h-[200px] flex justify-center items-center">
          <SmallLoader />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {allergies.map((allergy) => (
            <AllergyButton
              key={allergy.id}
              label={allergy.name}
              onDelete={() => handleDeleteClick(allergy.id)}
            />
          ))}
        </div>
      )}
      <MedicalDialog
        open={isOpen}
        onClose={closeDialog}
        title="Add Allergy"
        formComponent={<AllergyForm />}
      />

      {/* Verification Modal */}
      {isVerificationOpen && (
        <MedicalDialog
          open={isVerificationOpen}
          onClose={handleCancelDelete}
          title="Confirm Deletion"
          className="text-center text-red-600 "
          formComponent={
            <VerificationCard
              onYes={handleConfirmDelete}
              onNo={handleCancelDelete}
              title="Are you sure you want to delete this allergy?"
              loading={isDeleting}
            />
          }
        />
      )}

      {/* Success Modal */}
      {isSuccessOpen && (
        <div className="text-center flex flex-col justify-center mx-auto items-center">
          <MedicalDialog
            open={isSuccessOpen}
            onClose={handleSuccessClose}
            formComponent={
              <Success
                title="Allergy Deleted"
                subtitle="The allergy was successfully deleted from your records."
                label="Close"
                onButtonClick={handleSuccessClose}
                className="bg-transparent w-[500px] rounded-xl h-fit"
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default Allergies;

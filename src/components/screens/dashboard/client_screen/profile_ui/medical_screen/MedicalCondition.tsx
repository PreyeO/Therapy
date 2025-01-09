import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import ContentSubtitle from "./ui/ContentSubtitle";
import ContentTitle from "./ui/ContentTitle";
import ProfileHeader from "./ui/ProfileHeader";
import ProfileButton from "./ui/ProfileButton";
import MedicalDialog from "./ui/MedicalDialog";
import MedicalConditionForm from "./forms/MedicalConditionForm";
import { useDialogState } from "@/store";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import { deleteMedicalCondition } from "@/services/api/clients/account_setup";
import VerificationCard from "../../../components/VerificationCard";
import Success from "@/components/ui/notifications/Success";
import useDeleteItem from "@/hooks/useDeleteItem";

const MedicalCondition = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();
  const {
    medicalConditions,
    fetchProfileMedicals,
    clientProfileId,
    loading,
    updateState,
  } = useBusinessPeriodsStore();

  useEffect(() => {
    if (clientProfileId) {
      fetchProfileMedicals(clientProfileId);
    }
  }, [clientProfileId, fetchProfileMedicals]);

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
      await deleteMedicalCondition(id);
    },
    "medicalConditions",
    updateState,
    () => {
      if (clientProfileId) {
        return fetchProfileMedicals(clientProfileId);
      }
      console.error("Client profile ID is null");
    }
  );

  const handleOpenDialog = () => {
    setDialogContent(<MedicalConditionForm />);
  };

  return (
    <div className="flex flex-col gap-[67px]">
      <ProfileHeader
        label="Add medical condition"
        title="Medical Condition"
        icon={<Plus size={18} color="white" />}
        onAdd={handleOpenDialog}
      />

      {loading ? (
        <div className="relative w-full h-[200px] flex justify-center items-center">
          <SmallLoader />
        </div>
      ) : (
        medicalConditions.map((condition) => (
          <div className="flex flex-col gap-[28px]" key={condition.id}>
            <div className="flex gap-[114px]">
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Name of medical condition" />
                <ContentSubtitle content={condition.name || "N/A"} />
              </div>
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Diagnosis date" />
                <ContentSubtitle content={condition.diagnosis_date || "N/A"} />
              </div>
            </div>
            <div className="flex flex-col gap-[6px]">
              <ContentTitle title="Note" />
              <ContentSubtitle content={condition.notes || "N/A"} />
            </div>
            <ProfileButton
              icon={<Trash2 size={18} color="white" />}
              label="Delete medical info"
              className="bg-[#FF2626]"
              onClick={() => handleDeleteClick(condition.id)}
            />
          </div>
        ))
      )}

      <MedicalDialog
        open={isOpen}
        onClose={closeDialog}
        title="Add Medical condition"
        formComponent={<MedicalConditionForm />}
      />

      {isVerificationOpen && (
        <MedicalDialog
          open={isVerificationOpen}
          onClose={handleCancelDelete}
          title="Confirm Deletion"
          className="text-center text-red-600"
          formComponent={
            <VerificationCard
              onYes={handleConfirmDelete}
              onNo={handleCancelDelete}
              title="Are you sure you want to delete this medical condition?"
              loading={isDeleting}
            />
          }
        />
      )}

      {isSuccessOpen && (
        <div className="text-center flex flex-col justify-center mx-auto items-center">
          <MedicalDialog
            open={isSuccessOpen}
            onClose={handleSuccessClose}
            formComponent={
              <Success
                title="Medical Condition Deleted"
                subtitle="The medical condition was successfully deleted from your records."
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

export default MedicalCondition;

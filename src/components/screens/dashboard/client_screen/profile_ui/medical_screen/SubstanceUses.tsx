import { Plus, Trash2 } from "lucide-react";
import ProfileHeader from "../../../components/medicals/ProfileHeader";
import ContentTitle from "../../../components/medicals/ContentTitle";
import ContentSubtitle from "../../../components/medicals/ContentSubtitle";
import ProfileButton from "../../../components/medicals/ProfileButton";
import SubstanceUseForm from "./forms/SubstanceUseForm";
import MedicalDialog from "../../../components/medicals/MedicalDialog";
import { useDialogState } from "@/store";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useEffect } from "react";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import useDeleteItem from "@/hooks/useDeleteItem";
import { deleteSubstanceUse } from "@/services/api/clients/account_setup";
import VerificationCard from "../../../components/VerificationCard";
import Success from "@/components/ui/notifications/Success";
import { ToastContainer } from "react-toastify";
import { SubstanceUse } from "@/types/formSchema";

interface SubstanceUseProps {
  data?: SubstanceUse[];
  readOnly?: boolean;
}

const SubstanceUses: React.FC<SubstanceUseProps> = ({
  data,
  readOnly = false,
}) => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();

  const {
    substanceUses,
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
      await deleteSubstanceUse(id);
      if (clientProfileId) {
        await fetchProfileMedicals(clientProfileId); // Refresh substance uses
      }
    },
    "substanceUses",
    updateState,
    clientProfileId ? () => fetchProfileMedicals(clientProfileId) : null
  );

  // If in readOnly mode, use externally provided `data`
  const substanceUseList = readOnly ? data || [] : substanceUses;

  useEffect(() => {
    if (!readOnly && clientProfileId) {
      fetchProfileMedicals(clientProfileId);
    }
  }, [clientProfileId, fetchProfileMedicals, readOnly]);

  const handleOpenDialog = () => {
    setDialogContent(<SubstanceUseForm />);
  };

  return (
    <div className="flex flex-col gap-[67px]">
      {!readOnly && (
        <ProfileHeader
          label="Add substance use"
          title="Substance Use"
          icon={<Plus size={18} color="white" />}
          onAdd={handleOpenDialog}
        />
      )}

      {loading ? (
        <div className="relative w-full h-[200px] flex justify-center items-center">
          <SmallLoader />
        </div>
      ) : substanceUseList.length === 0 ? (
        <p>No medications listed.</p>
      ) : (
        substanceUseList.map((substance, index) => (
          <div className="flex flex-col gap-[28px]" key={substance.id || index}>
            <div className="flex gap-[114px]">
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Type" />
                <ContentSubtitle content={substance.substance_type || "N/A"} />
              </div>
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Frequency" />
                <ContentSubtitle content={substance.frequency || "N/A"} />
              </div>
            </div>
            {!readOnly && (
              <ProfileButton
                icon={<Trash2 size={18} color="white" />}
                label="Delete substance use"
                className="bg-[#FF2626]"
                onClick={() => handleDeleteClick(substance.id)}
              />
            )}
          </div>
        ))
      )}

      <MedicalDialog
        open={isOpen}
        onClose={closeDialog}
        title="Add Substance Use"
        formComponent={<SubstanceUseForm />}
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
              title="Are you sure you want to delete this substance use?"
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
                title="Substance Use Deleted"
                subtitle="The substance use was successfully deleted from your records."
                label="Close"
                onButtonClick={handleSuccessClose}
                className="bg-transparent w-[500px] rounded-xl h-fit"
              />
            }
          />
        </div>
      )}

      <ToastContainer
        toastStyle={{ backgroundColor: "crimson", color: "white" }}
        className="text-white"
      />
    </div>
  );
};

export default SubstanceUses;

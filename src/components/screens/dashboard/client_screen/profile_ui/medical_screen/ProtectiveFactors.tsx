import { Plus, Trash2 } from "lucide-react";
import ProfileHeader from "../../../components/medicals/ProfileHeader";
import ContentTitle from "../../../components/medicals/ContentTitle";
import ContentSubtitle from "../../../components/medicals/ContentSubtitle";
import ProfileButton from "../../../components/medicals/ProfileButton";
import MedicalDialog from "../../../components/medicals/MedicalDialog";
import ProtectiveForm from "./forms/ProtectiveForm";
import { useDialogState } from "@/store";
import { useEffect } from "react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import useDeleteItem from "@/hooks/useDeleteItem";
import { deleteProtectiveFactor } from "@/services/api/clients/account_setup";
import VerificationCard from "../../../components/VerificationCard";
import Success from "@/components/ui/notifications/Success";
import { ToastContainer } from "react-toastify";
import { ProtectiveFactor } from "@/types/formSchema";

interface ProtectiveFactorsProps {
  data?: ProtectiveFactor[];
  readOnly?: boolean;
}

const ProtectiveFactors: React.FC<ProtectiveFactorsProps> = ({
  data,
  readOnly = false,
}) => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();

  const {
    protectiveFactors,
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
      await deleteProtectiveFactor(id);
      if (clientProfileId) {
        await fetchProfileMedicals(clientProfileId); // Refresh protective factors
      }
    },
    "protectiveFactors",
    updateState,
    clientProfileId ? () => fetchProfileMedicals(clientProfileId) : null
  );

  // If in readOnly mode, use externally provided `data`
  const protectiveFactorList = readOnly ? data || [] : protectiveFactors;

  useEffect(() => {
    if (!readOnly && clientProfileId) {
      fetchProfileMedicals(clientProfileId);
    }
  }, [clientProfileId, fetchProfileMedicals, readOnly]);

  const handleOpenDialog = () => {
    setDialogContent(<ProtectiveForm />);
  };

  return (
    <div className="flex flex-col gap-[67px]">
      {!readOnly && (
        <ProfileHeader
          label="Add protective factor"
          title="Protective Factor"
          icon={<Plus size={18} color="white" />}
          onAdd={handleOpenDialog}
        />
      )}

      {loading ? (
        <div className="relative w-full h-[200px] flex justify-center items-center">
          <SmallLoader />
        </div>
      ) : protectiveFactorList.length === 0 ? (
        <p>No medications listed.</p>
      ) : (
        protectiveFactorList.map((factor, index) => (
          <div className="flex flex-col gap-[28px]" key={factor.id || index}>
            <div className="flex flex-col gap-[6px]">
              <ContentTitle title="Factor" />
              <ContentSubtitle content={factor.factor || "N/A"} />
            </div>

            <div className="flex flex-col gap-[6px] ">
              <ContentTitle title="Description" />
              <ContentSubtitle content={factor.description || "N/A"} />
            </div>
            <div className="flex flex-col gap-[6px]  ">
              <ContentTitle title="Note" />
              <ContentSubtitle content={factor.notes || "N/A"} />
            </div>
            {!readOnly && (
              <ProfileButton
                icon={<Trash2 size={18} color="white" />}
                label="Delete protective factor"
                className="bg-[#FF2626]"
                onClick={() => handleDeleteClick(factor.id)}
              />
            )}
          </div>
        ))
      )}

      <MedicalDialog
        open={isOpen}
        onClose={closeDialog}
        title="Add Protective Factor"
        formComponent={<ProtectiveForm />}
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
              title="Are you sure you want to delete this protective factor?"
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
                title="Protective Factor Deleted"
                subtitle="The protective factor was successfully deleted from your records."
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

export default ProtectiveFactors;

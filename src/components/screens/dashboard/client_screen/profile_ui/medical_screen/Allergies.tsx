import { Plus } from "lucide-react";
import AllergyButton from "./ui/AllergyButton";
import ProfileHeader from "../../../components/medicals/ProfileHeader";
import { useDialogState } from "@/store";
import AllergyForm from "./forms/AllergyForm";
import MedicalDialog from "../../../components/medicals/MedicalDialog";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useEffect } from "react";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import useDeleteItem from "@/hooks/useDeleteItem";
import { deleteAllergy } from "@/services/api/clients/account_setup";
import VerificationCard from "../../../components/VerificationCard";
import Success from "@/components/ui/notifications/Success";
import { Allergy } from "@/types/formSchema";

interface AllergiesProps {
  data?: Allergy[];
  readOnly?: boolean;
}

const Allergies: React.FC<AllergiesProps> = ({ data, readOnly = false }) => {
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

  // If in readOnly mode, use externally provided `data`
  const allergyList = readOnly ? data || [] : allergies;

  useEffect(() => {
    if (!readOnly && clientProfileId) {
      fetchProfileMedicals(clientProfileId);
    }
  }, [clientProfileId, fetchProfileMedicals, readOnly]);

  const handleOpenDialog = () => {
    setDialogContent(<AllergyForm />);
  };

  return (
    <div className="flex flex-col gap-[67px]">
      {!readOnly && (
        <ProfileHeader
          label="Add allergy"
          title="Known Allergy"
          icon={<Plus size={18} color="white" />}
          onAdd={handleOpenDialog}
        />
      )}
      {loading ? (
        <div className="relative w-full h-[200px] flex justify-center items-center">
          <SmallLoader />
        </div>
      ) : allergyList.length === 0 ? (
        <p>No medications listed.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {allergyList.map((allergy) => (
            <AllergyButton
              key={allergy.id}
              label={allergy.name}
              onDelete={() => handleDeleteClick(allergy.id)}
              readOnly={readOnly}
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

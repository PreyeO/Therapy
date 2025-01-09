import { useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import ContentSubtitle from "./ui/ContentSubtitle";
import ContentTitle from "./ui/ContentTitle";
import ProfileHeader from "./ui/ProfileHeader";
import ProfileButton from "./ui/ProfileButton";
import MedicalDialog from "./ui/MedicalDialog";
import MedicationForm from "./forms/MedicationForm";
import { useDialogState } from "@/store";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import { deleteMedication } from "@/services/api/clients/account_setup";
import { ToastContainer } from "react-toastify";
import VerificationCard from "../../../components/VerificationCard";
import Success from "@/components/ui/notifications/Success";
import useDeleteItem from "@/hooks/useDeleteItem";

const Medications = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();
  const {
    medications,
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
      await deleteMedication(id);
    },
    "medications",
    updateState,
    () => {
      if (clientProfileId) {
        return fetchProfileMedicals(clientProfileId);
      }
      console.error("Client profile ID is null");
    }
  );

  useEffect(() => {
    if (clientProfileId) {
      fetchProfileMedicals(clientProfileId);
    }
  }, [clientProfileId, fetchProfileMedicals]);

  const handleOpenDialog = () => {
    setDialogContent(<MedicationForm />);
  };

  return (
    <div className="flex flex-col gap-[67px]">
      <ProfileHeader
        label="Add new medication"
        title="Meds"
        icon={<Plus size={18} color="white" />}
        onAdd={handleOpenDialog}
      />

      {loading ? (
        <div className="relative w-full h-[200px] flex justify-center items-center">
          <SmallLoader />
        </div>
      ) : (
        medications.map((med) => (
          <div className="flex flex-col gap-[28px]" key={med.id}>
            <div className="flex flex-wrap gap-x-[114px] gap-y-[30px]">
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Name" />
                <ContentSubtitle content={med.name} />
              </div>
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Dosage" />
                <ContentSubtitle
                  content={`${med.dosage_quantity || "N/A"} ${
                    med.dosage_unit || ""
                  }`}
                />
              </div>
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Prescriber" />
                <ContentSubtitle content={med.prescriber || "N/A"} />
              </div>
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Frequency" />
                <ContentSubtitle content={med.frequency || "N/A"} />
              </div>
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Start date" />
                <ContentSubtitle content={med.start_date || "N/A"} />
              </div>
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="End date" />
                <ContentSubtitle content={med.end_date || "N/A"} />
              </div>
            </div>
            <div className="flex flex-col gap-[6px]">
              <ContentTitle title="Purpose" />
              <ContentSubtitle content={med.purpose || "N/A"} />
            </div>
            <div className="flex flex-col gap-[6px]">
              <ContentTitle title="Note" />
              <ContentSubtitle content={med.notes || "N/A"} />
            </div>
            <ProfileButton
              icon={<Trash2 size={18} color="white" />}
              label="Delete medication"
              className="bg-[#FF2626]"
              onClick={() => handleDeleteClick(med.id)}
            />
          </div>
        ))
      )}

      <MedicalDialog
        open={isOpen}
        onClose={closeDialog}
        title="Add Medication"
        formComponent={<MedicationForm />}
      />

      {isVerificationOpen && (
        <MedicalDialog
          open={isVerificationOpen}
          onClose={handleCancelDelete}
          title="Confirm Deletion"
          formComponent={
            <VerificationCard
              onYes={handleConfirmDelete}
              onNo={handleCancelDelete}
              title="Are you sure you want to delete this medication?"
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
                title="Medication Deleted"
                subtitle="The medication was successfully deleted from your records."
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
      />
    </div>
  );
};

export default Medications;

import { Plus, Trash2 } from "lucide-react";
import ProfileHeader from "./ui/ProfileHeader";
import ContentTitle from "./ui/ContentTitle";
import ContentSubtitle from "./ui/ContentSubtitle";
import ProfileButton from "./ui/ProfileButton";
import MedicalDialog from "./ui/MedicalDialog";
import EncountersForm from "./forms/EncountersForm";
import { useDialogState } from "@/store";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useAppointmentsStore } from "@/store/useAppointment";
import { useEffect } from "react";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import useDeleteItem from "@/hooks/useDeleteItem";
import { deleteEncounter } from "@/services/api/clients/account_setup";
import { ToastContainer } from "react-toastify";
import Success from "@/components/ui/notifications/Success";
import VerificationCard from "../../../components/VerificationCard";

const Encounter = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();
  const {
    encounters = [],
    fetchProfileMedicals,
    clientProfileId,
    loading,
    updateState,
  } = useBusinessPeriodsStore();
  const { clinicians, fetchClinicianList } = useAppointmentsStore();

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
      await deleteEncounter(id);
      if (clientProfileId) {
        await fetchProfileMedicals(clientProfileId); // Refresh encounters
      }
    },
    "encounters",
    updateState,
    clientProfileId ? () => fetchProfileMedicals(clientProfileId) : null
  );

  useEffect(() => {
    if (clientProfileId) {
      fetchProfileMedicals(clientProfileId);
    }
    fetchClinicianList();
  }, [clientProfileId, fetchProfileMedicals, fetchClinicianList]);

  const handleOpenDialog = () => {
    setDialogContent(<EncountersForm />);
  };

  const getClinicianName = (clinicianProfileId) => {
    const clinician = clinicians.find(
      (clinician) => clinician.clinician_profile?.id === clinicianProfileId
    );
    return clinician
      ? `${clinician.first_name} ${clinician.last_name}`
      : "Unknown Clinician";
  };

  return (
    <div className="flex flex-col gap-[67px]">
      <ProfileHeader
        label="Add encounter"
        title="Encounter"
        icon={<Plus size={18} color="white" />}
        onAdd={handleOpenDialog}
      />

      {loading ? (
        <div className="relative w-full h-[200px] flex justify-center items-center">
          <SmallLoader />
        </div>
      ) : (
        encounters.map((encounter, index) => (
          <div className="flex flex-col gap-[28px]" key={index}>
            <div className="flex gap-[114px]">
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Clinician" />
                <ContentSubtitle
                  content={getClinicianName(encounter.clinician_profile)}
                />
              </div>
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Type" />
                <ContentSubtitle content={encounter.encounter_type || ""} />
              </div>
            </div>
            <div className="flex flex-col gap-[6px]">
              <ContentTitle title="Progress Note" />
              <ContentSubtitle content={encounter.progress_note || "N/A"} />
            </div>
            <div className="flex flex-col gap-[6px]">
              <ContentTitle title="Note" />
              <ContentSubtitle content={encounter.notes || "N/A"} />
            </div>
            <ProfileButton
              icon={<Trash2 size={18} color="white" />}
              label="Delete encounter"
              className="bg-[#FF2626]"
              onClick={() => handleDeleteClick(encounter.id)}
            />
          </div>
        ))
      )}
      <MedicalDialog
        open={isOpen}
        onClose={closeDialog}
        title="Add Encounter"
        formComponent={<EncountersForm />}
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
              title="Are you sure you want to delete this encounter?"
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
                title="Encounter Deleted"
                subtitle="The encounter was successfully deleted from your records."
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

export default Encounter;

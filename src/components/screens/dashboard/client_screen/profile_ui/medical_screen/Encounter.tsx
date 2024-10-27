import { Plus, Trash2 } from "lucide-react";
import ProfileHeader from "./ui/ProfileHeader";
import ContentTitle from "./ui/ContentTitle";
import ContentSubtitle from "./ui/ContentSubtitle";
import ProfileButton from "./ui/ProfileButton";
import MedicalDialog from "./ui/MedicalDialog";
import EncountersForm from "./forms/EncountersForm";
import { useDialogState } from "@/store";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useAppointmentsStore } from "@/store/useAppointment"; // Import the store with clinicians
import { useEffect } from "react";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";

const Encounter = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();
  const { encounters, fetchProfileMedicals, clientProfileId, loading } =
    useBusinessPeriodsStore();
  const { clinicians, fetchClinicianList } = useAppointmentsStore();

  useEffect(() => {
    if (clientProfileId) {
      fetchProfileMedicals(clientProfileId);
    }
    fetchClinicianList(); // Fetch clinician list on component mount
  }, [clientProfileId, fetchProfileMedicals, fetchClinicianList]);

  const handleOpenDialog = () => {
    setDialogContent(<EncountersForm />);
  };

  // Function to get clinician name from clinician profile ID
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
            <div className="flex flex-col gap-[6px] ">
              <ContentTitle title="Progress Note" />
              <ContentSubtitle content={encounter.progress_note || "N/A"} />
            </div>
            <div className="flex flex-col gap-[6px]  ">
              <ContentTitle title="Note" />
              <ContentSubtitle content={encounter.notes || "N/A"} />
            </div>
            <ProfileButton
              icon={<Trash2 size={18} color="white" />}
              label="Delete encounter"
              className="bg-[#FF2626]"
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
    </div>
  );
};

export default Encounter;

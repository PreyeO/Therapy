import { Plus } from "lucide-react";
import AllergyButton from "./ui/AllergyButton";
import ProfileHeader from "./ui/ProfileHeader";
import { useDialogState } from "@/store";
import AllergyForm from "./forms/AllergyForm";
import MedicalDialog from "./ui/MedicalDialog";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useEffect } from "react";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";

const Allergies = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();
  const { allergies, fetchProfileMedicals, clientProfileId, loading } =
    useBusinessPeriodsStore();

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
          {" "}
          {/* Flex container for row display */}
          {allergies.map((allergy, index) => (
            <AllergyButton key={index} label={allergy.name} />
          ))}
        </div>
      )}
      <MedicalDialog
        open={isOpen}
        onClose={closeDialog}
        title="Add Allergy"
        formComponent={<AllergyForm />}
      />
    </div>
  );
};

export default Allergies;

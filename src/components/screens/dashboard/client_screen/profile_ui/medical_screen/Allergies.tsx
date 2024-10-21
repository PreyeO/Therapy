import { Plus } from "lucide-react";
import AllergyButton from "./ui/AllergyButton";
import ProfileHeader from "./ui/ProfileHeader";
import { useDialogState } from "@/store";
import AllergyForm from "./forms/AllergyForm";
import MedicalDialog from "./ui/MedicalDialog";

const Allergies = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();

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
      <div className="flex gap-[14px]">
        <AllergyButton label="Lactose intolerant" />
        <AllergyButton label="Peanut Allergy" />
      </div>
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

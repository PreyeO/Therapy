import { useDialogState } from "@/store";
import MedicalDocForm from "./forms/MedicalDocsForm";
import ProfileHeader from "./ui/ProfileHeader";
import { Plus, Trash2 } from "lucide-react";
import ProfileButton from "./ui/ProfileButton";
import MedicalDialog from "./ui/MedicalDialog";

const ClinicalDoc = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();

  const handleOpenDialog = () => {
    setDialogContent(<MedicalDocForm />);
  };
  return (
    <div className="flex flex-col gap-[67px]">
      <ProfileHeader
        label="Add clinical documents"
        title="Clinical Document"
        icon={<Plus size={18} color="white" />}
        onAdd={handleOpenDialog}
      />
      <div className="flex flex-col gap-[28px]">
        <ProfileButton
          icon={<Trash2 size={18} color="white" />}
          label="Delete encounter"
          className="bg-[#FF2626]"
        />

        <MedicalDialog
          open={isOpen}
          onClose={closeDialog}
          title="Add Clinical Document"
          formComponent={<MedicalDocForm />}
        />
      </div>
    </div>
  );
};

export default ClinicalDoc;

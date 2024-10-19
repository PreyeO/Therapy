import { Plus, Trash2 } from "lucide-react";
import ProfileHeader from "./ui/ProfileHeader";
import ContentTitle from "./ui/ContentTitle";
import ContentSubtitle from "./ui/ContentSubtitle";
import ProfileButton from "./ui/ProfileButton";
import { useDialogState } from "@/store";
import MedicalConditionForm from "./forms/MedicalConditionForm";
import MedicalDialog from "./ui/MedicalDialog";

const MedicalCondition = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();

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
      <div className="flex flex-col gap-[28px]">
        <div className="flex  gap-[114px]">
          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="Name of medical condition" />
            <ContentSubtitle content="Asthma" />
          </div>

          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="Diagnosis date" />
            <ContentSubtitle content="2/10/2024" />
          </div>
        </div>

        <div className="flex flex-col gap-[6px]  ">
          <ContentTitle title="Note" />
          <ContentSubtitle content="Lorem ipsum dolor sit amet consectetur. Faucibus sit facilisi ultrices risus phasellus sodales bibendum. Viverra ac pretium leo orci pharetra facilisi augue. Fermentum commodo et diam dignissim. Semper molestie ut quis in et id mattis cursus lectus." />
        </div>
        <ProfileButton
          icon={<Trash2 size={18} color="white" />}
          label="Delete medical info"
          className="bg-[#FF2626]"
        />
      </div>
      <MedicalDialog
        open={isOpen}
        onClose={closeDialog}
        title="Add Medical condition"
        formComponent={<MedicalConditionForm />}
      />
    </div>
  );
};

export default MedicalCondition;

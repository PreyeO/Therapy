import { Plus, Trash2 } from "lucide-react";
import ProfileHeader from "./ui/ProfileHeader";
import ContentTitle from "./ui/ContentTitle";
import ContentSubtitle from "./ui/ContentSubtitle";
import ProfileButton from "./ui/ProfileButton";
import MedicalDialog from "./ui/MedicalDialog";
import EncountersForm from "./forms/EncountersForm";
import { useDialogState } from "@/store";

const Encounter = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();

  const handleOpenDialog = () => {
    setDialogContent(<EncountersForm />);
  };
  return (
    <div className="flex flex-col gap-[67px]">
      <ProfileHeader
        label="Add encounter"
        title="Encounter"
        icon={<Plus size={18} color="white" />}
        onAdd={handleOpenDialog}
      />
      <div className="flex flex-col gap-[28px]">
        <div className="flex gap-[114px]">
          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="Clinician" />
            <ContentSubtitle content="Dr.Preye" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="Type" />
            <ContentSubtitle content="Physical" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="P" />
            <ContentSubtitle content="Dr.Preye" />
          </div>

          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="Date" />
            <ContentSubtitle content="2/10/2024" />
          </div>
        </div>
        <div className="flex flex-col gap-[6px] ">
          <ContentTitle title="Progress Note" />
          <ContentSubtitle content="Lorem ipsum dolor sit amet consectetur. Pharetra quis consectetur et nunc mattis." />
        </div>
        <div className="flex flex-col gap-[6px]  ">
          <ContentTitle title="Note" />
          <ContentSubtitle content="Lorem ipsum dolor sit amet consectetur. Faucibus sit facilisi ultrices risus phasellus sodales bibendum. Viverra ac pretium leo orci pharetra facilisi augue. Fermentum commodo et diam dignissim. Semper molestie ut quis in et id mattis cursus lectus." />
        </div>
        <ProfileButton
          icon={<Trash2 size={18} color="white" />}
          label="Delete encounter"
          className="bg-[#FF2626]"
        />
      </div>
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

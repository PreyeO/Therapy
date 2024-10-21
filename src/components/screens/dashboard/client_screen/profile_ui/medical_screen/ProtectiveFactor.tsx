import { Plus, Trash2 } from "lucide-react";
import ProfileHeader from "./ui/ProfileHeader";
import ContentTitle from "./ui/ContentTitle";
import ContentSubtitle from "./ui/ContentSubtitle";
import ProfileButton from "./ui/ProfileButton";
import MedicalDialog from "./ui/MedicalDialog";
import ProtectiveForm from "./forms/ProtectiveForm";
import { useDialogState } from "@/store";

const ProtectiveFactor = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();

  const handleOpenDialog = () => {
    setDialogContent(<ProtectiveForm />);
  };
  return (
    <div className="flex flex-col gap-[67px]">
      <ProfileHeader
        label="Add protective factor"
        title="Protective Factor"
        icon={<Plus size={18} color="white" />}
        onAdd={handleOpenDialog}
      />
      <div className="flex flex-col gap-[28px]">
        <div className="flex flex-col gap-[6px]">
          <ContentTitle title="Factor" />
          <ContentSubtitle content="-----------------" />
        </div>

        <div className="flex flex-col gap-[6px] ">
          <ContentTitle title="Description" />
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
        title="Add Protective Factor"
        formComponent={<ProtectiveForm />}
      />
    </div>
  );
};

export default ProtectiveFactor;

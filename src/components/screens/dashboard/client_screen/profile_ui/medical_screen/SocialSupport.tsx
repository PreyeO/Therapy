import { Plus, Trash2 } from "lucide-react";
import ProfileHeader from "./ui/ProfileHeader";
import ContentTitle from "./ui/ContentTitle";
import ContentSubtitle from "./ui/ContentSubtitle";
import ProfileButton from "./ui/ProfileButton";
import { useDialogState } from "@/store";
import SocialSupportForm from "./forms/SocialSupportForm";
import MedicalDialog from "./ui/MedicalDialog";

const SocialSupport = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();

  const handleOpenDialog = () => {
    setDialogContent(<SocialSupportForm />);
  };
  return (
    <div className="flex flex-col gap-[67px]">
      <ProfileHeader
        label="Add social support"
        title="Social Support"
        icon={<Plus size={18} color="white" />}
        onAdd={handleOpenDialog}
      />
      <div className="flex flex-col gap-[28px]">
        <div className="flex gap-[114px]">
          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="Type" />
            <ContentSubtitle content="Physical" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="Strength" />
            <ContentSubtitle content="-----------------" />
          </div>

          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="Date" />
            <ContentSubtitle content="2/10/2024" />
          </div>
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
        title="Add Social Support"
        formComponent={<SocialSupportForm />}
      />
    </div>
  );
};

export default SocialSupport;

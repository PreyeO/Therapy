import { Plus, Trash2 } from "lucide-react";
import ProfileHeader from "./ui/ProfileHeader";
import ContentTitle from "./ui/ContentTitle";
import ContentSubtitle from "./ui/ContentSubtitle";
import ProfileButton from "./ui/ProfileButton";
import { useDialogState } from "@/store";
import SocialSupportForm from "./forms/SocialSupportForm";
import MedicalDialog from "./ui/MedicalDialog";
import { useEffect } from "react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";

const SocialSupport = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();

  const { socialSupports, fetchProfileMedicals, clientProfileId, loading } =
    useBusinessPeriodsStore();

  useEffect(() => {
    if (clientProfileId) {
      fetchProfileMedicals(clientProfileId);
    }
  }, [clientProfileId, fetchProfileMedicals]);

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
      {loading ? (
        <div className="relative w-full h-[200px] flex justify-center items-center">
          <SmallLoader />
        </div>
      ) : (
        socialSupports.map((support, index) => (
          <div className="flex flex-col gap-[28px]" key={index}>
            <div className="flex gap-[114px]">
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Type" />
                <ContentSubtitle
                  content={support.social_support_type || "N/A"}
                />
              </div>
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Strength" />
                <ContentSubtitle content={support.strength || "N/A"} />
              </div>
            </div>
            <div className="flex flex-col gap-[6px] ">
              <ContentTitle title="Description" />
              <ContentSubtitle content={support.description || "N/A"} />
            </div>
            <div className="flex flex-col gap-[6px]  ">
              <ContentTitle title="Note" />
              <ContentSubtitle content={support.notes || "N/A"} />
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
        title="Add Social Support"
        formComponent={<SocialSupportForm />}
      />
    </div>
  );
};

export default SocialSupport;

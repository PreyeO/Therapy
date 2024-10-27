import { Plus, Trash2 } from "lucide-react";
import ProfileHeader from "./ui/ProfileHeader";
import ContentTitle from "./ui/ContentTitle";
import ContentSubtitle from "./ui/ContentSubtitle";
import ProfileButton from "./ui/ProfileButton";
import SubstanceUseForm from "./forms/SubstanceUseForm";
import MedicalDialog from "./ui/MedicalDialog";
import { useDialogState } from "@/store";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useEffect } from "react";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";

const SubstanceUse = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();

  const { substanceUses, fetchProfileMedicals, clientProfileId, loading } =
    useBusinessPeriodsStore();

  useEffect(() => {
    if (clientProfileId) {
      fetchProfileMedicals(clientProfileId);
    }
  }, [clientProfileId, fetchProfileMedicals]);

  const handleOpenDialog = () => {
    setDialogContent(<SubstanceUseForm />);
  };
  return (
    <div className="flex flex-col gap-[67px]">
      <ProfileHeader
        label="Add substance use"
        title="Substance Use"
        icon={<Plus size={18} color="white" />}
        onAdd={handleOpenDialog}
      />
      {loading ? (
        <div className="relative w-full h-[200px] flex justify-center items-center">
          <SmallLoader />
        </div>
      ) : (
        substanceUses.map((substance, index) => (
          <div className="flex flex-col gap-[28px]" key={index}>
            <div className="flex gap-[114px]">
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Type" />
                <ContentSubtitle content={substance.substance_type || "N/A"} />
              </div>
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Frequency" />
                <ContentSubtitle content={substance.frequency || "N/A"} />
              </div>
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
        title="Add Subtance Use"
        formComponent={<SubstanceUseForm />}
      />
    </div>
  );
};

export default SubstanceUse;

import { Plus, Trash2 } from "lucide-react";
import ProfileHeader from "./ui/ProfileHeader";
import ContentTitle from "./ui/ContentTitle";
import ContentSubtitle from "./ui/ContentSubtitle";
import ProfileButton from "./ui/ProfileButton";
import MedicalDialog from "./ui/MedicalDialog";
import ProtectiveForm from "./forms/ProtectiveForm";
import { useDialogState } from "@/store";
import { useEffect } from "react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";

const ProtectiveFactor = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();

  const { protectiveFactors, fetchProfileMedicals, clientProfileId, loading } =
    useBusinessPeriodsStore();

  useEffect(() => {
    if (clientProfileId) {
      fetchProfileMedicals(clientProfileId);
    }
  }, [clientProfileId, fetchProfileMedicals]);

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

      {loading ? (
        <div className="relative w-full h-[200px] flex justify-center items-center">
          <SmallLoader />
        </div>
      ) : (
        protectiveFactors.map((factor, index) => (
          <div className="flex flex-col gap-[28px]" key={index}>
            <div className="flex flex-col gap-[6px]">
              <ContentTitle title="Factor" />
              <ContentSubtitle content={factor.factor || "N/A"} />
            </div>

            <div className="flex flex-col gap-[6px] ">
              <ContentTitle title="Description" />
              <ContentSubtitle content={factor.description || "N/A"} />
            </div>
            <div className="flex flex-col gap-[6px]  ">
              <ContentTitle title="Note" />
              <ContentSubtitle content={factor.notes || "N/A"} />
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
        title="Add Protective Factor"
        formComponent={<ProtectiveForm />}
      />
    </div>
  );
};

export default ProtectiveFactor;

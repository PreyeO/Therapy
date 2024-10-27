import { Plus, Trash2 } from "lucide-react";
import ProfileHeader from "./ui/ProfileHeader";
import ContentTitle from "./ui/ContentTitle";
import ContentSubtitle from "./ui/ContentSubtitle";
import ProfileButton from "./ui/ProfileButton";
import { useDialogState } from "@/store";
import MedicalConditionForm from "./forms/MedicalConditionForm";
import MedicalDialog from "./ui/MedicalDialog";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useEffect } from "react";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";

const MedicalCondition = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();
  const { medicalConditions, fetchProfileMedicals, clientProfileId, loading } =
    useBusinessPeriodsStore();

  useEffect(() => {
    if (clientProfileId) {
      fetchProfileMedicals(clientProfileId);
    }
  }, [clientProfileId, fetchProfileMedicals]);

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

      {loading ? (
        <div className="relative w-full h-[200px] flex justify-center items-center">
          <SmallLoader />
        </div>
      ) : (
        medicalConditions.map((condition, index) => (
          <div className="flex flex-col gap-[28px]" key={index}>
            <div className="flex  gap-[114px]">
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Name of medical condition" />
                <ContentSubtitle content={condition.name || "N/A"} />
              </div>

              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Diagnosis date" />
                <ContentSubtitle content={condition.diagnosis_date || "N/A"} />
              </div>
            </div>

            <div className="flex flex-col gap-[6px]  ">
              <ContentTitle title="Note" />
              <ContentSubtitle content={condition.notes || "N/A"} />
            </div>
            <ProfileButton
              icon={<Trash2 size={18} color="white" />}
              label="Delete medical info"
              className="bg-[#FF2626]"
            />
          </div>
        ))
      )}
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

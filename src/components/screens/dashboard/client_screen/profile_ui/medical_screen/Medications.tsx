import { Plus, Trash2 } from "lucide-react";
import ContentSubtitle from "./ui/ContentSubtitle";
import ContentTitle from "./ui/ContentTitle";
import ProfileHeader from "./ui/ProfileHeader";
import ProfileButton from "./ui/ProfileButton";
import MedicalDialog from "./ui/MedicalDialog";
import MedicationForm from "./forms/MedicationForm";
import { useDialogState } from "@/store";

const Medications = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();

  const handleOpenDialog = () => {
    setDialogContent(<MedicationForm />);
  };

  return (
    <div className="flex flex-col gap-[67px] ">
      <ProfileHeader
        label="Add new medication"
        title="Meds"
        icon={<Plus size={18} color="white" />}
        onAdd={handleOpenDialog} // Trigger opening the dialog via Zustand
      />
      <div className="flex flex-col gap-[28px]">
        <div className="flex flex-wrap gap-x-[114px] gap-y-[30px]">
          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="Name" />
            <ContentSubtitle content="Ibuprofen" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="Dosage" />
            <ContentSubtitle content="500mg" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="Prescriber" />
            <ContentSubtitle content="Dr.Preye" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="Frequency" />
            <ContentSubtitle content="2/day" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="Start date" />
            <ContentSubtitle content="2/10/2024" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <ContentTitle title="End date" />
            <ContentSubtitle content="20/10/2024" />
          </div>
        </div>
        <div className="flex flex-col gap-[6px] ">
          <ContentTitle title="Purpose" />
          <ContentSubtitle content="Lorem ipsum dolor sit amet consectetur. Pharetra quis consectetur et nunc mattis." />
        </div>
        <div className="flex flex-col gap-[6px]  ">
          <ContentTitle title="Note" />
          <ContentSubtitle content="Lorem ipsum dolor sit amet consectetur. Faucibus sit facilisi ultrices risus phasellus sodales bibendum. Viverra ac pretium leo orci pharetra facilisi augue. Fermentum commodo et diam dignissim. Semper molestie ut quis in et id mattis cursus lectus." />
        </div>
        <ProfileButton
          icon={<Trash2 size={18} color="white" />}
          label="Delete medication"
          className="bg-[#FF2626]"
        />
      </div>
      <MedicalDialog
        open={isOpen}
        onClose={closeDialog}
        title="Add Medication"
        formComponent={<MedicationForm />}
      />
    </div>
  );
};

export default Medications;

import { useDialogState } from "@/store";
import MedicalDocForm from "./forms/MedicalDocsForm";
import ProfileHeader from "./ui/ProfileHeader";
import { File, Plus, Trash } from "lucide-react";

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
      <div className="grid grid-cols-2 gap-[11px]">
        <div className="w-[399px] h-[76px] bg-[#6D7C430D] flex justify-between items-center px-5 rounded-[15px]">
          <div className="flex gap-1">
            <File size={34} color="#6D7C43" />
            <div className="flex flex-col w-[169px]">
              <p className="text-sm font-normal">Medical checkup report.pdf</p>
              <p className="text-[#BCBCBC] text-[12px]">2MB</p>
            </div>
          </div>
          <Trash size={20} color="#FF2626" />
        </div>
        <div className="w-[399px] h-[76px] bg-[#6D7C430D] flex justify-between items-center px-5 rounded-[15px]">
          <div className="flex gap-1">
            <File size={34} color="#6D7C43" />
            <div className="flex flex-col w-[169px]">
              <p className="text-sm font-normal">Medical checkup report.pdf</p>
              <p className="text-[#BCBCBC] text-[12px]">2MB</p>
            </div>
          </div>
          <Trash size={20} color="#FF2626" />
        </div>
        <div className="w-[399px] h-[76px] bg-[#6D7C430D] flex justify-between items-center px-5 rounded-[15px]">
          <div className="flex gap-1">
            <File size={34} color="#6D7C43" />
            <div className="flex flex-col w-[169px]">
              <p className="text-sm font-normal">Medical checkup report.pdf</p>
              <p className="text-[#BCBCBC] text-[12px]">2MB</p>
            </div>
          </div>
          <Trash size={20} color="#FF2626" />
        </div>
      </div>

      <MedicalDialog
        open={isOpen}
        onClose={closeDialog}
        title="Add Clinical Document"
        formComponent={<MedicalDocForm />}
      />
    </div>
  );
};

export default ClinicalDoc;

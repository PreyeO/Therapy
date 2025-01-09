import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AllergyButtonProps {
  label: string;
  onDelete: () => void;
}

const AllergyButton: React.FC<AllergyButtonProps> = ({ label, onDelete }) => {
  return (
    <Button
      className="w-[166px] h-[37px] flex items-center justify-center gap-[5px] text-sm font-normal text-army_green bg-[#8BA05F1A] rounded-full cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        onDelete();
      }}
    >
      {label}
      <X size={16} />
    </Button>
  );
};

export default AllergyButton;

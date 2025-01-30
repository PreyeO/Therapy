import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AllergyButtonProps {
  label: string;
  onDelete: () => void;
  readOnly?: boolean; // Add readOnly prop
}

const AllergyButton: React.FC<AllergyButtonProps> = ({
  label,
  onDelete,
  readOnly = false,
}) => {
  return (
    <Button
      className="w-[166px] h-[37px] flex items-center justify-center gap-[5px] text-sm font-normal text-army_green bg-[#8BA05F1A] rounded-full cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        if (!readOnly) {
          onDelete();
        }
      }}
    >
      {label}
      {!readOnly && <X size={16} />} {/* Conditionally show the X icon */}
    </Button>
  );
};

export default AllergyButton;

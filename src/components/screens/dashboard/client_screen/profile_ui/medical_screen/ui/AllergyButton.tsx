import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AllergyButtonProps {
  label: string;
}

const AllergyButton: React.FC<AllergyButtonProps> = ({ label }) => {
  return (
    <Button className="w-[166px]  h-[37px] flex items-center justify-center gap-[5px] text-sm font-normal text-army_green bg-[#8BA05F1A] rounded-full cursor-pointer">
      {label}
      <X size={16} />
    </Button>
  );
};

export default AllergyButton;

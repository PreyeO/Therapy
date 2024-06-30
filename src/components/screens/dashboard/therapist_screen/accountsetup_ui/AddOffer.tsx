import { SquarePlus } from "lucide-react";
import { useState } from "react";

const AddOffer = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };
  return (
    <div
      className="mx-auto w-[191px] flex items-center justify-center gap-2 text-lg font-bold text-army_green bg-[#6D7C431A] rounded-full cursor-pointer h-[44px]"
      onClick={toggleOverlay}
    >
      <SquarePlus size={24} color="#6D7C43" />
      Add offer
    </div>
  );
};

export default AddOffer;

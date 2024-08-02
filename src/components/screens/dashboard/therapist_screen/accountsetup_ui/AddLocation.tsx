import { SquarePlus } from "lucide-react";
import { useState } from "react";
import OverlayPortal from "./OverlayPortal";
import ServiceCard from "./ServiceCard";

const AddLocation = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };
  return (
    <div
      className="mx-auto w-[311px] flex items-center justify-center gap-2 text-lg font-bold text-army_green bg-[#6D7C431A] rounded-full cursor-pointer h-[56px]"
      onClick={toggleOverlay}
    >
      <SquarePlus size={24} color="#6D7C43" />
      Add appointment location
      {isOverlayVisible && (
        <OverlayPortal>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <ServiceCard />
          </div>
        </OverlayPortal>
      )}
    </div>
  );
};

export default AddLocation;

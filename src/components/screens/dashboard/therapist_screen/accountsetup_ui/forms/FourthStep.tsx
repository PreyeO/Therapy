// FourthStep.tsx
import { useState } from "react";
import SetupHeader from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/SetupHeader";
import { SquarePlus } from "lucide-react";
import ServiceCard from "../ServiceCard";
import OverlayPortal from "../OverlayPortal";

const FourthStep = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <div className="relative flex flex-col gap-20">
      <div className="text-center">
        <SetupHeader
          title="What service does your practice offer"
          subtitle="Streamline billing and scheduling by adding services offered by your practice. This information will appear when clients are requesting appointments."
        />
      </div>
      <div
        className="mx-auto w-[191px] flex items-center justify-center gap-2 text-lg font-bold text-army_green bg-[#6D7C431A] rounded-full cursor-pointer h-[44px]"
        onClick={toggleOverlay}
      >
        <SquarePlus size={24} color="#6D7C43" />
        Add offer
      </div>

      {isOverlayVisible && (
        <OverlayPortal>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <ServiceCard toggleOverlay={toggleOverlay} />
          </div>
        </OverlayPortal>
      )}
    </div>
  );
};

export default FourthStep;

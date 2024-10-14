import React from "react";
import { Button } from "@/components/ui/button";

interface WarningCardProps {
  onYes: () => void;
  onNo: () => void;
}

const WarningCard: React.FC<WarningCardProps> = ({ onYes, onNo }) => (
  <div className="flex flex-col items-center justify-center h-[351px] w-full">
    {/* Centered content block */}
    <div className="w-[466px] text-center">
      <h1 className="text-red-600 font-medium text-[25px]">Warning</h1>

      <p className="text-lg leading-[22.32px] pt-[26px]">
        You will be charged for a late cancellation. Are you sure you want to
        proceed?
      </p>

      {/* Buttons block */}
      <div className="flex gap-[14px] mt-[36px] justify-center">
        <Button
          onClick={onNo}
          className="w-[200px] h-[55px] rounded-full border bg-white border-army_green text-army_green"
        >
          No
        </Button>
        <Button
          onClick={onYes}
          className="w-[225px] h-[55px] text-white rounded-full bg-army_green"
        >
          Yes
        </Button>
      </div>
    </div>
  </div>
);

export default WarningCard;

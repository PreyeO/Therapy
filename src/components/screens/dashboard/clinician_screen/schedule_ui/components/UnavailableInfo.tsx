import { Clock } from "lucide-react";
import React from "react";

type UnavailableInfoProps = {
  reason: string;
  start: Date;
  end: Date;
};

const UnavailableInfo: React.FC<UnavailableInfoProps> = ({
  reason,
  start,
  end,
}) => {
  return (
    <div className="p-2 flex flex-col gap-6">
      <div className=" font-medium text-ms">
        <h2>Time</h2>
        <div className="flex justify-center items-center gap-3">
          <div className="max-w-[130px] border border-[#808080] rounded-md p-1 flex gap-1 justify-center items-center">
            <Clock size={15} strokeWidth={2} color="#808080" />
            {start.toLocaleTimeString()}
          </div>
          <div className="max-w-[130px] border border-[#808080] rounded-md p-1 flex gap-1 justify-center items-center">
            <Clock size={15} strokeWidth={2} color="#808080" />
            {end.toLocaleTimeString()}
          </div>
        </div>
      </div>
      <div className=" font-medium text-ms">
        <h2>Reason</h2>

        <div className="bg-[#F9F9F9] w-full p-2 rounded-md"> {reason}</div>
      </div>
    </div>
  );
};

export default UnavailableInfo;

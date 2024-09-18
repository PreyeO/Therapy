import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";
import { format } from "date-fns";

type ScheduleInfoProps = {
  title: string;
  first_name: string;
  last_name: string;
  serviceDuration: number;
  start: Date;
  end: Date;
};

const ScheduleInfo: React.FC<ScheduleInfoProps> = ({
  title,
  first_name,
  last_name,
  serviceDuration,
  start,
  end,
}) => {
  // Format the time in the local timezone using date-fns
  const formattedStartTime = format(new Date(start), "hh:mm aaaa"); // Local time
  const formattedEndTime = format(new Date(end), "hh:mm aaaa"); // Local time

  return (
    <div className="p-2 flex flex-col gap-6">
      <div className="text-lg text-army_green flex gap-1 font-bold">
        <p>{first_name}</p>
        <p>{last_name}</p>
      </div>
      <div className="font-medium text-ms">
        <Select>
          <SelectTrigger className="rounded-full bg-[#8BA05F26] w-full">
            <SelectValue placeholder="Scheduled" />
          </SelectTrigger>
          <SelectContent className="absolute z-50 w-auto bg-white border shadow-lg">
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Reschedule">Reschedule</SelectItem>
            <SelectItem value="Cancel">Cancel</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full bg-[#0000001A] border"></div>

      <div className="font-medium text-ms">
        <h2>Time</h2>

        <div className="flex gap-3">
          <div className="flex justify-center items-center">
            <div className="max-w-[130px] border border-[#808080] rounded-md p-1 flex gap-1 justify-center items-center">
              <Clock size={15} strokeWidth={2} color="#808080" />
              {formattedStartTime}
            </div>
            <div className="max-w-[130px] border border-[#808080] rounded-md p-1 flex gap-1 justify-center items-center">
              <Clock size={15} strokeWidth={2} color="#808080" />
              {formattedEndTime}
            </div>
          </div>
          <div className="border border-[#808080] rounded-md p-1">
            {serviceDuration}mins
          </div>
        </div>
      </div>
      <div className="font-medium text-ms">
        <h2>Service</h2>
        <div className="bg-[#F9F9F9] w-full p-2 rounded-md">{title}</div>
      </div>
    </div>
  );
};

export default ScheduleInfo;

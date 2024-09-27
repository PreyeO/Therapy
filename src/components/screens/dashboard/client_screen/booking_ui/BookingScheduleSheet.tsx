import React, { useState } from "react";
import { addDays, format, startOfWeek, isSameDay, isWeekend } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import Tooltip components
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import AvailableTime from "./AvailableTime"; // Import the AvailableTime component
import { Plus } from "lucide-react"; // Assuming you are using Lucide icons

type SimpleScheduleSheetProps = {
  weekStartDate: Date;
  onContinue: () => void;
};

const BookingScheduleSheet: React.FC<SimpleScheduleSheetProps> = ({
  weekStartDate,
  onContinue,
}) => {
  const [openPopoverSlot, setOpenPopoverSlot] = useState<string | null>(null); // Track which popover is open

  const handleOpenPopover = (slot: string) => {
    setOpenPopoverSlot(slot); // Open the popover for the selected slot
  };

  const handleClosePopover = () => {
    setOpenPopoverSlot(null); // Close the popover
  };

  const daysOfWeek = Array.from({ length: 7 }).map((_, index) =>
    addDays(startOfWeek(weekStartDate, { weekStartsOn: 0 }), index)
  );

  const timeSlots = Array.from({ length: 11 }).map(
    (_, index) => `${7 + index}:00`
  );

  return (
    <div className="w-full h-full overflow-x-auto relative">
      <div className="min-w-[1000px] relative z-30 ">
        <div className="grid grid-cols-8 border-b">
          <div className="col-span-1 p-2 border-r text-center text-[#71717A] text-sm flex flex-col items-center justify-center">
            SCHEDULE
          </div>
          {daysOfWeek.map((day) => (
            <div
              key={day.toString()}
              className={`col-span-1 p-2 border-r ${
                isWeekend(day)
                  ? "bg-[#FAFAFB]"
                  : isSameDay(day, new Date())
                  ? "bg-[#EFF6FF]"
                  : "bg-white"
              }`}
            >
              <div className="font-bold text-[#71717A] text-[10px]">
                {format(day, "EEE")}
              </div>
              <div className="text-[22px] font-medium">{format(day, "dd")}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8">
          <div className="col-span-1 border-r">
            {timeSlots.map((slot) => (
              <div
                key={slot}
                className={`h-[60px] border-b flex items-center justify-center bg-[#EFF6FF] text-sm font-normal`}
              >
                {slot}
              </div>
            ))}
          </div>
          {daysOfWeek.map((day) => (
            <div
              key={day.toString()}
              className={`col-span-1 border-r ${
                isWeekend(day)
                  ? "bg-[#FAFAFB]"
                  : isSameDay(day, new Date())
                  ? "bg-[#EFF6FF]"
                  : "bg-white"
              }`}
            >
              {timeSlots.map((slot) => (
                <div key={slot} className={`h-[60px] border-b relative`}>
                  {/* Popover for each slot */}
                  <Popover
                    open={openPopoverSlot === `${day}-${slot}`} // Open popover for the clicked slot
                    onOpenChange={(open) => {
                      if (open) {
                        handleOpenPopover(`${day}-${slot}`); // Open specific popover
                      } else {
                        handleClosePopover(); // Close popover
                      }
                    }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <PopoverTrigger asChild className="">
                            <div
                              className="absolute inset-0 cursor-pointer flex items-center justify-center text-[14px] hover:bg-gray-200 group"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent grid click
                                handleOpenPopover(`${day}-${slot}`);
                              }}
                            >
                              {/* Plus icon shown only on hover */}
                              <div className="opacity-0 group-hover:opacity-100">
                                <Plus size={30} color="#6D7C43" />
                              </div>
                            </div>
                          </PopoverTrigger>
                        </TooltipTrigger>

                        {/* Tooltip content is shown when hovering over the entire grid */}
                        <TooltipContent
                          side="top"
                          className="bg-army_green text-white"
                        >
                          Available time
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <PopoverContent
                      className="z-50 pointer-events-auto  overflow-y-auto" // Ensure popover content remains interactive
                      onClick={(e) => e.stopPropagation()} // Prevent clicks inside the popover from affecting grid
                      onMouseDown={(e) => e.stopPropagation()} // Prevent other interactions triggering clicks
                      side="top"
                    >
                      <AvailableTime
                        day={day}
                        timeSlot={slot}
                        onContinue={() => {
                          handleClosePopover(); // Close popover on continue
                          onContinue();
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingScheduleSheet;

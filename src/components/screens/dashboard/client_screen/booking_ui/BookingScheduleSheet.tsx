import React, { useState, useEffect } from "react";
import {
  addDays,
  format,
  startOfWeek,
  isSameDay,
  isBefore,
  getMinutes,
} from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import AvailableTime from "./AvailableTime";
import { Plus } from "lucide-react";
import { BookingData, BusinessPeriod } from "@/types/formSchema";
import { mapBusinessHours } from "@/lib/utils";

type SimpleScheduleSheetProps = {
  weekStartDate: Date;
  blockedSlots: Array<{ start: Date; end: Date }>;
  onContinue: (data: BookingData) => void;
  businessPeriods?: BusinessPeriod[];
};

// Overlap checking function
const isSlotBlocked = (
  day: Date,
  timeSlot: string,
  blockedSlots: Array<{ start: Date; end: Date }>
): boolean => {
  const [slotHour, slotMinute] = timeSlot.split(":");
  const slotStart = new Date(day);
  slotStart.setHours(Number(slotHour), Number(slotMinute), 0, 0);

  // Calculate the end time for the current slot (assuming each slot is 20 minutes)
  const slotEnd = new Date(slotStart);
  slotEnd.setMinutes(slotEnd.getMinutes() + 20);

  // Updated overlap logic: check if the new slot overlaps any blocked time
  return blockedSlots.some(({ start, end }) => {
    // Ensure the end time of a slot is not counted as an overlap if it matches the start time of the next slot
    return (
      (slotStart >= start && slotStart < end) || // Start falls within blocked slot
      (slotEnd > start && slotEnd <= end) // End falls within blocked slot
    );
  });
};

const BookingScheduleSheet: React.FC<SimpleScheduleSheetProps> = ({
  weekStartDate,
  blockedSlots,
  onContinue,
  businessPeriods = [],
}) => {
  const [openPopoverSlot, setOpenPopoverSlot] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const businessHours = mapBusinessHours(businessPeriods);

  const daysOfWeek = Array.from({ length: 7 }).map((_, index) =>
    addDays(startOfWeek(weekStartDate, { weekStartsOn: 0 }), index)
  );

  const timeSlots = Array.from({ length: 11 }).map((_, hourIndex) => {
    const hour = hourIndex + 7;
    return [`${hour}:00`, `${hour}:20`, `${hour}:40`];
  });

  const hourlyLabels = Array.from({ length: 11 }).map(
    (_, index) => `${7 + index}:00`
  );

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentTimePosition = () => {
    const minutes = getMinutes(currentTime);
    return `${(minutes / 60) * 100}%`;
  };

  const isOutsideBusinessHours = (dayKey: string, slotStart: Date): boolean => {
    const businessDayHours = businessHours[dayKey];

    if (!businessDayHours) return true;

    const hour = slotStart.getHours();
    const minute = slotStart.getMinutes();

    // Block all hours before opening and after closing
    if (
      hour < businessDayHours.openingHour ||
      hour > businessDayHours.closingHour ||
      (hour === businessDayHours.closingHour && minute >= 0)
    ) {
      return true; // Block time slot
    }

    return false; // Slot is within business hours
  };

  return (
    <div className="w-full h-full overflow-x-auto relative">
      <div className="min-w-[1000px] relative z-30">
        <div className="flex">
          <div className="w-[50px]"></div>
          <div className="flex-1 grid grid-cols-7 border-b-2 border-[#6D7C43]">
            {daysOfWeek.map((day) => (
              <div
                key={day.toString()}
                className={`p-2 border-r ${
                  isSameDay(day, new Date()) ? "bg-[#EFF6FF]" : "bg-white"
                } border-[#6D7C43]`}
              >
                <div className="font-bold text-[#71717A] text-[10px] text-center">
                  {format(day, "EEE")}
                </div>
                <div className="text-[22px] font-medium text-center">
                  {format(day, "dd")}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col justify-start items-end pr-4 relative">
            {hourlyLabels.map((label) => (
              <div
                key={label}
                className="h-[60px] flex flex-col items-center justify-start text-sm font-normal text-[#71717A] relative"
              >
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex-1 grid grid-cols-7 relative">
            {hourlyLabels.map((label, index) => (
              <div
                key={label}
                className="absolute top-[calc(60px * index)] w-full border-t-2 border-[#6D7C43] z-10"
                style={{
                  top: `${index * 60}px`,
                  width: "100%",
                }}
              ></div>
            ))}

            {daysOfWeek.map((day) => {
              const dayKey = format(day, "eeee").toLowerCase();
              const isPastDay = isBefore(day, new Date());

              return (
                <div
                  key={day.toString()}
                  className="border-r-2 border-[#6D7C43] relative"
                >
                  {isSameDay(day, currentTime) && (
                    <div
                      className="absolute left-0 w-full border-red-500 h-[100px]"
                      style={{
                        borderTopWidth: "2px",
                        top: getCurrentTimePosition(),
                      }}
                    />
                  )}

                  {timeSlots.map((slotsForHour, hourIndex) => {
                    const hour = hourIndex + 7;

                    return (
                      <div key={hour} className="relative">
                        {slotsForHour.map((slot) => {
                          const [slotHour, slotMinute] = slot.split(":");
                          const slotStart = new Date(day);
                          slotStart.setHours(
                            Number(slotHour),
                            Number(slotMinute),
                            0,
                            0
                          );

                          const isBlocked = isSlotBlocked(
                            day,
                            slot,
                            blockedSlots
                          );

                          const isOutside = isOutsideBusinessHours(
                            dayKey,
                            slotStart
                          );

                          const isPastSlot =
                            isPastDay ||
                            (isSameDay(day, currentTime) &&
                              isBefore(slotStart, currentTime));

                          return (
                            <TooltipProvider key={`${day}-${slot}`}>
                              <Tooltip>
                                <TooltipTrigger
                                  asChild
                                  disabled={
                                    isBlocked || isOutside || isPastSlot
                                  }
                                >
                                  <div
                                    className={`h-[20px] ${
                                      isBlocked ? "cursor-not-allowed" : ""
                                    } ${
                                      isOutside || isPastSlot
                                        ? "bg-[#E0E0E0] cursor-not-allowed"
                                        : ""
                                    } relative flex items-center justify-center`}
                                  >
                                    {isBlocked ? (
                                      blockedSlots.map((blockedSlot) => {
                                        if (
                                          slotStart >= blockedSlot.start &&
                                          slotStart < blockedSlot.end
                                        ) {
                                          return (
                                            <div
                                              key={`${day}-${slot}`}
                                              className="absolute inset-0 bg-[#FF2626] flex items-center justify-center text-[#FFFFFF] font-bold"
                                              style={{
                                                height: "100%", // Ensure it covers only the 20-minute block
                                                top: "0", // Start from the top of the current slot
                                              }}
                                            >
                                              Booked
                                            </div>
                                          );
                                        }
                                        return null;
                                      })
                                    ) : isOutside || isPastSlot ? (
                                      <TooltipContent
                                        side="top"
                                        className="bg-[#FF2626] text-white"
                                      >
                                        Unavailable
                                      </TooltipContent>
                                    ) : (
                                      <Popover
                                        open={
                                          openPopoverSlot === `${day}-${slot}`
                                        }
                                        onOpenChange={(open) =>
                                          open
                                            ? setOpenPopoverSlot(
                                                `${day}-${slot}`
                                              )
                                            : setOpenPopoverSlot(null)
                                        }
                                      >
                                        <PopoverTrigger asChild>
                                          <div className="absolute inset-0 cursor-pointer flex items-center justify-center text-[14px] hover:bg-gray-200 group">
                                            <div className="opacity-0 group-hover:opacity-100">
                                              <Plus size={30} color="#6D7C43" />
                                            </div>
                                          </div>
                                        </PopoverTrigger>
                                        <PopoverContent
                                          className="z-50 pointer-events-auto overflow-y-auto"
                                          onClick={(e) => e.stopPropagation()}
                                          onMouseDown={(e) =>
                                            e.stopPropagation()
                                          }
                                        >
                                          <AvailableTime
                                            day={day}
                                            timeSlot={slot}
                                            onContinue={(data) =>
                                              onContinue(data)
                                            }
                                          />
                                        </PopoverContent>
                                      </Popover>
                                    )}
                                  </div>
                                </TooltipTrigger>
                              </Tooltip>
                            </TooltipProvider>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingScheduleSheet;

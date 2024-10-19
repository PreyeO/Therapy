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
import { isSlotBlocked, mapBusinessHours, getSlotStyle } from "@/lib/utils";

type SimpleScheduleSheetProps = {
  weekStartDate: Date;
  blockedSlots: Array<{ start: Date; end: Date }>;
  onContinue: (data: BookingData) => void;
  businessPeriods?: BusinessPeriod[];
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
              const businessDayHours = businessHours[dayKey];

              const isPastDay = isBefore(day, new Date());

              return (
                <div
                  key={day.toString()}
                  className="border-r-2 border-[#6D7C43] relative"
                >
                  {isSameDay(day, currentTime) && (
                    <div
                      className="absolute left-0 w-full border-red-500"
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
                          const [hour, minute] = slot.split(":");
                          const slotStart = new Date(day);
                          slotStart.setHours(
                            Number(hour),
                            Number(minute),
                            0,
                            0
                          );

                          const isBlocked = isSlotBlocked(
                            day,
                            slot,
                            blockedSlots
                          );

                          const isOutsideBusinessHours =
                            !businessDayHours ||
                            Number(hour) < businessDayHours.openingHour ||
                            (Number(hour) >= businessDayHours.closingHour &&
                              minute === "00");

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
                                    isBlocked ||
                                    isOutsideBusinessHours ||
                                    isPastSlot
                                  }
                                >
                                  <div
                                    className={`h-[20px] ${
                                      isBlocked ? "cursor-not-allowed" : ""
                                    } ${
                                      isOutsideBusinessHours || isPastSlot
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
                                          const slotStyle = getSlotStyle(
                                            blockedSlot.start,
                                            blockedSlot.end
                                          );
                                          return (
                                            <div
                                              key={`${day}-${slot}`}
                                              className="absolute left-0 w-full rounded flex items-center justify-center text-[#FFFFFF] font-bold"
                                              style={{
                                                backgroundColor: "#FF2626",
                                                height: `${slotStyle.height}`,
                                                top: `${slotStyle.top}`,
                                              }}
                                            >
                                              Booked
                                            </div>
                                          );
                                        }
                                        return null;
                                      })
                                    ) : isOutsideBusinessHours || isPastSlot ? (
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

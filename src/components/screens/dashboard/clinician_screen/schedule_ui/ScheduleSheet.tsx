// ScheduleSheet.tsx
import * as React from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  isWeekend,
  getHours,
  getMinutes,
} from "date-fns";
import { getEventsForDayAndTime, getStylesForTimeSlot } from "@/lib/utils";
import { Event } from "@/types/formSchema";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import ScheduleInfo from "@/components/screens/dashboard/clinician_screen/schedule_ui/components/ScheduleInfo";
import UnavailableInfo from "@/components/screens/dashboard/clinician_screen/schedule_ui/components/UnavailableInfo";

type UnavailableSlot = {
  start: Date;
  end: Date;
  reason: string;
};

type ScheduleSheetProps = {
  events: Event[];
  unavailableSlots: UnavailableSlot[];
  weekStartDate: Date;
  renderAvailableTime?: (day: Date, timeSlot: string) => React.ReactNode;
};

const ScheduleSheet: React.FC<ScheduleSheetProps> = ({
  events,
  unavailableSlots,
  weekStartDate,
  renderAvailableTime,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false); // Track popover state
  const daysOfWeek = Array.from({ length: 7 }).map((_, index) =>
    addDays(startOfWeek(weekStartDate, { weekStartsOn: 0 }), index)
  );

  const timeSlots = Array.from({ length: 11 }).map(
    (_, index) => `${7 + index}:00`
  );

  const getUnavailableSlotForDayAndTime = (
    unavailableSlots: UnavailableSlot[],
    day: Date,
    hour: number
  ) => {
    return unavailableSlots.filter((slot) => {
      const start = new Date(slot.start);
      return isSameDay(start, day) && getHours(start) === hour;
    });
  };

  const handlePopoverOpenChange = (isOpen: boolean) => {
    setIsPopoverOpen(isOpen); // Set the state when the popover is open
  };

  return (
    <div className="relative w-full h-full overflow-x-auto">
      {isPopoverOpen && (
        // Overlay to block interactions when the popover is open
        <div className="absolute inset-0 z-10 bg-transparent pointer-events-auto"></div>
      )}
      <div className="min-w-[1000px]">
        <div className="grid grid-cols-8 border-b">
          <div className="col-span-1 p-2 border-r text-center text-[#71717A] text-sm flex flex-col items-center justify-center">
            EST GMT-5
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
                className="h-[60px] border-b flex items-center justify-center bg-[#EFF6FF] text-sm font-normal"
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
              {timeSlots.map((slot) => {
                const hour = parseInt(slot.split(":")[0], 10);
                const eventsForHour = getEventsForDayAndTime(events, day, hour);
                const unavailableForHour = getUnavailableSlotForDayAndTime(
                  unavailableSlots,
                  day,
                  hour
                );

                return (
                  <div key={slot} className="h-[60px] border-b relative">
                    {unavailableForHour.length > 0 ? (
                      unavailableForHour.map((slot) => {
                        const startMinutes = getMinutes(new Date(slot.start));
                        const slotDurationInMinutes =
                          (new Date(slot.end).getTime() -
                            new Date(slot.start).getTime()) /
                          1000 /
                          60;

                        const cellsToFill = Math.ceil(
                          slotDurationInMinutes / 20
                        );

                        const topOffset = (startMinutes % 60) / 60;

                        return (
                          <Popover
                            key={slot.reason}
                            onOpenChange={handlePopoverOpenChange} // Track popover state change
                          >
                            <PopoverTrigger asChild>
                              <div
                                className="absolute inset-0 bg-gray-400 rounded flex items-center justify-center cursor-pointer"
                                style={{
                                  height: `${cellsToFill * 33.33}%`,
                                  top: `${topOffset * 100}%`,
                                }}
                              >
                                <p className="text-white">{slot.reason}</p>
                              </div>
                            </PopoverTrigger>

                            <PopoverContent
                              onClick={(e) => e.stopPropagation()} // Stop click propagation
                            >
                              <UnavailableInfo
                                reason={slot.reason}
                                start={new Date(slot.start)}
                                end={new Date(slot.end)}
                              />
                            </PopoverContent>
                          </Popover>
                        );
                      })
                    ) : eventsForHour.length > 0 ? (
                      eventsForHour.map((event) => {
                        const { bgColor, textColor } = getStylesForTimeSlot();

                        const eventDurationInMinutes =
                          (new Date(event.end).getTime() -
                            new Date(event.start).getTime()) /
                          1000 /
                          60;

                        const cellsToFill = Math.ceil(
                          eventDurationInMinutes / 20
                        );

                        return (
                          <Popover
                            key={event.title}
                            onOpenChange={handlePopoverOpenChange} // Track popover state change
                          >
                            <PopoverTrigger asChild>
                              <div
                                className="absolute inset-0 rounded cursor-pointer"
                                style={{
                                  backgroundColor: bgColor,
                                  borderLeft: `4px solid ${textColor}`,
                                  color: textColor,
                                  height: `${cellsToFill * 33.33}%`,
                                  top: `${
                                    (new Date(event.start).getMinutes() / 60) *
                                    100
                                  }%`,
                                }}
                              >
                                <p className="text-[14px]">
                                  {event.service.name}
                                </p>
                              </div>
                            </PopoverTrigger>
                            <PopoverContent
                              onClick={(e) => e.stopPropagation()} // Stop click propagation
                            >
                              <ScheduleInfo
                                title={event.service.name}
                                first_name={event.client}
                                last_name={event.client}
                                serviceDuration={event.serviceDuration}
                                start={new Date(event.start)}
                                end={new Date(event.end)}
                              />
                            </PopoverContent>
                          </Popover>
                        );
                      })
                    ) : renderAvailableTime ? (
                      renderAvailableTime(day, slot)
                    ) : (
                      <div className="h-full bg-transparent"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSheet;

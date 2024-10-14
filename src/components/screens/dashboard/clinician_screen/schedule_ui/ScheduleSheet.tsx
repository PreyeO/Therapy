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

  // Generate the days of the week starting from the given weekStartDate
  const daysOfWeek = Array.from({ length: 7 }).map((_, index) =>
    addDays(startOfWeek(weekStartDate, { weekStartsOn: 0 }), index)
  );

  // Define time slots in hourly intervals from 7:00 to 17:00
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
        {/* Header Row for Days of the Week */}
        <div className="flex">
          {/* Placeholder space for time labels */}
          <div className="w-[50px]"></div>
          {/* Days of the Week Header */}
          <div className="flex-1 grid grid-cols-7 border-b">
            {daysOfWeek.map((day) => (
              <div
                key={day.toString()}
                className={`p-2 border-r ${
                  isWeekend(day)
                    ? "bg-white"
                    : isSameDay(day, new Date())
                    ? "bg-[#EFF6FF]"
                    : "bg-white"
                }`}
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

        {/* Schedule Grid Rows */}
        <div className="flex">
          {/* Time Slot Labels - Positioned on Each Horizontal Line */}
          <div className="flex flex-col justify-start items-end pr-4 relative">
            {timeSlots.map((slot) => (
              <div
                key={slot}
                className="h-[60px] flex items-center justify-center text-sm font-normal text-[#71717A] relative"
              >
                {/* Time Labels aligned along the grid line */}
                <span className="text-sm">{slot}</span>
              </div>
            ))}
          </div>

          {/* Day Columns with Time Slots */}
          <div className="flex-1 grid grid-cols-7 border-t">
            {daysOfWeek.map((day) => (
              <div
                key={day.toString()}
                className={`border-r ${
                  isWeekend(day)
                    ? "bg-white"
                    : isSameDay(day, new Date())
                    ? "bg-[#EFF6FF]"
                    : "bg-white"
                }`}
              >
                {timeSlots.map((slot) => {
                  const hour = parseInt(slot.split(":")[0], 10);
                  const eventsForHour = getEventsForDayAndTime(
                    events,
                    day,
                    hour
                  );
                  const unavailableForHour = getUnavailableSlotForDayAndTime(
                    unavailableSlots,
                    day,
                    hour
                  );

                  return (
                    <div key={slot} className="h-[60px] border-b relative">
                      {unavailableForHour.length > 0 ? (
                        unavailableForHour.map((slot) => {
                          const start = new Date(slot.start);
                          const startMinutes = getMinutes(start); // Get start minutes within the hour
                          const slotDurationInMinutes =
                            (new Date(slot.end).getTime() - start.getTime()) /
                            1000 /
                            60;

                          // Calculate top offset and height percentage based on the time slot duration and position
                          const topOffsetPercentage = (startMinutes / 60) * 100;
                          const slotHeightPercentage =
                            (slotDurationInMinutes / 60) * 100;

                          const { bgColor, textColor } =
                            getStylesForTimeSlot("Unavailable");

                          return (
                            <Popover
                              key={slot.reason}
                              onOpenChange={handlePopoverOpenChange} // Track popover state change
                            >
                              <PopoverTrigger asChild>
                                <div
                                  className="absolute inset-0 rounded flex items-center justify-center cursor-pointer"
                                  style={{
                                    backgroundColor: bgColor,
                                    borderLeft: `4px solid ${textColor}`,
                                    color: textColor,
                                    height: `${slotHeightPercentage}%`, // Correct height based on duration
                                    top: `${topOffsetPercentage}%`, // Correct top offset based on start time
                                  }}
                                >
                                  <p>{slot.reason}</p>
                                </div>
                              </PopoverTrigger>

                              <PopoverContent
                                onClick={(e) => e.stopPropagation()}
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
                          const { bgColor, textColor } = getStylesForTimeSlot(
                            event.service.name
                          );

                          const eventStart = new Date(event.start);
                          const eventDurationInMinutes =
                            (new Date(event.end).getTime() -
                              eventStart.getTime()) /
                            1000 /
                            60;

                          // Calculate height and top offset for events
                          const eventHeightPercentage =
                            (eventDurationInMinutes / 60) * 100;
                          const eventTopOffsetPercentage =
                            (getMinutes(eventStart) / 60) * 100;

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
                                    height: `${eventHeightPercentage}%`, // Correct height based on duration
                                    top: `${eventTopOffsetPercentage}%`, // Correct top offset based on start time
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
                                  start={eventStart}
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
    </div>
  );
};

export default ScheduleSheet;

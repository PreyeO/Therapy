// ScheduleSheet.tsx
import * as React from "react";
import { format, startOfWeek, addDays, isSameDay, isWeekend } from "date-fns";
import { getEventsForDayAndTime, getStylesForTimeSlot } from "@/lib/utils";
import { Event } from "@/types/index";

type ScheduleSheetProps = {
  events: Event[];
  weekStartDate: Date;
};

const ScheduleSheet: React.FC<ScheduleSheetProps> = ({
  events,
  weekStartDate,
}) => {
  const daysOfWeek = Array.from({ length: 7 }).map((_, index) =>
    addDays(startOfWeek(weekStartDate, { weekStartsOn: 0 }), index)
  );

  const timeSlots = Array.from({ length: 11 }).map(
    (_, index) => `${7 + index}:00`
  );

  return (
    <div className="w-full h-full overflow-x-auto">
      <div className="min-w-[800px]">
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
                className="h-20 border-b flex items-center justify-center bg-[#EFF6FF] text-sm font-normal"
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
                const eventsForSlot = getEventsForDayAndTime(events, day, slot);
                const { bgColor, textColor } =
                  eventsForSlot.length > 0
                    ? getStylesForTimeSlot()
                    : { bgColor: "", textColor: "" };
                return (
                  <div
                    key={slot}
                    className={`h-20 border-b relative`}
                    style={{ backgroundColor: bgColor }}
                  >
                    {eventsForSlot.map((event) => (
                      <div
                        key={event.title}
                        className={`absolute inset-0 p-2 rounded bg-inherit`}
                        style={{
                          borderLeft: `4px solid ${textColor}`,
                          color: textColor,
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
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

import * as React from "react";
import { addDays, format } from "date-fns";
import { ArrowLeftRight, CalendarDays } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DateNavigator from "@/components/common/DateNavigator";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const today = new Date();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 20),
  });

  const [currentDate, setCurrentDate] = React.useState<Date>(today);

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <div
              id="date"
              className={cn(
                "max-w-[231px]  font-normal items-center cursor-pointer",
                !date && "text-muted-foreground"
              )}
            >
              {date?.from ? (
                date.to ? (
                  <div className="flex justify-center items-center">
                    <span className="flex-col">
                      <p className="text-[5.6px] text-[#6D7C43] ">
                        {" "}
                        start with
                      </p>
                      <span className="flex md:text-[12.61px] gap-1 text-[7.46px] items-center">
                        {format(date.from, "MM.dd.y")}{" "}
                        <CalendarDays color="#6D7C43" size={15} />
                        <ArrowLeftRight
                          color="#6D7C43"
                          size={15}
                          className="mr-1"
                        />
                      </span>
                    </span>

                    <span className="flex-col">
                      <p className="text-[5.6px] text-[#6D7C43]"> end with</p>
                      <span className="flex md:text-[12.61px] text-[7.46px] gap-1 items-center">
                        {format(date.to, "MM.dd.y")}
                        <CalendarDays color="#6D7C43" size={15} />
                      </span>
                    </span>
                  </div>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 mt-4" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              className=" "
            />
          </PopoverContent>
        </Popover>
        <DateNavigator
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </div>
    </div>
  );
}

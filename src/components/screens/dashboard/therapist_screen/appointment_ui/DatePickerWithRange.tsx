"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { ArrowLeftRight, CalendarDays } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const today = new Date();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 20),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "max-w-[231px]  font-normal items-center",
              !date && "text-muted-foreground"
            )}
          >
            {date?.from ? (
              date.to ? (
                <div className="flex justify-center items-center">
                  <span className="flex-col">
                    <p className="text-[5.6px] text-[#6D7C43] "> start with</p>
                    <span className="flex lg:text-[12.61px] gap-1 text-[7.46px] ">
                      {format(date.from, "LLL dd, y")}{" "}
                      <CalendarDays
                        className="h-4 w-4"
                        color="#6D7C43"
                        size={18}
                      />
                      <ArrowLeftRight
                        color="#6D7C43"
                        size={18}
                        className="mr-1"
                      />
                    </span>
                  </span>

                  <span className="flex-col">
                    <p className="text-[5.6px] text-[#6D7C43]"> end with</p>
                    <span className="flex lg:text-[12.61px] text-[7.46px] gap-1">
                      {format(date.to, "LLL dd, y")}
                      <CalendarDays
                        className=" h-4 w-4"
                        color="#6D7C43"
                        size={18}
                      />
                    </span>
                  </span>
                </div>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
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
    </div>
  );
}

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
import React from "react";
import { useAppointmentSearch } from "@/hooks/useAppointmentSearch";

interface DatePickerWithRangeProps {
  activeTab: string; // Accept activeTab as a prop
}

export const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
  activeTab,
}) => {
  const { dateRange, setDateRange, handleSearch } =
    useAppointmentSearch(activeTab); // Pass activeTab
  const today = new Date();

  // Safely handle potentially null/undefined dateRange
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: dateRange?.start ? new Date(dateRange.start) : today,
    to: dateRange?.end ? new Date(dateRange.end) : addDays(today, 20),
  });

  React.useEffect(() => {
    // Only proceed if dateRange and selected dates are not null
    if (date?.from && date?.to) {
      const formattedStart = format(date.from, "yyyy-MM-dd");
      const formattedEnd = format(date.to, "yyyy-MM-dd");

      // Check if dateRange exists and has different values before updating
      if (
        (!dateRange ||
          dateRange.start !== formattedStart ||
          dateRange.end !== formattedEnd) &&
        setDateRange
      ) {
        setDateRange({ start: formattedStart, end: formattedEnd });
        handleSearch(); // Trigger the search when the range is updated
      }
    }
    // Add dateRange and setDateRange to dependencies to avoid infinite loops
  }, [date, dateRange, setDateRange, handleSearch]);

  return (
    <div className={cn("grid gap-2")}>
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <div id="date" className="cursor-pointer">
              {date?.from && date?.to ? (
                <div className="flex justify-center items-center">
                  <span className="flex-col">
                    <p className="text-[5.6px] text-[#6D7C43]">Start with</p>
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
                    <p className="text-[5.6px] text-[#6D7C43]">End with</p>
                    <span className="flex md:text-[12.61px] text-[7.46px] gap-1 items-center">
                      {format(date.to, "MM.dd.y")}
                      <CalendarDays color="#6D7C43" size={15} />
                    </span>
                  </span>
                </div>
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
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

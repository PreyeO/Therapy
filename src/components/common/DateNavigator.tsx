import * as React from "react";
import { format, startOfWeek, addDays, subDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DateNavigatorProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({
  currentDate,
  setCurrentDate,
}) => {
  // Calculate the start and end dates of the current week
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday as start of the week
  const weekEnd = addDays(weekStart, 6); // End of the week is 6 days after the start

  // Update current date to move to the next week
  const handleNextWeek = () => setCurrentDate(addDays(weekStart, 7));

  // Update current date to move to the previous week
  const handlePreviousWeek = () => setCurrentDate(subDays(weekStart, 7));

  return (
    <div className="hidden items-center md:flex">
      <ChevronLeft
        onClick={handlePreviousWeek}
        className="cursor-pointer"
        fill="#6D7C43"
        color="#6D7C43"
      />
      <Button
        className="flex items-center justify-center text-[12.61px] border-army_green w-full"
        variant={"outline"}
      >
        {format(weekStart, "MMMM dd, yyyy")} -{" "}
        {format(weekEnd, "MMMM dd, yyyy")}
      </Button>
      <ChevronRight
        onClick={handleNextWeek}
        className="cursor-pointer"
        fill="#6D7C43"
        color="#6D7C43"
      />
    </div>
  );
};

export default DateNavigator;

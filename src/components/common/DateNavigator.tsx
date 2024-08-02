import * as React from "react";
import { format, addDays, subDays } from "date-fns";
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
  const handleNextDate = () => setCurrentDate(addDays(currentDate, 1));
  const handlePreviousDate = () => setCurrentDate(subDays(currentDate, 1));

  return (
    <div className="hidden items-center md:flex">
      <ChevronLeft
        onClick={handlePreviousDate}
        className="cursor-pointer"
        fill="#6D7C43"
        color="#6D7C43"
      />
      <Button
        className="flex items-center justify-center text-[12.61px] border-army_green w-full"
        variant={"outline"}
      >
        {format(currentDate, "MMMM dd, yyyy")}
      </Button>
      <ChevronRight
        onClick={handleNextDate}
        className="cursor-pointer"
        fill="#6D7C43"
        color="#6D7C43"
      />
    </div>
  );
};

export default DateNavigator;

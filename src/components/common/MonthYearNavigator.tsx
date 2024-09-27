import * as React from "react";
import { format, addYears, subYears } from "date-fns";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // Import Popover components
import { Calendar } from "../ui/calendar";

interface MonthYearNavigatorProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthYearNavigator: React.FC<MonthYearNavigatorProps> = ({
  currentDate,
  setCurrentDate,
}) => {
  // Functions to handle year navigation
  const handleNextYear = () => setCurrentDate(addYears(currentDate, 1));
  const handlePreviousYear = () => setCurrentDate(subYears(currentDate, 1));

  return (
    <div className="flex items-center space-x-4 bg-army_green rounded-xl">
      {/* Year navigation */}

      {/* Popover with Calendar for quick date and month selection */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="bg-gray-200 px-4 py-2 rounded-lg shadow-sm">
            Search Monthly
          </button>
        </PopoverTrigger>
        <PopoverContent>
          {/* Calendar component to pick a date */}
          <Calendar
            selected={currentDate}
            onSelect={(date) => date && setCurrentDate(date)}
            mode="single"
            showOutsideDays
            className="p-3 rounded-lg"
          />
        </PopoverContent>
      </Popover>
      <div className="flex items-center space-x-1 ">
        <ChevronUp
          onClick={handlePreviousYear}
          className="cursor-pointer"
          fill="#6D7C43"
          color="#6D7C43"
        />
        <span className="font-medium">{format(currentDate, "yyyy")}</span>
        <ChevronDown
          onClick={handleNextYear}
          className="cursor-pointer"
          fill="#6D7C43"
          color="#6D7C43"
        />
      </div>
    </div>
  );
};

export default MonthYearNavigator;

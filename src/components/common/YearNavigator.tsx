import * as React from "react";
import { format } from "date-fns";
import { ChevronUp, ChevronDown } from "lucide-react";

interface YearNavigatorProps {
  currentYear: number;
  setCurrentYear: (year: number) => void;
}

const YearNavigator: React.FC<YearNavigatorProps> = ({
  currentYear,
  setCurrentYear,
}) => {
  const handleNextYear = () => setCurrentYear(currentYear + 1);
  const handlePreviousYear = () => setCurrentYear(currentYear - 1);

  return (
    <div className="flex items-center space-x-4 rounded-xl">
      <div className="flex items-center space-x-1 border border-army_green h-[40px] rounded-lg px-2">
        <ChevronUp
          onClick={handlePreviousYear}
          className="cursor-pointer"
          fill="#6D7C43"
          color="#6D7C43"
        />
        <span className="font-medium">
          {format(new Date(currentYear, 0), "yyyy")}
        </span>
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

export default YearNavigator;

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Function to generate time options in 24-hour format
const generateTimeOptions = (): string[] => {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      times.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return times;
};

interface TimeSelectProps {
  placeholder: string;
}

const TimeSelect: React.FC<TimeSelectProps> = ({ placeholder }) => {
  const timeOptions = generateTimeOptions();

  return (
    <Select>
      <SelectTrigger className="max-w-[144px] h-12 rounded-xl text-base font-normal text-[#444444B2]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        {timeOptions.map((time) => (
          <SelectItem
            key={time}
            value={time}
            className="md:text-base text-[9.19px]"
          >
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimeSelect;

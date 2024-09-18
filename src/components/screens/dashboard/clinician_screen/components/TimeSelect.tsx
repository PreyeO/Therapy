import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const generateTimeOptions = (): string[] => {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const formattedHour = hour.toString().padStart(2, "0");
    times.push(`${formattedHour}:00`);
  }
  return times;
};

interface TimeSelectProps {
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
}

const TimeSelect: React.FC<TimeSelectProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const timeOptions = generateTimeOptions();

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="max-w-[144px] h-12 rounded-xl text-base font-normal text-[#444444B2]">
        <SelectValue placeholder={placeholder}>
          {value || placeholder}{" "}
          {/* Show value if present, else show placeholder */}
        </SelectValue>
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

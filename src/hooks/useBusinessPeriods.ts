import { useState } from "react";
import { BusinessPeriod } from "@/types/formSchema";

const formatTime = (time: string) => {
  if (time.length === 5) {
    return `${time}:00`;
  }
  return time;
};

export const useBusinessPeriods = () => {
  const [businessPeriods, setBusinessPeriods] = useState<BusinessPeriod[]>([
    { day_of_week: "Monday", opening_hour: "", closing_hour: "" },
    { day_of_week: "Tuesday", opening_hour: "", closing_hour: "" },
    { day_of_week: "Wednesday", opening_hour: "", closing_hour: "" },
    { day_of_week: "Thursday", opening_hour: "", closing_hour: "" },
    { day_of_week: "Friday", opening_hour: "", closing_hour: "" },
    { day_of_week: "Saturday", opening_hour: "", closing_hour: "" },
    { day_of_week: "Sunday", opening_hour: "", closing_hour: "" },
  ]);

  const updateBusinessPeriod = (
    index: number,
    period: Partial<BusinessPeriod>
  ) => {
    setBusinessPeriods((prev) => {
      const newPeriods = [...prev];
      if (period.opening_hour) {
        period.opening_hour = formatTime(period.opening_hour);
      }
      if (period.closing_hour) {
        period.closing_hour = formatTime(period.closing_hour);
      }
      newPeriods[index] = { ...newPeriods[index], ...period };
      return newPeriods;
    });
  };

  const saveBusinessPeriods = async () => {
    console.log("Business periods saved:", businessPeriods);
  };

  return {
    businessPeriods,
    updateBusinessPeriod,
    saveBusinessPeriods,
    setBusinessPeriods,
  };
};

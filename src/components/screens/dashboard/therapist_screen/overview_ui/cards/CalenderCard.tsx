import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { Card } from "@/components/ui/card";

const CalenderCard = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Card className=" flex flex-col justify-center items-center rounded-lg">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md  text-[15px]"
        singleWeekView={true}
      />
    </Card>
  );
};

export default CalenderCard;

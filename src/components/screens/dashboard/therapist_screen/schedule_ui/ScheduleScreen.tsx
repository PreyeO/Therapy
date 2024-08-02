import * as React from "react";
import ScheduleSheet from "@/components/screens/dashboard/therapist_screen/schedule_ui/ScheduleSheet";
import { events } from "@/constants/DataManager";
import DateNavigator from "@/components/common/DateNavigator";

const ScheduleScreen = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = React.useState<Date>(today);

  return (
    <div className="mx-auto mt-10">
      <div className="flex justify-between py-3">
        <DateNavigator
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <span className="bg-army_green rounded-full w-[100px] text-center text-white text-sm font-medium flex flex-col items-center justify-center">
          Weekly
        </span>
      </div>
      <ScheduleSheet events={events} weekStartDate={new Date(2024, 6, 7)} />
    </div>
  );
};

export default ScheduleScreen;

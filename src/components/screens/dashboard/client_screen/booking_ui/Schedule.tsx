import React, { useState } from "react";
import { useAppointmentsStore } from "@/store/useAppointment";
import DateNavigator from "@/components/common/DateNavigator";
import BookingScheduleSheet from "./BookingScheduleSheet";
import { BookingData } from "@/types/formSchema"; // Import the BookingData type

// Update onContinue type to accept BookingData as a parameter
const Schedule = ({
  onContinue,
}: {
  onContinue: (data: BookingData) => void;
}) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(today);

  const { fetchAppointments, fetchUnavailableSlots } = useAppointmentsStore();

  React.useEffect(() => {
    fetchAppointments();
    fetchUnavailableSlots();
  }, [fetchAppointments, fetchUnavailableSlots, currentDate]);

  return (
    <div className="mx-auto">
      <div className="flex justify-between w-full py-2">
        <DateNavigator
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <span className="bg-army_green rounded-full w-[100px] text-center text-white text-sm font-medium flex flex-col items-center justify-center">
          Weekly
        </span>
      </div>

      {/* Render BookingScheduleSheet directly and pass onContinue correctly */}
      <BookingScheduleSheet
        weekStartDate={currentDate}
        onContinue={onContinue} // Pass the onContinue handler
      />
    </div>
  );
};

export default Schedule;

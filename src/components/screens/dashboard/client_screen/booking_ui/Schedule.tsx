import React from "react";
import ScheduleSheet from "@/components/screens/dashboard/clinician_screen/schedule_ui/ScheduleSheet";
import { useAppointmentsStore } from "@/store/useAppointment";
import DateNavigator from "@/components/common/DateNavigator";
import AvailableTime from "./AvailableTime";
import { Button } from "@/components/ui/button";

const Schedule = ({ onContinue }: { onContinue: () => void }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = React.useState<Date>(today);

  const {
    appointments,
    unavailableSlots,
    fetchAppointments,
    fetchUnavailableSlots,
  } = useAppointmentsStore();

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

      {/* Pass AvailableTime into the ScheduleSheet via renderAvailableTime prop */}
      <ScheduleSheet
        events={appointments}
        unavailableSlots={unavailableSlots}
        weekStartDate={currentDate}
        renderAvailableTime={(day, timeSlot) => (
          <AvailableTime day={day} timeSlot={timeSlot} />
        )}
      />

      {/* Continue button to go to BookingReview */}
      <div className="flex justify-end mt-4">
        <Button onClick={onContinue} className="rounded-full w-[195px]">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Schedule;

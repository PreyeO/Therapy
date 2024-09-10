import * as React from "react";
import ScheduleSheet from "@/components/screens/dashboard/therapist_screen/schedule_ui/ScheduleSheet";
import { useAppointmentsStore } from "@/store/useAppointment";
import DateNavigator from "@/components/common/DateNavigator";

const ScheduleScreen = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = React.useState<Date>(today);

  const {
    appointments,
    unavailableSlots,
    fetchAppointments,
    fetchUnavailableSlots,
  } = useAppointmentsStore();

  // Fetch appointments and unavailable slots when the component mounts
  React.useEffect(() => {
    fetchAppointments();
    fetchUnavailableSlots(); // Fetch unavailable slots
  }, [fetchAppointments, fetchUnavailableSlots]);

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
      {/* Pass the fetched appointments and unavailable slots to the ScheduleSheet */}
      <ScheduleSheet
        events={appointments}
        unavailableSlots={unavailableSlots}
        weekStartDate={currentDate}
      />
    </div>
  );
};

export default ScheduleScreen;

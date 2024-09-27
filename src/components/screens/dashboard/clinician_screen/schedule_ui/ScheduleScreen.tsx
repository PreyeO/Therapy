import * as React from "react";
import ScheduleSheet from "@/components/screens/dashboard/clinician_screen/schedule_ui/ScheduleSheet";
import { useAppointmentsStore } from "@/store/useAppointment";
import DateNavigator from "@/components/common/DateNavigator";
import MonthYearNavigator from "@/components/common/MonthYearNavigator";

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
  }, [fetchAppointments, fetchUnavailableSlots, currentDate]);

  return (
    <div className="mx-auto mt-10">
      <div className="flex justify-between py-3">
        <DateNavigator
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <MonthYearNavigator
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
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

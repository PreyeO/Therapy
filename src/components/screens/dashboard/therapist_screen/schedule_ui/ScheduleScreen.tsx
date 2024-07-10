import ScheduleSheet from "@/components/screens/dashboard/therapist_screen/schedule_ui/ScheduleSheet";
import { events } from "@/constants/DataManager";

const ScheduleScreen = () => {
  return (
    <div className=" mx-auto mt-10">
      <ScheduleSheet events={events} weekStartDate={new Date(2024, 6, 7)} />
    </div>
  );
};

export default ScheduleScreen;

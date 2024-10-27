import { useState, useEffect } from "react";
import { useAppointmentsStore } from "@/store/useAppointment";
import DateNavigator from "@/components/common/DateNavigator";
import BookingScheduleSheet from "./BookingScheduleSheet";
import { BookingData, BusinessPeriod, Clinician } from "@/types/formSchema";
import { getClinicianCalendar } from "@/services/api/clients/appointments";
import { format, addDays } from "date-fns";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader"; // Import the loader

// Define CalendarSlot type
type CalendarSlot = {
  start_time: string;
  end_time: string;
};

interface ScheduleProps {
  onContinue: (data: BookingData) => void;
  businessPeriods: BusinessPeriod[];
  loading: boolean; // Include the loading prop
}

// Define a type guard to ensure the selectedClinician has a valid clinician_profile
const hasClinicianProfile = (
  clinician: Clinician | null | undefined
): clinician is Clinician & { clinician_profile: { id: string } } => {
  return (
    clinician !== null &&
    clinician !== undefined &&
    clinician.clinician_profile !== null &&
    clinician.clinician_profile.id !== undefined
  );
};

const Schedule: React.FC<ScheduleProps> = ({
  onContinue,
  businessPeriods,
  loading,
}) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [blockedSlots, setBlockedSlots] = useState<
    Array<{ start: Date; end: Date }>
  >([]);
  const { selectedClinician } = useAppointmentsStore(); // Access clinician

  useEffect(() => {
    if (hasClinicianProfile(selectedClinician)) {
      const fetchClinicianAvailability = async () => {
        try {
          const startOfWeekDate = format(currentDate, "yyyy-MM-dd");
          const endOfWeekDate = format(addDays(currentDate, 6), "yyyy-MM-dd");

          // Fetch the clinician's calendar data
          const calendarData: CalendarSlot[] = await getClinicianCalendar(
            selectedClinician.clinician_profile.id,
            startOfWeekDate,
            endOfWeekDate
          );

          const parsedBlockedSlots = calendarData.map((slot) => ({
            start: new Date(slot.start_time),
            end: new Date(slot.end_time),
          }));

          setBlockedSlots(parsedBlockedSlots); // Update blocked slots
        } catch (error) {
          console.error("Failed to fetch clinician calendar:", error);
        }
      };

      fetchClinicianAvailability();
    }
  }, [currentDate, selectedClinician]);

  if (!hasClinicianProfile(selectedClinician)) {
    return <p>Loading clinician profile...</p>; // Render loading message if clinician profile is not available
  }

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

      <div className="relative" style={{ minHeight: "600px" }}>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-200 z-50">
            <SmallLoader />{" "}
            {/* Show loader while business periods are loading */}
          </div>
        ) : (
          <BookingScheduleSheet
            weekStartDate={currentDate}
            blockedSlots={blockedSlots}
            businessPeriods={businessPeriods}
            onContinue={onContinue}
          />
        )}
      </div>
    </div>
  );
};

export default Schedule;

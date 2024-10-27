import React from "react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import SetupHeader from "@/components/screens/dashboard/clinician_screen/accountsetup_ui/SetupHeader";
import { formatTime } from "@/lib/utils";

// Define AppointmentAddress type
interface AppointmentAddress {
  id: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
}

interface ReviewStepProps {
  appointmentAddresses: AppointmentAddress[];
}

const ReviewStep: React.FC<ReviewStepProps> = ({ appointmentAddresses }) => {
  const { businessPeriods } = useBusinessPeriodsStore();

  // Helper function to get location details based on IDs
  const getLocationDetails = (locationIds: string[]): string => {
    return locationIds
      .map((id) => {
        const location = appointmentAddresses.find(
          (addr) => addr.id === id // Ensure the comparison uses the same type
        );
        return location
          ? `${location.street_address}, ${location.city}, ${location.state} ${location.postal_code}`
          : "Unknown Location";
      })
      .join(", ");
  };

  // Filter out periods that have no opening or closing hours set
  const filteredPeriods = businessPeriods.filter(
    (period) => period.opening_hour && period.closing_hour
  );

  // Create a map to store unique periods by day_of_week
  const uniquePeriodsMap = new Map<string, (typeof filteredPeriods)[0]>();

  filteredPeriods.forEach((period) => {
    if (!uniquePeriodsMap.has(period.day_of_week)) {
      uniquePeriodsMap.set(period.day_of_week, period);
    }
  });

  // Convert the map values back to an array
  const uniquePeriods = Array.from(uniquePeriodsMap.values());

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center py-6 mt-6">
        <SetupHeader
          title="Review your practice details"
          subtitle="You can always update this information later."
        />
      </div>
      <div className="border flex flex-col gap-5 mb-7 py-7 w-[90%] justify-center rounded-md mx-auto">
        <h3 className="text-[#041827] font-bold text-xl px-10">
          Your Availability
        </h3>
        <div className="flex flex-col gap-10">
          {/* Table Headers */}
          <div className="flex text-[#444444B2] text-lg font-bold pt-6">
            <h3 className="text-center w-1/4">Day</h3>
            <h3 className="text-center w-1/3">Time</h3>
            <h3 className="text-center w-1/3">Location</h3>
          </div>
          {/* Display business periods */}
          {uniquePeriods.length === 0 ? (
            <p className="text-center">No availability set</p>
          ) : (
            uniquePeriods.map((period, index) => (
              <div
                className="flex justify-around items-center border-b pb-4 mb-4"
                key={index}
              >
                {/* Display day of the week */}
                <p className="text-lg font-normal">{period.day_of_week}:</p>
                {/* Display time range */}
                <div className="text-base text-[#041827]">
                  {formatTime(period.opening_hour)} -{" "}
                  {formatTime(period.closing_hour)}
                </div>
                {/* Display location(s) */}
                {period.appointment_location_ids &&
                  period.appointment_location_ids.length > 0 && (
                    <div className="font-normal text-base text-[#041827] w-[241px] flex flex-col justify-center items-center">
                      <p>
                        {getLocationDetails(period.appointment_location_ids)}
                      </p>
                    </div>
                  )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;

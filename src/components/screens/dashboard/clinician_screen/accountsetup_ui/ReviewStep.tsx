import React from "react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import SetupHeader from "@/components/screens/dashboard/clinician_screen/accountsetup_ui/SetupHeader";

interface AppointmentAddress {
  id: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
}

const formatTime = (time: string) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const formattedHours = parseInt(hours, 10) % 12 || 12;
  const period = parseInt(hours, 10) < 12 ? "AM" : "PM";
  return `${formattedHours}:${minutes} ${period}`;
};

const ReviewStep: React.FC<{ appointmentAddresses: AppointmentAddress[] }> = ({
  appointmentAddresses,
}) => {
  const { businessPeriods } = useBusinessPeriodsStore();

  const getLocationDetails = (locationIds: string[]) => {
    return locationIds
      .map((id) => {
        const location = appointmentAddresses.find((addr) => addr.id === id);
        if (location) {
          return `${location.street_address}, ${location.city}, ${location.state} ${location.postal_code}`;
        }
        return "Unknown Location";
      })
      .filter(Boolean)
      .join(", ");
  };

  const filteredPeriods = businessPeriods.filter(
    (period) => period.opening_hour && period.closing_hour
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center py-6 mt-6">
        <SetupHeader
          title="Review your practice details"
          subtitle="You can always update this information later."
        />
      </div>
      <div className="border flex flex-col gap-5 mb-7 py-7 w-[90%] justify-center rounded-md mx-auto">
        <h3 className=" text-[#041827] font-bold text-xl px-10 ">
          Your Availability
        </h3>
        <div className="flex flex-col gap-10">
          <div className="flex text-[#444444B2] text-lg font-bold pt-6">
            <h3 className="text-center w-1/4">Day</h3>
            <h3 className="text-center w-1/3">Time</h3>
            <h3 className="text-center w-1/3">Location</h3>
          </div>
          {filteredPeriods.length === 0 ? (
            <p>No availability set</p>
          ) : (
            filteredPeriods.map((period, index) => (
              <div className="flex justify-around" key={index}>
                <p className=" text-lg font-normal">{period.day_of_week}:</p>
                <div className="flex gap-2">
                  <p className="text-[#041827] text-base font-normal">
                    {formatTime(period.opening_hour)} -{" "}
                    {formatTime(period.closing_hour)}
                  </p>
                </div>
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

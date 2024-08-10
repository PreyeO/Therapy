import React from "react";
import SetupHeader from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/SetupHeader";
import { FormState, BusinessPeriod } from "@/types";
import { getUserData } from "@/services/api/auth";

interface ReviewStepProps {
  businessPeriods: BusinessPeriod[];
  formState: FormState;
}

const formatTime = (time: string) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const formattedHours = parseInt(hours, 10) % 12 || 12;
  const period = parseInt(hours, 10) < 12 ? "AM" : "PM";
  return `${formattedHours}:${minutes} ${period}`;
};

const ReviewStep: React.FC<ReviewStepProps> = ({
  businessPeriods,
  formState,
}) => {
  console.log("ReviewStep received business periods:", businessPeriods);
  console.log("ReviewStep received form state:", formState);

  const userData = getUserData();
  const firstName = userData?.user?.first_name || "";

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
      <div className="border flex flex-col gap-5 py-7 rounded-xl px-6">
        <div className="flex md:justify-between gap-10 md:text-lg text-[14.51px] font-normal">
          <h4 className="text-[#041827B2]">Practice Name:</h4>
          <p>{formState.practice_name || firstName}</p>
        </div>

        <div className="flex md:justify-between gap-10 md:text-lg text-[14.51px] font-normal leading-[17.99px]">
          <h4 className="text-[#041827B2]">Business Address:</h4>
          <p>
            {formState.business_address?.street_address},
            {formState.business_address?.city},
            {formState.business_address?.state},
            {formState.business_address?.postal_code}
          </p>
        </div>

        <div className="flex md:justify-between gap-10 md:text-lg text-[14.51px] font-normal leading-[17.99px] items-center">
          <h4 className="text-[#041827B2]">Appointment Addresses:</h4>
          <p className="flex flex-col gap-[22px]">
            {formState.appointment_addresses.map((address, index) => (
              <span key={index}>
                {address.street_address}, {address.city}, {address.state},{" "}
                {address.postal_code}
              </span>
            ))}
          </p>
        </div>

        <div className="flex md:justify-between gap-10 md:text-lg text-[14.51px] font-normal">
          <h4 className="text-[#041827B2]">Rate per Session:</h4>
          <p>{formState.rate_per_session}</p>
        </div>

        <div className="flex md:justify-between gap-10 md:text-lg text-[14.51px] font-normal">
          <h4 className="text-[#041827B2]">Duration per Session:</h4>
          <p>
            {formState.duration_per_session} {formState.duration_unit}
          </p>
        </div>

        <div className="">
          <div className="flex md:justify-between gap-10 flex-wrap md:text-lg text-[14.51px] font-normal items-center">
            <h4 className="text-[#041827B2]">Availability:</h4>
            <div className="flex flex-col gap-2">
              {filteredPeriods.length === 0 ? (
                <p>No availability set</p>
              ) : (
                filteredPeriods.map((period, index) => (
                  <div className="flex gap-2" key={index}>
                    <p>{period.day_of_week}</p>
                    <p>{formatTime(period.opening_hour)}</p>
                    <p>-</p>
                    <p>{formatTime(period.closing_hour)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;

import React, { useEffect } from "react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SetupHeader from "@/components/screens/dashboard/clinician_screen/accountsetup_ui/SetupHeader";
import TimeSelect from "../components/TimeSelect";
import { getAddressTextById } from "@/lib/utils";
import { AppointmentAddress } from "@/types/formSchema";

// Define props interface for BusinessPeriodStep
interface BusinessPeriodStepProps {
  onSave: () => void;
  appointmentAddresses: AppointmentAddress[];
}

const BusinessPeriodStep: React.FC<BusinessPeriodStepProps> = ({
  onSave,
  appointmentAddresses,
}) => {
  const { businessPeriods, updateBusinessPeriod, fetchAppointmentAddresses } =
    useBusinessPeriodsStore();

  // Ensure business periods and appointment addresses are populated
  useEffect(() => {
    fetchAppointmentAddresses();
  }, [fetchAppointmentAddresses]);

  // Debugging logs to verify data
  console.log("BusinessPeriodStep rendered with props:", {
    businessPeriods,
    appointmentAddresses,
  });

  return (
    <div className="relative flex flex-col gap-10 scale-90">
      <div className="text-center py-6 mt-6">
        <SetupHeader
          title="Let clients know your business hour"
          subtitle="Control your schedule by deciding which day and time you’re available for an appointment request."
        />
      </div>
      <form id="step-4-form" onSubmit={onSave} className="flex flex-col gap-5">
        {Array.from(new Set(businessPeriods.map((item) => item.day_of_week)))
          .map((uniqueDay) =>
            businessPeriods.find((item) => item.day_of_week === uniqueDay)
          )
          .map((item, index) => (
            <div
              className="flex md:gap-10 gap-5 items-center justify-center"
              key={`business-period-${index}`} // Fixed key syntax
            >
              <h3 className="w-1/4 text-center md:text-base text-[9.19px] font-bold">
                {item?.day_of_week}
              </h3>
              <TimeSelect
                placeholder="08:00"
                value={item?.opening_hour || ""}
                onChange={(value) =>
                  updateBusinessPeriod(index, { opening_hour: value })
                }
              />
              <TimeSelect
                placeholder="18:00"
                value={item?.closing_hour || ""}
                onChange={(value) =>
                  updateBusinessPeriod(index, { closing_hour: value })
                }
              />
              <Select
                onValueChange={(value) =>
                  updateBusinessPeriod(index, {
                    appointment_location_ids: [value],
                  })
                }
                value={item?.appointment_location_ids?.[0] || ""}
              >
                <SelectTrigger className="h-14 w-[260.56px] rounded-md">
                  <SelectValue placeholder="Location">
                    {getAddressTextById(
                      item?.appointment_location_ids?.[0],
                      appointmentAddresses
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {appointmentAddresses.map((address, addressIndex) => (
                    <SelectItem
                      key={`address-${address.id || addressIndex}`} // Fixed key syntax
                      value={address.id}
                    >
                      {`${address.street_address}, ${address.city}, ${address.state} ${address.postal_code}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
      </form>
    </div>
  );
};

export default BusinessPeriodStep;

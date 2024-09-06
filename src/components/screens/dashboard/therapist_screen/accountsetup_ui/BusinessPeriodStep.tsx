// src/components/screens/dashboard/therapist_screen/accountsetup_ui/BusinessPeriodStep.tsx
import React from "react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import TimeSelect from "../components/TimeSelect";
import SetupHeader from "./SetupHeader";

interface AppointmentAddress {
  id: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
}

const BusinessPeriodStep: React.FC<{
  onSave: () => void;
  appointmentAddresses: AppointmentAddress[];
}> = ({ onSave, appointmentAddresses }) => {
  const { businessPeriods, updateBusinessPeriod } = useBusinessPeriodsStore();

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(); // Call the parent onSave function to handle navigation
  };

  return (
    <div className="relative flex flex-col gap-10 scale-90">
      <div className="text-center py-6 mt-6">
        <SetupHeader
          title="Let clients know your business hour"
          subtitle="Control your schedule by deciding which day and time you’re available for an appointment request."
        />
      </div>
      <form
        id="step-4-form"
        onSubmit={handleSave}
        className="flex flex-col gap-5"
      >
        <div className="flex items-center justify-center md:gap-20 md:text-base text-[9.19px] font-normal text-[#444444B2]">
          <h3 className="w-1/4 text-center"></h3>
          <h3 className="w-1/4 text-center">Open hour</h3>
          <h3 className="w-1/4 text-center">Close hour</h3>
          <h3 className="w-1/4 text-center">Location</h3>
          <h3 className="w-1/4 text-center">Action</h3>
        </div>
        {businessPeriods.map((item, index) => (
          <div
            className="flex md:gap-10 gap-5 items-center justify-center"
            key={index}
          >
            <h3 className="w-1/4 text-center md:text-base text-[9.19px] font-bold">
              {item.day_of_week}
            </h3>
            <div className="w-1/4">
              <TimeSelect
                placeholder="08:00"
                value={item.opening_hour}
                onChange={(value) =>
                  updateBusinessPeriod(index, { opening_hour: value })
                }
              />
            </div>
            <div className="w-1/4">
              <TimeSelect
                placeholder="18:00"
                value={item.closing_hour}
                onChange={(value) =>
                  updateBusinessPeriod(index, { closing_hour: value })
                }
              />
            </div>
            <Select
              onValueChange={(value) =>
                updateBusinessPeriod(index, {
                  appointment_location_ids: [value],
                })
              }
            >
              <SelectTrigger className="h-14 text-placeholder_text text-[11.28px] font-normal w-[260.56px] rounded-md">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {appointmentAddresses.map((address) => (
                  <SelectItem key={address.id} value={address.id.toString()}>
                    {`${address.street_address}, ${address.city}, ${address.state} ${address.postal_code}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="w-1/4 flex justify-center">
              <div className="border md:w-[103px] w-[59.17px] h-[56px] flex items-center justify-center rounded-xl">
                <Switch
                  checked={!!item.opening_hour && !!item.closing_hour}
                  onChange={(checked) =>
                    updateBusinessPeriod(index, {
                      opening_hour: checked ? item.opening_hour || "09:00" : "",
                      closing_hour: checked ? item.closing_hour || "17:00" : "",
                    })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default BusinessPeriodStep;

// UpdateCard Component
import { useEffect, useState } from "react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import TimeSelect from "../../components/TimeSelect";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { FetchedBusinessPeriod } from "@/types/formSchema"; // Ensure correct type import
import { Button } from "@/components/ui/button";

interface UpdateCardProps {
  period: FetchedBusinessPeriod; // Specify correct type for period
  onClose: () => void;
  setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateCard = ({ period, setShowSuccess }: UpdateCardProps) => {
  const [day, setDay] = useState(period.day_of_week || ""); // Track day state
  const [openingTime, setOpeningTime] = useState(period.opening_hour || "");
  const [closingTime, setClosingTime] = useState(period.closing_hour || "");
  const [location, setLocation] = useState("");

  const {
    appointmentAddresses,
    fetchAppointmentAddresses,
    updateclinicianBusinessPeriods,
    fetchBusinessPeriods,
  } = useBusinessPeriodsStore();

  // Ensure addresses are fetched on component mount
  useEffect(() => {
    if (!appointmentAddresses.length) {
      fetchAppointmentAddresses();
    }
  }, [appointmentAddresses.length, fetchAppointmentAddresses]);

  // Update location state when the period prop changes
  useEffect(() => {
    if (period?.business_locations?.[0]?.id) {
      setLocation(String(period.business_locations[0].id)); // Ensure location is set as a string
    }
    setDay(period.day_of_week); // Set the day when period changes
  }, [period]);

  const handleUpdate = async () => {
    try {
      const updatedPeriod = {
        day_of_week: day, // Include the updated day state in the payload
        opening_hour: openingTime,
        closing_hour: closingTime,
        appointment_location_ids: [location],
      };

      await updateclinicianBusinessPeriods(period.id, updatedPeriod);

      // Sync state after update to ensure UI re-renders with updated values
      await fetchBusinessPeriods();

      // Show success dialog
      setShowSuccess(true); // Trigger success dialog
    } catch (error) {
      console.error("Failed to update the business period", error);
    }
  };

  return (
    <div className="flex flex-col gap-[60px]">
      <div className="flex gap-4">
        {/* Day Display */}
        <div className="flex items-center border rounded-xl px-4 py-2 ">
          {day}
        </div>

        {/* Time Selection */}
        <TimeSelect
          placeholder="Open Hour"
          value={openingTime}
          onChange={setOpeningTime}
        />
        <TimeSelect
          placeholder="Close Hour"
          value={closingTime}
          onChange={setClosingTime}
        />

        {/* Location Selection */}
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="max-w-[144px] h-12 rounded-xl text-base font-normal text-[#444444B2] ">
            <SelectValue placeholder="Select Location">
              {appointmentAddresses.find((addr) => addr.id === Number(location))
                ? appointmentAddresses.find(
                    (addr) => addr.id === Number(location)
                  )?.street_address
                : "Select Location"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto md:text-base text-[9.19px">
            {appointmentAddresses.map((address) => (
              <SelectItem key={address.id} value={String(address.id)}>
                {`${address.street_address}, ${address.city}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleUpdate}
          className="rounded-full w-[225px] h-[55px]"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdateCard;

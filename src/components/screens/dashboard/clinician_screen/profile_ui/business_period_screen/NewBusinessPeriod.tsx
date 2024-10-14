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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface CreateBusinessPeriodModalProps {
  onClose: () => void;
  setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewBusinessPeriod = ({
  onClose,
  setShowSuccess,
}: CreateBusinessPeriodModalProps) => {
  const {
    appointmentAddresses,
    fetchAppointmentAddresses,
    setBusinessPeriods,
    setupCustomBusinessPeriods, // Use the new function here
    fetchBusinessPeriods,
  } = useBusinessPeriodsStore();

  // Local state to hold the new period instead of directly modifying store state
  const [newPeriod, setNewPeriod] = useState({
    day_of_week: "Monday",
    opening_hour: "",
    closing_hour: "",
    appointment_location_ids: [] as string[],
  });

  // Fetch appointment addresses on component mount
  useEffect(() => {
    fetchAppointmentAddresses();
  }, [fetchAppointmentAddresses]);

  // Handle updates to the new period state
  const handleUpdateBusinessPeriod = (
    updatedValue: Partial<typeof newPeriod>
  ) => {
    setNewPeriod((prevPeriod) => ({
      ...prevPeriod,
      ...updatedValue,
    }));
  };

  const handleSetup = async () => {
    try {
      // Create a new payload with only the current newPeriod
      const payload = [newPeriod]; // Ensure payload only has the newPeriod
      console.log("Payload for submission:", payload);

      // Call the setupCustomBusinessPeriods with the single entry payload
      await setupCustomBusinessPeriods(payload);

      // Re-fetch business periods to update the list after setup
      await fetchBusinessPeriods();

      // Reset the local state after successful setup
      resetNewPeriod();
      setShowSuccess(true); // Display success dialog
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to create new business period:", error);
    }
  };

  // Function to reset the local state after a successful submission
  const resetNewPeriod = () => {
    setNewPeriod({
      day_of_week: "Monday",
      opening_hour: "",
      closing_hour: "",
      appointment_location_ids: [],
    });
    setBusinessPeriods([]); // Clear businessPeriods in the global state
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      <DialogContent className="h-[350px] w-[600px] p-6">
        <div className="flex justify-between items-center mb-4">
          <DialogTitle className="text-[25px] text-[#041827] font-medium">
            Add New Time Slot
          </DialogTitle>
          <DialogClose
            className="bg-[#1DBA4A1A] w-[36px] h-[36px] rounded-full flex justify-center items-center"
            onClick={onClose}
          >
            <X size={24} />
          </DialogClose>
        </div>

        {/* Form Content */}
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-4 items-center">
            {/* Day Selection */}
            <Select
              value={newPeriod.day_of_week}
              onValueChange={(day) =>
                handleUpdateBusinessPeriod({ day_of_week: day })
              }
            >
              <SelectTrigger className="max-w-[144px] h-12 rounded-xl text-base font-normal text-[#444444B2]">
                <SelectValue placeholder="Select Day">
                  {newPeriod.day_of_week}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Time Selection */}
            <TimeSelect
              placeholder="Open Hour"
              value={newPeriod.opening_hour}
              onChange={(value) =>
                handleUpdateBusinessPeriod({ opening_hour: value })
              }
            />
            <TimeSelect
              placeholder="Close Hour"
              value={newPeriod.closing_hour}
              onChange={(value) =>
                handleUpdateBusinessPeriod({ closing_hour: value })
              }
            />

            {/* Location Selection */}
            <Select
              value={newPeriod.appointment_location_ids?.[0] || ""}
              onValueChange={(value) =>
                handleUpdateBusinessPeriod({
                  appointment_location_ids: [value],
                })
              }
            >
              <SelectTrigger className="max-w-[144px] h-12 rounded-xl text-base font-normal text-[#444444B2]">
                <SelectValue placeholder="Select Location">
                  {appointmentAddresses.find(
                    (addr) =>
                      addr.id ===
                      Number(newPeriod.appointment_location_ids?.[0])
                  )
                    ? appointmentAddresses.find(
                        (addr) =>
                          addr.id ===
                          Number(newPeriod.appointment_location_ids?.[0])
                      )?.street_address
                    : "Select Location"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto md:text-base text-[9.19px]">
                {appointmentAddresses.map((address) => (
                  <SelectItem key={address.id} value={String(address.id)}>
                    {`${address.street_address}, ${address.city}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Setup Button */}
          <div className="flex justify-center mt-4">
            <Button
              onClick={handleSetup}
              className="rounded-full w-[225px] h-[55px]"
            >
              Setup Now
            </Button>
          </div>
        </div>
      </DialogContent>
      <DialogOverlay />
    </Dialog>
  );
};

export default NewBusinessPeriod;

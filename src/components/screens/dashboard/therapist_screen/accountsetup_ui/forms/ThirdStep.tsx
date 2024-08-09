import { useEffect, useState } from "react";
import SetupHeader from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/SetupHeader";
import { Button } from "@/components/ui/button";
import { AppointmentAddress, FormState } from "@/types";
import ServiceCard from "../ServiceCard";
import EditIcon from "@/components/icons/EditIcon";

interface ThirdStepProps {
  addAppointmentAddress: (address: AppointmentAddress) => void;
  updateAccountSetup: (data: Partial<FormState>) => void;
  formState: FormState;
}

const ThirdStep = ({
  addAppointmentAddress,
  updateAccountSetup,
  formState,
}: ThirdStepProps) => {
  const [addresses, setAddresses] = useState<AppointmentAddress[]>([]);

  useEffect(() => {
    console.log(
      "Updating addresses in ThirdStep:",
      formState.appointment_addresses
    );
    setAddresses(formState.appointment_addresses || []);
  }, [formState.appointment_addresses]);

  const handleSave = () => {
    console.log("Saving addresses:", addresses);
    updateAccountSetup({ appointment_addresses: addresses });
  };

  const handleEditClick = (index: number) => {
    // Handle edit action, possibly opening an edit dialog or form
    console.log("Edit address at index:", index);
  };

  return (
    <div className="flex flex-col gap-16 w-full">
      <div className="text-center py-6 mt-6">
        <SetupHeader
          title="Where will you like your appointment to take place?"
          subtitle="Enter locations where your clients can meet up with you."
        />
      </div>
      <div className="flex flex-col gap-5 w-[393px] justify-center mx-auto">
        {addresses.map((address, index) => (
          <div key={index} className="p-4  flex justify-between">
            <p>
              {address.street_address}, {address.city}, {address.state},{" "}
              {address.postal_code}
            </p>
            <button onClick={() => handleEditClick(index)}>
              <EditIcon className="text-army_green" />{" "}
              {/* Assuming EditIcon takes a className for styling */}
            </button>
          </div>
        ))}
      </div>
      <ServiceCard addAppointmentAddress={addAppointmentAddress} />
      <Button onClick={handleSave} className="mt-5">
        Save Addresses
      </Button>
    </div>
  );
};

export default ThirdStep;

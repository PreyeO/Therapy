import { useEffect, useState } from "react";
import SetupHeader from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/SetupHeader";
import { AppointmentAddress, FormState } from "@/types/formSchema";
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
    setAddresses(formState.appointment_addresses || []);
  }, [formState.appointment_addresses]);

  const handleSave = () => {
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
      <form
        id="step-2-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <button type="submit" className="hidden">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThirdStep;

import { useState } from "react";
import { FormState, AppointmentAddress } from "@/types";

export const useAccountSetup = () => {
  const [formState, setFormState] = useState<FormState>({
    professional_license_number: "",
    specialty: "",
    practice_name: "",
    rate_per_session: "",
    duration_per_session: "",
    duration_unit: undefined,
    business_address: {
      street_address: "",
      city: "",
      state: "",
      postal_code: "",
    },
    appointment_addresses: [],
  });

  const updateAccountSetup = (stepData: Partial<FormState>) => {
    setFormState((prev) => ({
      ...prev,
      ...stepData,
      business_address: stepData.business_address ?? prev.business_address,
      appointment_addresses:
        stepData.appointment_addresses ?? prev.appointment_addresses,
    }));
  };

  const addAppointmentAddress = (address: AppointmentAddress) => {
    console.log("Adding appointment address:", address);
    setFormState((prev) => ({
      ...prev,
      appointment_addresses: [...prev.appointment_addresses, address],
    }));
  };

  return { formState, updateAccountSetup, addAppointmentAddress };
};

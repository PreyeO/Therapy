import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormState,
  AppointmentAddress,
  BusinessPeriod,
} from "@/types/formSchema";
import {
  getUserData,
  getAuthToken,
  setAuthToken,
} from "@/services/api/authentication/auth";
import {
  getTherapistProfile,
  getTherapistBusinessPeriods,
  setupTherapistProfile,
  setupTherapistBusinessPeriods,
} from "@/services/api/therapist/account_setup";
import { toast } from "react-toastify";

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

  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);
  const [therapistProfileId, setTherapistProfileId] = useState<string | null>(
    null
  );
  const [businessPeriods, setBusinessPeriods] = useState<BusinessPeriod[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = getUserData();
        if (userData?.user?.therapist_profile) {
          const profileId = userData.user.therapist_profile.id;
          setTherapistProfileId(profileId);

          const token = getAuthToken();
          if (token) {
            setAuthToken(token);
            await getTherapistProfile(profileId);
          } else {
            console.error("Token not found");
            navigate("/login");
          }
        } else {
          console.error("Therapist profile not found in user data");
          navigate("/login");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching user data:", error.message);
          toast.error(error.message || "Error fetching user data.");
        } else {
          console.error("Unexpected error:", error);
          toast.error("An unexpected error occurred.");
        }
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchBusinessPeriods = async () => {
      try {
        const periods = await getTherapistBusinessPeriods();
        setBusinessPeriods(periods);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching business periods:", error.message);
          toast.error(error.message || "Error fetching business periods.");
        } else {
          console.error("Unexpected error:", error);
          toast.error("An unexpected error occurred.");
        }
      }
    };

    fetchBusinessPeriods();
  }, []);

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

  const handleSaveBusinessPeriods = useCallback((periods: BusinessPeriod[]) => {
    setBusinessPeriods(periods);
  }, []);

  const handleFinishSetup = useCallback(async () => {
    try {
      if (!therapistProfileId) {
        throw new Error("Therapist profile ID is not set.");
      }

      console.log("Final formState before submission:", formState);

      await setupTherapistProfile(therapistProfileId, formState);

      const validBusinessPeriods = businessPeriods.filter(
        (period) => period.opening_hour && period.closing_hour
      );

      await setupTherapistBusinessPeriods(validBusinessPeriods);

      console.log("Setup is complete. Updating isSetupComplete state...");

      setIsSetupComplete(true);
      console.log("isSetupComplete set to true.");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error submitting form:", error.message);
        toast.error(error.message || "Ooops!");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  }, [formState, businessPeriods, therapistProfileId]);

  return {
    formState,
    updateAccountSetup,
    addAppointmentAddress,
    isSetupComplete,
    setIsSetupComplete,
    therapistProfileId,
    businessPeriods,
    handleSaveBusinessPeriods,
    handleFinishSetup,
  };
};

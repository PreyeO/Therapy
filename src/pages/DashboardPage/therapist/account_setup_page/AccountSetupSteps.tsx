// src/pages/DashboardPage/therapist/account_setup_page/AccountSetupSteps.tsx
import React, { useMemo, useCallback } from "react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import BusinessPeriodStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/BusinessPeriodStep";
import ReviewStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/ReviewStep";
import { useMultiStepForm } from "@/hooks/index";
import StepNavigation from "@/components/ui/step-navigation";
import { Progress } from "@/components/ui/progress";
import { ToastContainer } from "react-toastify";
import {
  setupTherapistBusinessPeriods,
  getAppointmentAddress,
} from "@/services/api/therapist/account_setup";

interface AppointmentAddress {
  id: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
}

// Explicitly define the type for the props
interface AccountSetupStepsProps {
  setIsSetupComplete: (isComplete: boolean) => void;
}

const AccountSetupSteps: React.FC<AccountSetupStepsProps> = ({
  setIsSetupComplete,
}) => {
  const { businessPeriods, clearBusinessPeriods } = useBusinessPeriodsStore();
  const [appointmentAddresses, setAppointmentAddresses] = React.useState<
    AppointmentAddress[]
  >([]);

  // Fetch appointment addresses when component mounts
  React.useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const addresses = await getAppointmentAddress();
        setAppointmentAddresses(addresses); // Directly set the data as received from the API
      } catch (error) {
        console.error("Error fetching appointment addresses:", error);
      }
    };
    fetchAddresses();
  }, []);

  const steps = useMemo(
    () => [
      <BusinessPeriodStep
        onSave={() => {}}
        appointmentAddresses={appointmentAddresses}
      />,
      <ReviewStep appointmentAddresses={appointmentAddresses} />,
    ],
    [appointmentAddresses]
  );

  const { currentStep, step, next, prev, isFirstStep, isLastStep } =
    useMultiStepForm(steps);

  const handleFinishSetup = useCallback(async () => {
    try {
      const validBusinessPeriods = businessPeriods.filter(
        (period) => period.opening_hour && period.closing_hour
      );
      await setupTherapistBusinessPeriods(validBusinessPeriods);
      clearBusinessPeriods();
      setIsSetupComplete(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }, [businessPeriods, clearBusinessPeriods, setIsSetupComplete]);

  const handleNext = useCallback(() => {
    next();
  }, [next]);

  return (
    <div className="w-full flex flex-col items-center scale-75">
      <div className="xl:w-[60%] w-full bg-white rounded-3xl shadow-md flex flex-col">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between px-[4%] py-4">
            <h3 className="lg:text-2xl md:text-xl text-base font-medium">
              Account setup
            </h3>
            <h3 className="md:text-lg text-base font-bold text-army_green">
              Step {currentStep + 1} of {steps.length}
            </h3>
          </div>
          <div className="px-[4%]">
            <Progress value={(currentStep + 1) * (100 / steps.length)} />
          </div>
        </div>
        {step}
        <StepNavigation
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          prev={prev}
          handleNext={handleNext}
          handleFinishSetup={handleFinishSetup}
        />
      </div>
      <ToastContainer
        toastStyle={{ backgroundColor: "crimson", color: "white" }}
        className="text-white"
      />
    </div>
  );
};

export default AccountSetupSteps;

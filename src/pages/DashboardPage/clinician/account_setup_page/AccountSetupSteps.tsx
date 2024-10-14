// src/pages/DashboardPage/clinician/account_setup_page/AccountSetupSteps.tsx

import React, { useMemo, useCallback } from "react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import BusinessPeriodStep from "@/components/screens/dashboard/clinician_screen/accountsetup_ui/BusinessPeriodStep";
import ReviewStep from "@/components/screens/dashboard/clinician_screen/accountsetup_ui/ReviewStep";
import { useMultiStepForm } from "@/hooks/index";
import StepNavigation from "@/components/ui/step-navigation";
import { Progress } from "@/components/ui/progress";
import { ToastContainer } from "react-toastify";
import { AppointmentAddress } from "@/types/formSchema";
import { getAppointmentAddress } from "@/services/api/clinicians/account_setup";
import { useDialogState } from "@/store";

const AccountSetupSteps: React.FC<{
  setIsSetupComplete: (isComplete: boolean) => void;
}> = ({ setIsSetupComplete }) => {
  const { clearBusinessPeriods, setupBusinessPeriods } =
    useBusinessPeriodsStore();
  const [appointmentAddresses, setAppointmentAddresses] = React.useState<
    AppointmentAddress[]
  >([]);
  const { openSuccess } = useDialogState(); // Use dialog state for success dialog

  React.useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const addresses = await getAppointmentAddress();
        setAppointmentAddresses(addresses); // Set the fetched addresses
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
        appointmentAddresses={appointmentAddresses} // Pass the addresses as a prop
      />,
      <ReviewStep appointmentAddresses={appointmentAddresses} />, // Pass the addresses as a prop
    ],
    [appointmentAddresses]
  );

  const { currentStep, step, next, prev, isFirstStep, isLastStep } =
    useMultiStepForm(steps);

  // Handle finish button click
  const handleFinishSetup = useCallback(async () => {
    try {
      await setupBusinessPeriods(); // Trigger the setup function in the store
      clearBusinessPeriods();
      openSuccess({
        title: "You have successfully set up your account",
        subtitle: "You can now proceed to your dashboard",
      }); // Show success dialog
      setIsSetupComplete(true); // Optional, depending on further requirements
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }, [
    setupBusinessPeriods,
    clearBusinessPeriods,
    setIsSetupComplete,
    openSuccess,
  ]);

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
          handleNext={next}
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

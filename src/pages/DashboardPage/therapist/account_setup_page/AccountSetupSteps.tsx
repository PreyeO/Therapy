import { useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast, ToastContainer } from "react-toastify";
import { useMultiStepForm } from "@/hooks/index";
import ReviewStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/ReviewStep";
import FifthStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/FifthStep";
import FourthStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/FourthStep";
import ThirdStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/ThirdStep";
import SecondStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/SecondStep";
import FirstStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/FirstStep";
import StepNavigation from "@/components/ui/step-navigation";
import { useAccountSetup } from "@/hooks/useAccountSetup";
import {
  setupTherapistProfile,
  setupTherapistBusinessPeriods,
} from "@/services/api/therapist/account_setup";

const AccountSetupSteps = ({ setIsSetupComplete, therapistProfileId }) => {
  const {
    formState,
    updateAccountSetup,
    addAppointmentAddress,
    businessPeriods,
    handleSaveBusinessPeriods,
  } = useAccountSetup();

  const steps = useMemo(
    () => [
      <FirstStep
        updateAccountSetup={updateAccountSetup}
        formState={formState}
        key="FirstStep"
      />,
      <SecondStep
        updateAccountSetup={updateAccountSetup}
        formState={formState}
        key="SecondStep"
      />,
      <ThirdStep
        addAppointmentAddress={addAppointmentAddress}
        updateAccountSetup={updateAccountSetup}
        formState={formState}
        key="ThirdStep"
      />,
      <FourthStep
        updateAccountSetup={updateAccountSetup}
        formState={formState}
        key="FourthStep"
      />,
      <FifthStep onSave={handleSaveBusinessPeriods} key="FifthStep" />,
      <ReviewStep
        businessPeriods={businessPeriods}
        formState={formState}
        key="ReviewStep"
      />,
    ],
    [
      formState,
      updateAccountSetup,
      addAppointmentAddress,
      handleSaveBusinessPeriods,
      businessPeriods,
    ]
  );

  const { currentStep, step, next, prev, isFirstStep, isLastStep } =
    useMultiStepForm(steps);

  const progressValue = useMemo(
    () => (currentStep + 1) * (100 / steps.length),
    [currentStep, steps.length]
  );

  const handleFinishSetup = useCallback(async () => {
    try {
      console.log("Final form state before submission:", formState);
      const profileResponse = await setupTherapistProfile(
        therapistProfileId,
        formState
      );
      console.log("Profile setup response:", profileResponse);

      const validBusinessPeriods = businessPeriods.filter(
        (period) => period.opening_hour && period.closing_hour
      );
      console.log(
        "Filtered business periods before submission:",
        validBusinessPeriods
      );

      const periodsResponse = await setupTherapistBusinessPeriods(
        validBusinessPeriods
      );
      console.log("Business periods setup response:", periodsResponse);

      setIsSetupComplete(true); // Update state to show Success component
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Ooops!");
      } else {
        toast.error("OOOPS! An unknown error occurred");
      }
    }
  }, [formState, businessPeriods, therapistProfileId, setIsSetupComplete]);

  const handleNext = useCallback(() => {
    const form = document.getElementById(
      `step-${currentStep}-form`
    ) as HTMLFormElement;

    if (form) {
      form.requestSubmit(); // This triggers the form's onSubmit handler

      // After the form is submitted, we need to ensure that the form was valid.
      if (form.checkValidity()) {
        next(); // Proceed to the next step only if the form is valid
      } else {
        console.warn("Form is invalid, staying on the current step.");
      }
    }
  }, [currentStep, next]);

  return (
    <div className="w-full flex flex-col items-center scale-75">
      <Card className="xl:w-[60%] w-full bg-white rounded-3xl shadow-md flex flex-col">
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
            <Progress value={progressValue} />
          </div>
        </div>
        <CardContent>{step}</CardContent>
        <StepNavigation
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          prev={prev}
          handleNext={handleNext}
          handleFinishSetup={handleFinishSetup}
        />
      </Card>
      <ToastContainer
        toastStyle={{ backgroundColor: "crimson", color: "white" }}
        className="text-white"
      />
    </div>
  );
};

export default AccountSetupSteps;

import { useState, useEffect, ReactElement } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import { useMultiStepForm } from "@/hooks/index";
import { useAccountSetup } from "@/hooks/useAccountSetup";
import {
  setupTherapistProfile,
  setupTherapistBusinessPeriods,
  getTherapistBusinessPeriods,
} from "@/services/api/therapist/account_setup";
import ReviewStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/ReviewStep";
import FifthStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/FifthStep";
import FourthStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/FourthStep";
import ThirdStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/ThirdStep";
import SecondStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/SecondStep";
import FirstStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/FirstStep";
import { BusinessPeriod } from "@/types";
import "react-toastify/dist/ReactToastify.css";

const AccountSetupSteps = ({ setIsSetupComplete, therapistProfileId }) => {
  const { formState, updateAccountSetup, addAppointmentAddress } =
    useAccountSetup();
  const [businessPeriods, setBusinessPeriods] = useState<BusinessPeriod[]>([]);

  useEffect(() => {
    const fetchBusinessPeriods = async () => {
      try {
        console.log("Calling getTherapistBusinessPeriods...");
        const periods = await getTherapistBusinessPeriods();
        console.log("Setting fetched business periods state:", periods);
        setBusinessPeriods(periods); // Set fetched business periods
      } catch (error) {
        console.error("Error fetching business periods:", error);
      }
    };

    fetchBusinessPeriods();
  }, []);

  const handleSaveBusinessPeriods = (periods: BusinessPeriod[]) => {
    setBusinessPeriods(periods);
  };

  const steps: ReactElement[] = [
    <FirstStep
      updateAccountSetup={updateAccountSetup}
      key="FirstStep"
      formState={formState}
    />,
    <SecondStep
      updateAccountSetup={updateAccountSetup}
      key="SecondStep"
      formState={formState}
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
  ];

  const { currentStep, step, next, prev, isFirstStep, isLastStep } =
    useMultiStepForm(steps);

  const progressValue = (currentStep + 1) * (100 / steps.length);

  const handleFinishSetup = async () => {
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

      setIsSetupComplete(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Ooops!");
      } else {
        toast.error("OOOPS! An unknown error occurred");
      }
    }
  };

  console.log("Current formState in AccountSetupSteps:", formState);

  return (
    <div className="w-full flex flex-col items-center scale-75">
      <Card className="xl:w-[60%] w-full bg-white rounded-3xl  shadow-md flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between px-[4%] py-8">
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
        </div>
        <div className="flex gap-3 justify-end items-end mx-[4%] mb-4">
          {!isFirstStep && (
            <Button
              onClick={prev}
              className="rounded-full md:w-[30%] w-full h-[55px] text-xl font-medium bg-transparent text-army_green border mb-4"
            >
              Previous
            </Button>
          )}
          {isLastStep ? (
            <Button
              onClick={handleFinishSetup}
              className="rounded-full md:w-[30%] w-full h-[55px] text-xl font-medium mb-4"
            >
              Finish Setup
            </Button>
          ) : (
            <Button
              onClick={next}
              className="rounded-full md:w-[30%] h-[55px] text-xl font-medium w-full mb-4"
            >
              Next
            </Button>
          )}
        </div>
      </Card>
      <ToastContainer
        toastStyle={{ backgroundColor: "crimson", color: "white" }}
        className="text-white"
      />
    </div>
  );
};

export default AccountSetupSteps;

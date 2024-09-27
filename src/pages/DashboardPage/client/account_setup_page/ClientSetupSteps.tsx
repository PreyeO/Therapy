import { useMultiStepForm } from "@/hooks/index";
import StepNavigation from "@/components/ui/step-navigation";
import { Progress } from "@/components/ui/progress";
import { ToastContainer } from "react-toastify";
import PersonalInfoForm from "@/components/screens/dashboard/client_screen/accountsetup_ui/forms/PersonalInfoForm";
import AddressForm from "@/components/screens/dashboard/client_screen/accountsetup_ui/forms/AddressForm";
import ClinicalDocForm from "@/components/screens/dashboard/client_screen/accountsetup_ui/forms/ClinicalDocForm";
import EmergencyForm from "@/components/screens/dashboard/client_screen/accountsetup_ui/forms/EmergencyForm";
import Review from "@/components/screens/dashboard/client_screen/accountsetup_ui/Review";

const ClientSetupSteps = () => {
  // Array of form step components
  const steps = [
    <PersonalInfoForm key="personal-info" />,
    <AddressForm key="address-info" />,
    <EmergencyForm key="emergency-info" />,
    <ClinicalDocForm key="clinical-docs" />,
    <Review key="review-info" />,
  ];

  const { currentStep, step, next, prev, isFirstStep, isLastStep } =
    useMultiStepForm(steps);

  const handleNext = () => {
    next(); // Move to next step
  };

  const handleFinishSetup = () => {
    // Logic to handle the last step submission
    console.log("Setup Finished!");
  };

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

        {/* Render the current step */}
        <div className="px-[4%] py-4">{step}</div>

        {/* Navigation buttons */}
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

export default ClientSetupSteps;

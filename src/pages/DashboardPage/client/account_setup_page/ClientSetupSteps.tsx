import { useMultiStepForm } from "@/hooks/index";
import StepNavigation from "@/components/ui/step-navigation";
import { Progress } from "@/components/ui/progress";
import { ToastContainer } from "react-toastify";
import PersonalInfoForm from "@/components/screens/dashboard/client_screen/accountsetup_ui/forms/PersonalInfoForm";
import AddressForm from "@/components/screens/dashboard/client_screen/accountsetup_ui/forms/AddressForm";
import ClinicalDocForm from "@/components/screens/dashboard/client_screen/accountsetup_ui/forms/ClinicalDocForm";
import EmergencyForm from "@/components/screens/dashboard/client_screen/accountsetup_ui/forms/EmergencyForm";
import Review from "@/components/screens/dashboard/client_screen/accountsetup_ui/Review";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useDialogState } from "@/store";
import { useEffect } from "react";
import { getUserData } from "@/services/api/authentication/auth";
import DialogCard from "@/components/screens/dashboard/components/DialogCard";
import { useNavigate } from "react-router-dom";

const ClientSetupSteps = () => {
  // Get methods and data from Zustand store
  const { completeClientSetup, fetchProfileData } = useBusinessPeriodsStore();
  const { openSuccess } = useDialogState(); // Access dialog methods

  const navigate = useNavigate();

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

  // Function to handle form navigation
  const handleNext = () => {
    next(); // Move to next step
  };
  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  // Function to handle final form submission
  const getClientProfileId = () => {
    const userData = getUserData(); // Retrieve user data from local storage or state
    return userData?.user?.client_profile?.id; // Ensure you are accessing client_profile.id
  };

  // Function to handle form submission
  const handleFinishSetup = async () => {
    const clientProfileId = getClientProfileId(); // Use the utility function to get the client profile ID

    console.log("Client Profile ID:", clientProfileId); // Log the client profile ID for debugging purposes

    if (!clientProfileId) {
      console.error("Client Profile ID is missing!");
      return; // Exit if the ID is not found
    }

    try {
      await completeClientSetup(clientProfileId); // Use clientProfileId when calling completeClientSetup
      openSuccess({
        title: "Setup Complete",
        subtitle: "Your profile setup has been completed successfully!",
      });
    } catch (error) {
      console.error("Failed to complete setup:", error);
    }
  };
  const handleViewAppointment = () => {
    navigate("/client_dashboard"); // Navigate to the appointment page
  };

  return (
    <div className="w-full flex flex-col items-center scale-75">
      <DialogCard
        buttonLabel="Go to your dashboard"
        buttonAction={handleViewAppointment}
      />
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

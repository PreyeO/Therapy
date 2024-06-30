// AccountSetup.tsx
import { ReactElement, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useMultiStepForm } from "@/hooks/index";
import ReviewStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/ReviewStep";
import FifthStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/FifthStep";
import FourthStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/FourthStep";
import ThirdStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/ThirdStep";
import SecondStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/SecondStep";
import FirstStep from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/forms/FirstStep";
import Success from "@/components/ui/notifications/Success";
import { useNavigate } from "react-router-dom";

const steps: ReactElement[] = [
  <FirstStep />,
  <SecondStep />,
  <ThirdStep />,
  <FourthStep />,
  <FifthStep />,
  <ReviewStep />,
];

const AccountSetup = () => {
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);
  const { currentStep, step, next, prev, isFirstStep, isLastStep } =
    useMultiStepForm(steps);

  const progressValue = (currentStep + 1) * (100 / steps.length);

  const handleFinishSetup = () => {
    setIsSetupComplete(true);
  };

  const navigate = useNavigate();
  const handleSuccessButtonClick = () => {
    navigate("/dashboard");
  };
  return (
    <main className="bg-main-background w-full h-screen flex flex-col items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {isSetupComplete ? (
          <Success
            title="You have successfully setup your account"
            subtitle="You can now procced to your dashboard"
            label="Go to dashboard"
            onButtonClick={handleSuccessButtonClick}
            className=" "
          />
        ) : (
          <div className="w-full flex flex-col items-center scale-75">
            <Card className="w-[60%] bg-white rounded-3xl py-8 shadow-md flex flex-col gap-16">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between px-[4%] py-8">
                  <h3 className="text-2xl font-medium">Account setup</h3>
                  <h3 className="text-lg font-bold text-army_green">
                    Step {currentStep + 1} of {steps.length}
                  </h3>
                </div>
                <div className="px-[4%]">
                  <Progress value={progressValue} />
                </div>
              </div>
              <CardContent>{step}</CardContent>
              <div className="flex gap-3 justify-end items-end mt-10 mx-[4%] mb-2">
                {!isFirstStep && (
                  <Button
                    onClick={prev}
                    className="rounded-full w-[30%] h-[55px] text-xl font-medium bg-transparent text-army_green border"
                  >
                    Previous
                  </Button>
                )}
                {isLastStep ? (
                  <Button
                    onClick={handleFinishSetup}
                    className="rounded-full w-[30%] h-[55px] text-xl font-medium"
                  >
                    Finish Setup
                  </Button>
                ) : (
                  <Button
                    onClick={next}
                    className="rounded-full w-[30%] h-[55px] text-xl font-medium"
                  >
                    Next
                  </Button>
                )}
              </div>
            </Card>
          </div>
        )}
        <div id="overlay-container"></div>
      </div>
    </main>
  );
};

export default AccountSetup;

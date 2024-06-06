import { EmailVerification } from "@/components/auth/EmailVerification";
import { NewPassword } from "@/components/auth/NewPassword";
// import { ResetDone } from "@/components/auth/ResetDone";
import { ResetForm } from "@/components/auth/ResetForm";
// import { ResetOTP } from "@/components/auth/ResetOTP";
import Success from "@/components/ui/notifications/Success";

import { useMultiStepForm } from "@/hooks";
import { ArrowLeft } from "lucide-react";
import { FC } from "react";

const PasswordReset: FC = () => {
  function handleNext() {
    next();
  }
  const handleEmailVerification = () => {
    // Logic to handle email verification (e.g., API call)
    console.log("Email verified");
  };

  const steps = [
    <ResetForm handleNext={handleNext} />,
    <EmailVerification
      handleNext={handleNext}
      handleSubmit={handleEmailVerification}
    />,

    <NewPassword handleNext={handleNext} />,
    <Success
      title="Account Verification Successful"
      subtitle="You can now procced to your dashboard"
    />,
  ];

  const { step, prev, next, isFirstStep, completed } = useMultiStepForm(steps);

  return (
    <main className="overflow-clip h-screen">
      {steps.indexOf(step) !== steps.length - 1 && (
        <div className="flex py-4 px-4 ">
          <ArrowLeft
            className={`cursor-pointer ${
              isFirstStep || completed ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => {
              !isFirstStep && !completed && prev();
            }}
            size={25.82}
            color="#0D001E"
          />
          <span className="text-[#333333] font-normal text-xl">Back</span>
        </div>
      )}
      <div className="w-full">{step}</div>
    </main>
  );
};

export default PasswordReset;

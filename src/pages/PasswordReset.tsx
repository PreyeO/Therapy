import { useState } from "react";
import { NewPassword } from "@/components/auth/reset_password/NewPassword";
import { ResetForm } from "@/components/auth/reset_password/ResetForm";
import { OtpVerification } from "@/components/auth/reset_password/OtpVerification";
import Success from "@/components/ui/notifications/Success";
import { useMultiStepForm } from "@/hooks";
import { ArrowLeft } from "lucide-react";
import { FC } from "react";

const PasswordReset: FC = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNext = (
    email?: string,
    newPassword?: string,
    confirmPassword?: string
  ) => {
    if (email) setEmail(email);
    if (newPassword) setNewPassword(newPassword);
    if (confirmPassword) setConfirmPassword(confirmPassword);
    next();
  };

  const steps = [
    <ResetForm handleNext={handleNext} />,
    <NewPassword
      handleNext={(newPassword, confirmPassword) =>
        handleNext(undefined, newPassword, confirmPassword)
      }
    />,
    <OtpVerification
      email={email}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      handleNext={() => handleNext()}
    />,
    <Success
      title="Account Verification Successful"
      subtitle="You can now proceed to your dashboard"
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

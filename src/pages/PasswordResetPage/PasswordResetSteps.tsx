import { useState } from "react";
import { NewPassword } from "@/components/auth/reset_password/NewPassword";
import { ResetForm } from "@/components/auth/reset_password/ResetForm";
import { OtpVerification } from "@/components/auth/reset_password/OtpVerification";
import Success from "@/components/ui/notifications/Success";
import { useMultiStepForm } from "@/hooks";
import { ArrowLeft } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const PasswordResetSteps: FC = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

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
      title="Password Reset Successful"
      subtitle="You can now proceed to login"
    />,
  ];

  const { step, prev, next, isFirstStep, completed } = useMultiStepForm(steps);

  const handleBack = () => {
    if (steps.indexOf(step) === 0) {
      navigate("/signin"); // Redirect to login page if on the first step
    } else if (!isFirstStep && !completed) {
      prev();
    }
  };

  return (
    <>
      {steps.indexOf(step) !== steps.length - 1 && (
        <div className="flex py-4 px-4">
          <ArrowLeft
            className={`cursor-pointer ${
              isFirstStep || completed ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={handleBack} // Use handleBack function
            size={25.82}
            color="#0D001E"
          />
          <span className="text-[#333333] font-normal text-xl">Back</span>
        </div>
      )}
      <div className="w-full">{step}</div>
    </>
  );
};

export default PasswordResetSteps;

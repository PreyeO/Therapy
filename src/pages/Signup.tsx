import { useMultiStepForm } from "@/hooks/index"; // Adjust the import path
import { UserCategory } from "@/components/auth/UserCategory";
import Register from "@/components/auth/Register";
import { EmailVerification } from "@/components/auth/EmailVerification";
import Success from "@/components/ui/notifications/Success";
import { RegisterDataType } from "@/types";
import { useState } from "react";

const Signup = () => {
  const [userType, setUserType] = useState<
    RegisterDataType["userType"] | undefined
  >(undefined);

  const handleNext = () => {
    next();
  };

  const handleType = (type: RegisterDataType["userType"]) => {
    setUserType(type);
  };

  const handleEmailVerification = () => {
    // Logic to handle email verification (e.g., API call)
    console.log("Email verified");
  };

  const steps = [
    <UserCategory
      handleNext={handleNext}
      handleType={handleType}
      type={userType}
    />,
    <Register handleNext={handleNext} />,
    <EmailVerification
      handleNext={handleNext}
      handleSubmit={handleEmailVerification}
    />,
    <Success
      title="Password Reset Successful"
      subtitle="You can now login with your new password"
    />,
  ];

  const {
    step,
    next,
    // prev,

    // isFirstStep,
  } = useMultiStepForm(steps);

  return (
    <main className="h-screen">
      {step}
      {/* Optionally, you can add navigation buttons to go to the previous step */}
      {/* {!isFirstStep && <button onClick={prev}>Back</button>} */}
    </main>
  );
};

export default Signup;

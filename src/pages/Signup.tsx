import { useState, ReactElement } from "react";
import { useMultiStepForm } from "@/hooks/index";
import { UserCategory } from "@/components/auth/UserCategory";
import Register from "@/components/auth/Register";
import { EmailVerification } from "@/components/auth/EmailVerification";
import Success from "@/components/ui/notifications/Success";
import { RegisterDataType } from "@/types";
import { verifyEmailOTP } from "@/services/api";

const Signup = () => {
  const [userType, setUserType] =
    useState<RegisterDataType["userType"]>("patient");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] =
    useState<boolean>(false);

  const handleNext = (id?: string) => {
    if (id) setUserId(id);
    next();
  };

  const handleType = (type: RegisterDataType["userType"]) => {
    setUserType(type);
  };

  const handleEmailSent = (userId: string) => {
    console.log("Email sent");
    setUserId(userId);
    setEmailSent(true);
    handleNext(userId);
  };

  const handleSubmitOTP = async (otp: string) => {
    try {
      if (userId) {
        console.log("Verifying OTP:", otp); // Add logging
        const response = await verifyEmailOTP(userId, otp); // Ensure token is included in request
        console.log("OTP verification response:", response); // Add logging
        if (response.success) {
          setRegistrationSuccess(true);
          handleNext();
        } else {
          console.error("Error verifying OTP:", response.error);
        }
      }
    } catch (error) {
      console.error("OTP verification error:", error);
    }
  };

  const steps: ReactElement[] = [
    <UserCategory
      key="UserCategory"
      handleNext={handleNext}
      handleType={handleType}
      type={userType}
    />,
  ];

  if (userType && !emailSent) {
    steps.push(
      <Register
        key="Register"
        handleNext={handleEmailSent}
        userType={userType}
      />
    );
  } else if (emailSent && !registrationSuccess) {
    steps.push(
      <EmailVerification
        key="EmailVerification"
        handleNext={handleNext}
        handleSubmit={handleSubmitOTP}
        userType={userType}
      />
    );
  } else if (registrationSuccess) {
    steps.push(
      <Success
        key="Success"
        title="Registration Successful"
        subtitle="Your account has been created successfully"
      />
    );
  }

  const { step, next } = useMultiStepForm(steps);

  return <>{step}</>;
};

export default Signup;

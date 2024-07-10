import { useState, ReactElement } from "react";
import { useMultiStepForm } from "@/hooks/index";
import { UserCategory } from "@/components/auth/UserCategory";
import Register from "@/components/auth/user_registration/Register";
import EmailVerification from "@/components/auth/user_verification/EmailVerification";
import Success from "@/components/ui/notifications/Success";
import { RegisterDataType } from "@/types";
import { useNavigate } from "react-router-dom";
import { useSignupState } from "@/store";

const SignupSteps = () => {
  const [userType, setUserType] =
    useState<RegisterDataType["userType"]>("patient");

  const {
    emailSent,
    userId,
    registrationSuccess,
    token,
    email,
    setEmailSent,
    setUserId,
    setRegistrationSuccess,
    setToken,
    setEmail,
  } = useSignupState();
  const navigate = useNavigate();

  const handleNext = (
    id?: string,
    token?: string,
    email?: string,
    isSuccess?: boolean
  ) => {
    if (id) setUserId(id);
    if (token) setToken(token);
    if (email) setEmail(email);
    if (isSuccess) setRegistrationSuccess(true);
    next();
  };

  const handleType = (type: RegisterDataType["userType"]) => {
    setUserType(type);
  };

  const handleEmailSent = (userId: string, token: string, email: string) => {
    setUserId(userId);
    setToken(token);
    setEmailSent(true);
    setEmail(email);
    handleNext(userId, token, email);
  };

  const handleSuccessButtonClick = () => {
    navigate("/signin");
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
        userId={userId!}
        token={token}
        email={email}
      />
    );
  } else if (registrationSuccess) {
    steps.push(
      <Success
        key="Success"
        title="Registration Successful"
        subtitle="Your account has been created successfully"
        label="Login"
        onButtonClick={handleSuccessButtonClick}
      />
    );
  }

  const { step, next } = useMultiStepForm(steps);

  return <>{step}</>;
};

export default SignupSteps;

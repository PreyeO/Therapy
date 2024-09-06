// components/EmailVerification.tsx

import { VerificationCard } from "@/components/auth/VerificationCard";
import {
  verifyEmailOTP,
  sendOTPToEmail,
  setAuthToken,
} from "@/services/api/authentication/auth";

interface EmailVerificationProps {
  userId: string;
  token: string;
  email: string;
  handleNext: (
    userId?: string,
    token?: string,
    email?: string,
    isSuccess?: boolean
  ) => void;
}

const EmailVerification = ({
  userId,
  token,
  email,
  handleNext,
}: EmailVerificationProps) => {
  const verifyOtp = async (otp: string) => {
    setAuthToken(token);
    const response = await verifyEmailOTP(userId, otp);
    if (response.detail === "OTP verified successfully.") {
      handleNext(userId, token, email, true);
      return true;
    }
    return false;
  };

  const resendOtp = async () => {
    await sendOTPToEmail(userId);
  };

  return (
    <div className="max-w-[821px] flex flex-col justify-center mx-auto min-h-screen">
      <VerificationCard
        email={email}
        verifyOtp={verifyOtp}
        resendOtp={resendOtp}
      />
    </div>
  );
};

export default EmailVerification;

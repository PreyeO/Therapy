// components/EmailVerification.tsx

import { VerificationCard } from "@/components/auth/VerificationCard";
import {
  verifyEmailOTP,
  sendOTPToEmail,
  setAuthToken,
} from "@/services/api/auth";

interface EmailVerificationProps {
  userId: string;
  token: string;
  handleNext: (userId?: string, token?: string, isSuccess?: boolean) => void;
}

export const EmailVerification = ({
  userId,
  token,
  handleNext,
}: EmailVerificationProps) => {
  const verifyOtp = async (otp: string) => {
    setAuthToken(token);
    const response = await verifyEmailOTP(userId, otp);
    if (response.detail === "OTP verified successfully.") {
      handleNext(userId, token, true);
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
        email="chrisnnaji443@gmail.com"
        verifyOtp={verifyOtp}
        resendOtp={resendOtp}
      />
    </div>
  );
};

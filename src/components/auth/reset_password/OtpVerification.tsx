import { FC } from "react";
import { VerificationCard } from "@/components/auth/VerificationCard";
import { changePassword, searchUserEmail } from "@/services/api/password_reset";

interface OtpVerificationProps {
  email: string;
  newPassword: string;
  confirmPassword: string;
  handleNext: () => void;
}

export const OtpVerification: FC<OtpVerificationProps> = ({
  email,
  newPassword,
  confirmPassword,
  handleNext,
}) => {
  const verifyOtp = async (otp: string) => {
    try {
      await changePassword({
        email,
        otp,
        new_password: newPassword,
        new_password_repeated: confirmPassword,
      });
      handleNext();
      return true;
    } catch (error) {
      console.error("OTP verification error:", error);
      return false;
    }
  };

  const resendOtp = async () => {
    try {
      await searchUserEmail(email);
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
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

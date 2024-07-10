import { motion } from "framer-motion";
import { useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import OtpTimer from "@/components/auth/user_verification/OtpTimer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Form } from "../ui/form";
import { toast } from "sonner";
import LoadingOverlay from "@/components/ui/loader_effects/LoadingOverlay";
import { useAuthState, useVerificationState } from "@/store/index";

interface VerificationCardProps {
  email: string;
  verifyOtp: (otp: string) => Promise<boolean>;
  resendOtp: () => Promise<void>;
}

const OTPFormSchema = z.object({
  pin: z.string().length(6, "OTP must be 6 digits"),
});

export const VerificationCard = ({
  email,
  verifyOtp,
  resendOtp,
}: VerificationCardProps) => {
  const {
    verificationError,
    resendEnabled,
    resetTrigger,
    setVerificationError,
    setResendEnabled,
    incrementResetTrigger,
  } = useVerificationState();

  const { loading, setLoading } = useAuthState();

  const form = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleVerifyOtp = useCallback(
    async (otp: string) => {
      try {
        setLoading(true); // Start loading
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Add a delay for loading effect
        const isValid = await verifyOtp(otp);
        setLoading(false); // Stop loading

        if (!isValid) {
          setVerificationError("Invalid OTP or Expired OTP. Please try again.");
        }
      } catch (error) {
        setLoading(false); // Stop loading
        console.error("OTP verification error:", error);
        setVerificationError("Invalid OTP or Expired OTP. Please try again.");
      }
    },
    [verifyOtp, setLoading, setVerificationError]
  );

  const onSubmit = useCallback(
    (data: z.infer<typeof OTPFormSchema>) => {
      handleVerifyOtp(data.pin);
    },
    [handleVerifyOtp]
  );

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.pin && value.pin.length === 6) {
        form.handleSubmit(onSubmit)();
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);

  const handleResendCode = async () => {
    try {
      await resendOtp();
      toast("OTP resent successfully");
      setResendEnabled(false);
      incrementResetTrigger(); // Trigger timer reset
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  const handleResendTimeout = () => {
    setResendEnabled(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0 }}
      className="relative" // Add relative position
    >
      {loading && <LoadingOverlay />}
      <Card className="md:px-[3%] rounded-lg">
        <CardHeader>
          <Mail size={20} fill="white" className="" color="#041827" />
          <CardTitle className="font-medium md:text-3xl text-xl pt-6">
            You’ve got mail
          </CardTitle>
          <CardDescription className="font-normal md:text-xl text-base text-placeholder_text">
            Please enter the 6-digit OTP code sent to
            <span className="text-army_green font-bold"> {email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-10">
            <a
              href={`mailto:${email}`}
              className="md:h-[62px] md:w-[230px] h-[44.36px] w-[164.73px] bg-[#FBFBFB] flex gap-4 rounded-full justify-center items-center"
            >
              <Mail size={20} fill="white" className="" color="#7e1616" />
              <p className="font-medium md:text-lg text-[12px] text-army_green">
                Open Mail
              </p>
            </a>
            <div className="flex justify-center md:gap-[25.48px] gap-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex gap-4 flex-col"
                >
                  <Controller
                    name="pin"
                    control={form.control}
                    render={({ field }) => (
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="flex md:gap-5 gap-2">
                          {[...Array(6)].map((_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="md:h-[67.45px] md:w-[67.45px] h-[42.45px] w-[42.45px] text-center text-lg md:text-2xl rounded-2xl border"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    )}
                  />
                  {verificationError && (
                    <p className="text-[#E75F51] text-[13px] font-light">
                      {verificationError}
                    </p>
                  )}
                  <div className="flex justify-between items-center my-4">
                    <p className="md:text-base text-[12px] font-medium text-[#041827]">
                      Resend code in{" "}
                      <OtpTimer
                        key={resetTrigger} // Ensure a new key when resetTrigger changes to force re-render
                        time={30}
                        onTimeout={handleResendTimeout}
                        resetTrigger={resetTrigger}
                      />
                    </p>
                    <Button
                      onClick={handleResendCode}
                      disabled={!resendEnabled}
                      className="flex gap-4 rounded-full justify-center items-center bg-army_green"
                      variant="secondary"
                    >
                      <RotateCcw size={16} className="" />
                      <p className="md:text-base text-[12px] font-medium cursor-pointer">
                        Resend OTP
                      </p>
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

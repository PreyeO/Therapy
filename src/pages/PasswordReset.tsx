import { NewPassword } from "@/components/auth/NewPassword";
import { ResetDone } from "@/components/auth/ResetDone";
import { ResetForm } from "@/components/auth/ResetForm";
import { ResetOTP } from "@/components/auth/ResetOTP";

import { useMultiStepForm } from "@/hooks";
import { ArrowLeft } from "lucide-react";
import { FC } from "react";

const PasswordReset: FC = () => {
  function handleNext() {
    next();
  }

  const { step, prev, next, isFirstStep, completed } = useMultiStepForm([
    <ResetForm handleNext={handleNext} />,
    <ResetOTP handleNext={handleNext} />,
    <NewPassword handleNext={handleNext} />,
    <ResetDone />,
  ]);

  return (
    <main className="py-5 px-8 overflow-clip h-screen">
      <div className="flex">
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
      <div className="w-full">{step}</div>
    </main>
  );
};

export default PasswordReset;

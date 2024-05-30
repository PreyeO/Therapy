import { FC, useEffect, useRef, useState } from "react";
import { handleNextProps } from "@/types";

const ResetOTP: FC<handleNextProps> = ({ handleNext }) => {
  const [otp, setOtp] = useState<string>("");

  const [pinNew, setPinNew] = useState<string[]>(Array(4).fill(""));
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    if (otp.length === 4) {
      handleNext();
    }
  });
  return (
    <div className=" h-full w-[90%] mx-auto flex flex-col justify-center items-center gap-[50px]">
      <div className="flex flex-col items-center gap-[10px] ">
        <h1 className=" font-Jakarta text-[25px] leading-9 text-primary_blue font-semibold">
          Reset password
        </h1>
        <p className=" font-Jakarta text-dark_green/70 text-[20px] font-normal leading-7 text-center ">
          Please type in the one time password (OTP) sent to your email address
          abr*******.com and phone number.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <p className=" font-Jakarta font-medium text-[16px] text-dark_green ">
          Enter OTP <span className="text-[#E75F51]">*</span>
        </p>
        <div className="flex  space-x-8 justify-center">
          {pinNew.map((digit, index) => (
            <div
              className={`h-[80px] w-[80px] flex border-[1px] border-dark_green/50 rounded-[6px] bg-transparent 
                      
                      `}
              key={index}
            >
              <input
                ref={refs[index]}
                type="text"
                placeholder="-"
                className={`w-full h-full outline-none border-0 shadow-none ring-0 focus:shadow-none focus:ring-0 p-0 py-1 text-center align-middle text-[16px] leading-[24px] font-b-600 placeholder:text-neutral-variant-container bg-transparent text-primary-0`}
                value={digit}
                onChange={async (e) => {
                  const arr = [...pinNew];
                  const value = e.target.value[0];
                  arr[index] =
                    value === undefined ? "" : value ? value : arr[index];
                  if (index !== 3 && arr[index] !== "") {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (refs[index + 1] as any).current.focus();
                  }

                  setPinNew(arr);

                  if (arr.join("").length === 4) {
                    const joinedPin = arr.join("");

                    setOtp(joinedPin);
                  }
                }}
                onKeyDown={(e) => {
                  // If the key pressed was the backspace key and the current input is empty
                  if (e.key === "Backspace" && digit === "") {
                    // If this is not the first input
                    if (index > 0) {
                      // Shift focus to the previous input
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (refs[index - 1] as any)?.current?.focus();
                    }
                  }
                }}
              />
            </div>
          ))}
        </div>
        <p className="w-full text-center text-primary_blue text-base ">
          Resend code in 00:30
        </p>
      </div>
    </div>
  );
};

export default ResetOTP;

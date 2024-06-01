import { FC, useEffect, useRef, useState } from "react";
import { handleNextProps } from "@/types";
import { Mail, RotateCcw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ResetOTP: FC<handleNextProps> = ({ handleNext }) => {
  const [otp, setOtp] = useState<string>("");

  const [pinNew, setPinNew] = useState<string[]>(Array(6).fill(""));
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
    if (otp.length === 6) {
      handleNext();
    }
  });
  return (
    <div className="max-w-[821px] flex flex-col justify-center mx-auto min-h-screen">
      <Card className="px-[3%] rounded-lg h-[454px] mt-[-20px]">
        <CardHeader>
          <Mail size={20} fill="white" className="" color="#041827" />
          <CardTitle className="font-medium text-3xl pt-6">
            You’ve got mail
          </CardTitle>
          <CardDescription className="font-normal text-xl text-placeholder_text">
            please, enter 4 digit OTP code send to your email
            <span className=" text-army_green font-bold">
              {" "}
              chrisnnaji443@gmail.com
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-10">
            <div className="h-[62px] w-[230px] bg-[#FBFBFB] flex gap-4 rounded-full justify-center items-center">
              <Mail size={20} fill="white" className="" color="#7e1616" />
              <p className="font-medium text-lg text-army_green">Open Gmail</p>
            </div>
            <div className="flex justify-center gap-[25.48px]">
              {pinNew.map((digit, index) => (
                <div
                  className={`h-[67.45px] w-[67.45px] flex border  rounded-[17.99px] bg-transparent 
                      
                      `}
                  key={index}
                >
                  <input
                    ref={refs[index]}
                    type="text"
                    placeholder="-"
                    className={`w-full h-full outline-none border-0 shadow-none ring-0 focus:shadow-none focus:ring-0 p-0 py-1 text-center align-middle text-[16px]   bg-transparent input-cursor-style `}
                    value={digit}
                    onChange={async (e) => {
                      const arr = [...pinNew];
                      const value = e.target.value[0];
                      arr[index] =
                        value === undefined ? "" : value ? value : arr[index];
                      if (index !== 5 && arr[index] !== "") {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (refs[index + 1] as any).current.focus();
                      }

                      setPinNew(arr);

                      if (arr.join("").length === 6) {
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
            <div className="flex justify-between mt-4">
              <p className="text-xl font-medium text-[#041827] ">
                Didn’t receive code?
              </p>
              <div className="h-[62px] w-[230px] bg-[#FBFBFB] flex gap-4 rounded-full justify-center items-center text-army_green">
                <RotateCcw size={16} fill="white" className="" />
                <p className="text-base font-medium cursor-pointer">
                  Resend Code
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

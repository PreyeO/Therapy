import { FC, useEffect, useRef, useState } from "react";
import { VerificationProps } from "@/types";
import { Mail, RotateCcw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const EmailVerification: FC<VerificationProps> = ({
  handleNext,
  handleSubmit,
}) => {
  const [otp, setOtp] = useState<string>("");
  const [pinNew, setPinNew] = useState<string[]>(Array(6).fill(""));

  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (otp.length === 6) {
      handleSubmit({ emailOtp: otp }); // Pass the OTP to handleSubmit
      handleNext();
    }
  }, [otp, handleNext, handleSubmit]);

  return (
    <div className="max-w-[821px] flex flex-col justify-center mx-auto min-h-screen">
      <Card className="md:px-[3%] rounded-lg">
        <CardHeader>
          <Mail size={20} fill="white" className="" color="#041827" />
          <CardTitle className="font-medium md:text-3xl text-xl pt-6">
            You’ve got mail
          </CardTitle>
          <CardDescription className="font-normal md:text-xl text-base text-placeholder_text">
            Please enter the 6-digit OTP code sent to
            <span className="text-army_green font-bold">
              {" "}
              chrisnnaji443@gmail.com
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-10">
            <div className="md:h-[62px] md:w-[230px] h-[44.36px] w-[164.73px] bg-[#FBFBFB] flex gap-4 rounded-full justify-center items-center">
              <Mail size={20} fill="white" className="" color="#7e1616" />
              <p className="font-medium md:text-lg text-[12px] text-army_green">
                Open Gmail
              </p>
            </div>
            <div className="flex justify-center md:gap-[25.48px] gap-2 ">
              {pinNew.map((digit, index) => (
                <div
                  className="md:h-[67.45px] md:w-[67.45px] h-[42.45px] w-[42.45px] flex border md:rounded-[17.99px] rounded-[11.32px] bg-transparent"
                  key={index}
                >
                  <input
                    ref={refs[index]}
                    type="text"
                    placeholder="-"
                    className="w-full h-full outline-none border-0 shadow-none ring-0 focus:shadow-none focus:ring-0 p-0 py-1 text-center align-middle text-[16px] bg-transparent input-cursor-style"
                    value={digit}
                    onChange={(e) => {
                      const arr = [...pinNew];
                      const value = e.target.value[0];
                      arr[index] =
                        value === undefined ? "" : value ? value : arr[index];
                      if (index !== 5 && arr[index] !== "") {
                        refs[index + 1].current?.focus();
                      }
                      setPinNew(arr);
                      if (arr.join("").length === 6) {
                        const joinedPin = arr.join("");
                        setOtp(joinedPin);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && digit === "" && index > 0) {
                        refs[index - 1].current?.focus();
                      }
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between my-4 items-center">
              <p className="md:text-xl text-[12px] font-medium text-[#041827]">
                Didn’t receive code?
              </p>
              <div className=" md:h-[52.px] h-[42.2px] md:w-[230px] w-[155px] bg-[#FBFBFB] flex gap-4 rounded-full justify-center items-center text-army_green">
                <RotateCcw size={16} fill="white" className="" />
                <p className="md:text-base text-[12px] font-medium cursor-pointer">
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

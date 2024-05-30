import { FC } from "react";
import { Button } from "../ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OTPFormSchema } from "@/types";

interface OTPProps {
  handleSubmit: () => void;
}
const Otp: FC<OTPProps> = ({ handleSubmit }) => {
  const form = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof OTPFormSchema>) {
    console.log(data);
    handleSubmit();
  }
  return (
    <div className=" h-full container  mx-auto flex flex-col justify-center items-center gap-[50px]">
      <div className="flex flex-col items-center gap-[10px] ">
        <h1 className=" font-Jakarta text-[25px] leading-9 text-center text-primary_blue font-semibold">
          Verify OTP
        </h1>
        <p className=" font-Jakarta w-[80%] text-dark_green/70 text-[20px] font-normal leading-7 text-center ">
          Please type in the one time password (OTP) sent to your email address
          abr*******.com and phone number.
        </p>
      </div>
      <div className="flex flex-col w-[60%] gap-1">
        <p className=" font-Jakarta font-medium text-[16px] text-dark_green ">
          Enter OTP <span className="text-[#E75F51]">*</span>
        </p>
        <div className="flex flex-col gap-4 justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-4  flex-col"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={4} {...field}>
                        <InputOTPGroup className="flex gap-5">
                          <InputOTPSlot
                            index={0}
                            className="h-20 w-20 text-2xl rounded-lg focus-visible:ring-transparent outline-none"
                          />
                          <InputOTPSlot
                            index={1}
                            className="h-20 w-20 text-2xl rounded-lg focus-visible:ring-transparent outline-none"
                          />
                          <InputOTPSlot
                            index={2}
                            className="h-20 w-20 text-2xl rounded-lg focus-visible:ring-transparent outline-none"
                          />
                          <InputOTPSlot
                            index={3}
                            className="h-20 w-20 text-2xl rounded-lg focus-visible:ring-transparent outline-none"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="w-full text-center text-primary_blue text-base ">
                Resend code in 00:30
              </p>
              <Button
                type="submit"
                className=" w-full bg-primary_blue  hover:bg-primary_blue text-white font-Jakarta font-medium text-base "
              >
                Confirm
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Otp;

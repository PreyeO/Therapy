import { handleNextProps, verifyEmailSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface VerificationProps extends handleNextProps {
  // handleSubmit: (data: z.infer<typeof verifyEmailSchema>) => void;
  handleSubmit: () => void;
}
export const EmailVerification: FC<VerificationProps> = ({
  handleNext,
  handleSubmit,
}) => {
  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
  });

  function onSubmit(data: z.infer<typeof verifyEmailSchema>) {
    console.log(data);
    handleSubmit();
    handleNext();
  }
  return (
    <div className="flex flex-col gap-[50px]">
      <div className=" flex flex-col gap-[10px]">
        <h1 className=" text-[25px]  font-Jakarta leading-9 text-primary_blue text-center">
          Verify email address
        </h1>
        <p className="text-[20px] font-Jakarta leading-7 text-center text-dark_green/70 ">
          Please type in the one time password (OTP) sent to your email address
          abr*******.com and phone number.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[30px]"
        >
          <FormField
            control={form.control}
            name="emailOtp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" flex justify-between items-center ">
                  <p className="font-Jakarta font-medium text--[16px] text-dark_green ">
                    Enter the code sent to your Email
                    <span className=" text-[#E75F51]">*</span>
                  </p>
                  <p className="font-Jakarta font-medium text--[16px] text-primary_blue cursor-pointer">
                    Resend code
                  </p>
                </FormLabel>

                <FormControl>
                  <Input
                    className="h-[54px] outline-none border border-dark_green/50 active:outline-none"
                    autoComplete="false"
                    placeholder="0-0-0-0"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-[#E75F51] font-Jakarta text-[13px] font-light" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className=" w-full  py-4 bg-primary_blue text-white hover:bg-primary_blue hover:text-white font-Jakarta text-[16px] font-medium rounded-md"
          >
            Verify
          </Button>
        </form>
      </Form>
    </div>
  );
};

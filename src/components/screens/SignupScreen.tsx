import { userDetailsRegisterSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";

const SignupScreen = () => {
  const form = useForm<z.infer<typeof userDetailsRegisterSchema>>({
    resolver: zodResolver(userDetailsRegisterSchema),
  });

  function onSubmit(data: z.infer<typeof userDetailsRegisterSchema>) {
    console.log(data);
  }
  return (
    <section className="flex flex-col gap-[50px]">
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[30px]"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" font-Jakarta font-medium text--[16px] text-dark_green ">
                  Full name
                </FormLabel>

                <FormControl>
                  <Input
                    className="h-[54px] outline-none border border-dark_green/50 active:outline-none"
                    autoComplete="false"
                    placeholder="Enter your full name"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-[#E75F51] font-Jakarta text-[13px] font-light" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" font-Jakarta font-medium text--[16px] text-dark_green ">
                  email
                </FormLabel>

                <FormControl>
                  <Input
                    className="h-[54px] outline-none border border-dark_green/50 active:outline-none"
                    autoComplete="false"
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-[#E75F51] font-Jakarta text-[13px] font-light" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" font-Jakarta font-medium text--[16px] text-dark_green ">
                  Create password
                </FormLabel>

                <FormControl>
                  <Input
                    className="h-[54px] outline-none border border-dark_green/50 active:outline-none"
                    autoComplete="false"
                    type="password"
                    placeholder="Use at least 10 character and number"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-[#E75F51] font-Jakarta text-[13px] font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" font-Jakarta font-medium text--[16px] text-dark_green ">
                  Re-enter password
                </FormLabel>

                <FormControl>
                  <Input
                    className="h-[54px] outline-none border border-dark_green/50 active:outline-none"
                    autoComplete="false"
                    type="password"
                    placeholder="Use at least 10 character and number"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-[#E75F51] font-Jakarta text-[13px] font-light" />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    className=" bg-white border border-[#8E9FAA] w-4 h-4 mr-2 data-[state=checked]:bg-white data-[state=checked]:text-primary_blue"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel
                  className=" font-Jakarta text-dark_green/70 font-normal text-[13px]"
                  htmlFor="terms"
                >
                  Agree to <span className=" text-primary_blue">Terms</span> and{" "}
                  <span className=" text-primary_blue">Policy</span>
                </FormLabel>
                <FormMessage className="text-[#E75F51] font-Jakarta text-[13px] font-light" />
              </FormItem>
            )}
          /> */}

          <Button
            type="submit"
            className=" w-full  py-4 bg-primary_blue text-white hover:bg-primary_blue hover:text-white font-Jakarta text-[16px] font-medium rounded-md"
          >
            Next
          </Button>

          <p className="flex w-full gap-1 items-center justify-center text-center font-Jakarta text-[16px] text-dark_green">
            Have an account?
            <span className=" text-primary_blue underline">Log In</span>
          </p>
        </form>
      </Form>
    </section>
  );
};

export default SignupScreen;

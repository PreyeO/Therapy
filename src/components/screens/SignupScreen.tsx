import { userDetailsRegisterSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/ui/logos/Logo";
import { Link } from "react-router-dom";
import PasswordValidation from "@/components/functions/PasswordValidation";
import PasswordToggle from "@/components/functions/passwordToggle"; // Import the PasswordToggle component

const SignupScreen = () => {
  const form = useForm<z.infer<typeof userDetailsRegisterSchema>>({
    resolver: zodResolver(userDetailsRegisterSchema),
  });

  const password = form.watch("password", "");

  function onSubmit(data: z.infer<typeof userDetailsRegisterSchema>) {
    console.log(data);
  }

  return (
    <div className="max-w-[821px]  flex flex-col justify-center mx-auto py-10">
      <Card className="px-[3%] rounded-lg">
        <CardHeader className="flex flex-col justify-center items-center gap-5">
          <Logo />
          <div className="flex flex-col gap-1 text-center">
            <CardTitle className="font-bold text-2xl text-primary_black_text">
              Get Started
            </CardTitle>
            <CardDescription className="text-lg font-normal text-[#BDBDBD]">
              Create an account to enjoy our services
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="mt-6">
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
                    <FormLabel className="text-base font-medium text-primary_black_text">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-16 text-placeholder_text font-sm font-normal"
                        autoComplete="false"
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-primary_black_text">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-16 text-placeholder_text font-sm font-normal"
                        autoComplete="false"
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-primary_black_text">
                      Create password
                    </FormLabel>
                    <FormControl>
                      <PasswordToggle
                        field={field}
                        placeholder="Enter your password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-primary_black_text">
                      Re-enter Password
                    </FormLabel>
                    <FormControl>
                      <PasswordToggle
                        field={field}
                        placeholder="Re-enter password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <PasswordValidation password={password} />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        className=" bg-white border-2 border-army_green w-5 h-5 mr-2  data-[state=checked]:bg-white data-[state=checked]:text-army_green"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className=" text-sm font-normal" htmlFor="terms">
                      Agree to
                      <span className=" text-army_green">
                        {" "}
                        Terms & Conditions
                      </span>
                    </FormLabel>
                    <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-[71px] w-full bg-army_green text-white text-xl font-medium rounded-full"
              >
                Sign Up
              </Button>

              <p className="flex w-full gap-1 items-center justify-center text-center font-normal text-base text-primary_black_text">
                Already have account?
                <Link to="/signin">
                  <span className="text-army_green underline font-bold">
                    Login in here
                  </span>
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupScreen;

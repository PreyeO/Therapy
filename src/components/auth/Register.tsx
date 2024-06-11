import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { registerUser, sendOTPToEmail, setAuthToken } from "@/services/api";
import {
  RegisterDataType,
  handleNextProps,
  userDetailsRegisterSchema,
} from "@/types";
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
import PasswordValidation from "@/components/functions/PasswordValidation";
import PasswordToggle from "@/components/functions/passwordToggle";

interface RegisterProps extends handleNextProps {
  userType: RegisterDataType["userType"];
}

const Register: FC<RegisterProps> = ({ userType, handleNext }) => {
  const [passwordMatchError, setPasswordMatchError] = useState<string>("");
  const [isPasswordTouched, setIsPasswordTouched] = useState<boolean>(false);

  const form = useForm<z.infer<typeof userDetailsRegisterSchema>>({
    resolver: zodResolver(userDetailsRegisterSchema),
    defaultValues: { userType },
  });

  const handleEmailSent = async (userId: string) => {
    try {
      console.log("Email sent");
      await handleSendOTP(userId); // Call handleSendOTP here
      handleNext(userId); // Move handleNext call here
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const password = form.watch("password", "");

  const handleRegister = async (userData) => {
    try {
      const response = await registerUser(userData);
      const { data } = response; // Destructure data and token
      console.log("response:", response.data);
      console.log("my_response:", response);
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      handleNext(data.user.id); // Access user id from the data.user property
      return response; // Return the response here if needed
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleSendOTP = async (userId) => {
    try {
      await sendOTPToEmail(userId);
      alert("OTP sent successfully");

      // Redirect the user to the next step or route
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const onSubmit = async (data: z.infer<typeof userDetailsRegisterSchema>) => {
    console.log("Form submitted!", data);
    try {
      if (data.password !== data.confirm_password) {
        setPasswordMatchError("Passwords do not match");
        return;
      }

      let userTypePayload;
      if (data.userType === "therapist") {
        userTypePayload = { is_therapist: true };
      } else {
        userTypePayload = { is_patient: true };
      }

      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
        ...userTypePayload,
      };

      setPasswordMatchError("");

      const response = await handleRegister(payload);

      // Assuming you have userId available here
      const userId = response?.data?.userId;
      if (userId) {
        await handleSendOTP(userId);
        handleEmailSent(response.data);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="max-w-[821px] flex flex-col justify-center mx-auto">
      <Card className="rounded-lg md:p-5 p-0 flex flex-col justify-center my-10">
        <CardHeader className="flex flex-col justify-center items-center gap-5">
          <Logo />
          <h2>User Category: {userType}</h2>
          <div className="flex flex-col gap-1 text-center">
            <CardTitle className="font-bold md:text-3xl text-xl text-primary_black_text">
              Get Started
            </CardTitle>
            <CardDescription className="md:text-lg text-base leading-5 font-normal text-[#BDBDBD]">
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
                name="first_name"
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
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-primary_black_text">
                      Last Name
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
                      Password
                    </FormLabel>
                    <FormControl>
                      <PasswordToggle
                        field={{
                          ...field,
                          onChange: (e) => {
                            field.onChange(e);
                            if (!isPasswordTouched) {
                              setIsPasswordTouched(true);
                            }
                          },
                        }}
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <PasswordValidation password={password} />
                    <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-primary_black_text">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <PasswordToggle
                        field={field}
                        placeholder="Re-enter password"
                      />
                    </FormControl>
                    {passwordMatchError && (
                      <p className="text-[#E75F51] text-[13px] font-light">
                        {passwordMatchError}
                      </p>
                    )}
                    <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                  </FormItem>
                )}
              />
              {isPasswordTouched && <PasswordValidation password={password} />}

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-3 items-center mt-4">
                      <FormControl>
                        <Checkbox
                          className=" bg-white border-2 border-army_green w-5 h-5 mr-2  data-[state=checked]:bg-white data-[state=checked]:text-army_green"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="flex items-center space-x-2">
                        <FormLabel
                          htmlFor="terms"
                          className="text-xs md:text-sm"
                        >
                          I agree to the&nbsp;
                          <Link
                            to="/terms"
                            className="underline font-bold text-xs md:text-sm"
                          >
                            Terms of Service&nbsp;
                          </Link>
                          and&nbsp;
                          <Link
                            to="/privacy"
                            className="underline font-bold text-xs md:text-sm"
                          >
                            Privacy Policy
                          </Link>
                        </FormLabel>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="h-[71px] w-full bg-army_green text-white text-xl font-medium rounded-full">
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;

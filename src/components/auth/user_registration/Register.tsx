import { FC, useState } from "react";
import {
  registerUser,
  sendOTPToEmail,
  setAuthToken,
} from "@/services/api/auth";
import {
  RegisterDataType,
  handleNextProps,
  userDetailsRegisterSchema,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/ui/logos/Logo";
import RegisterForm from "@/components/auth/user_registration/RegisterForm";
// import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";

// accessing user category type
interface RegisterProps extends handleNextProps {
  userType: RegisterDataType["userType"];
}

const Register: FC<RegisterProps> = ({ userType, handleNext }) => {
  const [passwordMatchError, setPasswordMatchError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // accessing validated schema
  const formMethods = useForm<z.infer<typeof userDetailsRegisterSchema>>({
    resolver: zodResolver(userDetailsRegisterSchema),
    defaultValues: { userType },
  });

  // regestering users and saving the created tokens in local storage
  const handleRegister = async (userData) => {
    try {
      const response = await registerUser(userData);
      const { data } = response;
      localStorage.setItem("token", data.token);
      setAuthToken(data.token); // Set the token for future requests
      handleNext(data.user.id, data.token);
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Error during registration");
    }
  };

  // sending a get request to send otp and passing the users created id
  const handleSendOTP = async (userId) => {
    try {
      const response = await sendOTPToEmail(userId);
      if (response.detail === "OTP has been sent to your email.") {
        handleNext(userId, "");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  // submitting both the forms payload and sending request for otp
  const onSubmit = async (data: z.infer<typeof userDetailsRegisterSchema>) => {
    setLoading(true);
    console.log("Form submitted!", data);
    try {
      // comparing passwords inputted and re-entry password
      if (data.password !== data.confirm_password) {
        setPasswordMatchError("Passwords do not match");
        setLoading(false);
        return;
      }

      // adding the particular user in the payload
      let userTypePayload;
      if (data.userType === "therapist") {
        userTypePayload = { is_therapist: true };
      } else {
        userTypePayload = { is_patient: true };
      }

      // data expected when form is submitted
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
      }
    } catch (error) {
      console.error("Registration error:", error);
      // toast.error("Registration error:", error);
      toast.error("Ooops!:");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Adding a 2-second delay to see the spinner
    }
  };

  return (
    <div className="max-w-[821px] flex flex-col justify-center mx-auto">
      <Card className="rounded-lg md:p-5 p-0 flex flex-col justify-center my-10">
        <CardHeader className="flex flex-col justify-center items-center gap-5">
          <Logo />

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
          <FormProvider {...formMethods}>
            <form
              autoComplete="off"
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className="flex flex-col gap-[30px]"
            >
              <RegisterForm passwordMatchError={passwordMatchError} />
              <ButtonLoader loading={loading} text="Create Account" />
              <p className="flex w-full gap-1 items-center justify-center text-center font-normal text-base text-primary_black_text">
                Already have an account?
                <Link to="/signin">
                  <span className="text-army_green underline font-bold">
                    Sign in here
                  </span>
                </Link>
              </p>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      <ToastContainer
        toastStyle={{ backgroundColor: "crimson", color: "white" }}
        className="text-white"
      />
    </div>
  );
};

export default Register;

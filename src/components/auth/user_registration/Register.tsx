import { FC } from "react";
import {
  registerUser,
  sendOTPToEmail,
  setAuthToken,
} from "@/services/api/authentication/auth";
import {
  RegisterDataType,
  handleNextProps,
  userDetailsRegisterSchema,
} from "@/types/formSchema";
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
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";
import { useAuthState } from "@/store";

// accessing user category type
interface RegisterProps extends handleNextProps {
  userType: RegisterDataType["userType"];
}

const Register: FC<RegisterProps> = ({ userType, handleNext }) => {
  const { passwordMatchError, loading, setPasswordMatchError, setLoading } =
    useAuthState();

  // accessing validated schema
  const formMethods = useForm<z.infer<typeof userDetailsRegisterSchema>>({
    resolver: zodResolver(userDetailsRegisterSchema),
    defaultValues: { userType },
  });

  // registering users and saving the created tokens in local storage
  const handleRegister = async (userData) => {
    try {
      const response = await registerUser(userData);
      const { data } = response;
      localStorage.setItem("token", data.token);
      setAuthToken(data.token); // Set the token for future requests
      handleNext(data.user.id, data.token, userData.email);
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  };

  // sending a get request to send otp and passing the user's created id
  const handleSendOTP = async (userId: string, email: string) => {
    try {
      const response = await sendOTPToEmail(userId);
      if (response.detail === "OTP has been sent to your email.") {
        handleNext(userId, "", email);
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
      if (data.userType === "is_clinician") {
        userTypePayload = { is_clinician: true };
      } else {
        userTypePayload = { is_client: true };
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
        await handleSendOTP(userId, data.email);
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Ooops!");
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[821px] flex flex-col justify-center mx-auto">
      <Card className="rounded-lg md:p-5 p-0 flex flex-col justify-center my-10 md:shadow-md ">
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
